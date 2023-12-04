import json
import random

from django.contrib.auth import login, logout
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication

from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, \
    CreateAPIView
from rest_framework.response import Response
from rest_framework import status, permissions

from rest_framework.authtoken.models import Token


from .validations import custom_validation, validate_email, validate_password
from .permissions import IsSuperUserOrReadOnly


# Create your views here.
# ============================= User Register / Login / Logout =============================
class UserRegister(APIView):
    """can be accessed by anyone, only has a post method"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        validated_data = custom_validation(request.data)
        if 'errors' in validated_data:
            return Response(validated_data['errors'], status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRegisterSerializer(data=validated_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     try:
    #         clean_data = custom_validation(request.data)
    #     except ValidationError as e:
    #         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    #
    #     serializer = UserRegisterSerializer(data=clean_data)
    #     if serializer.is_valid(raise_exception=True):
    #         try:
    #             serializer.create(clean_data)
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         except ValueError as e:
    #             # Catch the password validation errors.
    #             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    #
    #     return Response(status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     clean_data = custom_validation(request.data)
    #     serializer = UserRegisterSerializer(data=clean_data)
    #     if serializer.is_valid(raise_exception=True):
    #         user = serializer.create(clean_data)
    #         if user:
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    """can be accessed by anyone"""
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)

            user_data = {
                'id': user.user_id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }
            return Response(
                user_data,
                status=status.HTTP_200_OK
            )


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        self.request.user = None
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        # user_info = request.session.get("user", None)
        # return JsonResponse({'user': user_info})
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


# ============================= User =============================
# listing all users and creating a new user
# class UserListView(ListCreateAPIView):
#     queryset = AppUser.objects.all()
#     serializer_class = UserSerializer  # with generic views
#     permission_classes = [IsSuperUserOrReadOnly]
#
#
# # retrieving, updating, or deleting a specific user based on their id
# class CustomerDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = AppUser.objects.all()
#     serializer_class = UserSerializer
#
#
# class CustomerProfileListView(ListCreateAPIView):
#     queryset = CustomerProfile.objects.all()
#     serializer_class = CustomerProfileSerializer
#
#
# class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = CustomerProfile.objects.all()
#     serializer_class = CustomerProfileSerializer


# ============================= Contact Request  =============================
class CreateContactRequestView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer

    def create(self, request, *args, **kwargs):

        # ========validate input data from contact form before creating a "ContactRequest" object=======================
        # send_mail(
        #     subject, message, from_email, recipient_list, fail_silently=False, auth_user=None,
        #     auth_password=None, connection=None, html_message=None
        # )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # ============================================Create the ContactRequest & save to db============================
        contact_request = serializer.save()
        # =========================================Compose the email content============================================
        notification_subject = "New Ticket" + " -- " + contact_request.full_name + " - " + contact_request.subject
        user_email = contact_request.sender_email
        notification_message = (f'From: {user_email}\n\n'
                                f'Subject: {notification_subject}\n\n'
                                f'{contact_request.message}'
        )

        try:
            # # =================Send a notification email =============================================================
            send_mail(
                notification_subject,
                notification_message,
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False
            )
            # ==================Send a auto-reply email to user ========================================================
            auto_reply_subject = "Ticket Received" + " - " + contact_request.subject
            auto_reply_message = (
                f"We would like to acknowledge that we have received your request and a ticket has been created. "
                f"A support representative will be reviewing your request and will send you a personal response shortly.\n\n"
                f"Thank you for your patience. \n\n"
                f"Sincerely,\n\n"
                f"Made by Ziru"
            )

            # Specify the email address where you want to receive notifications
            autor_reply_receiver_email = user_email

            # Send the notification email
            send_mail(
                auto_reply_subject,
                auto_reply_message,
                settings.EMAIL_HOST_USER,
                [autor_reply_receiver_email],
                fail_silently=False
            )

        except Exception as e:
            # Handle email sending errors
            return Response({'error': 'Failed to send email.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListContactRequestsView(ListAPIView):
    queryset = ContactRequest.objects.all()
    serializer_class = CollectionSerializer


# ============================= User Address  =============================
class AddressListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        addresses = Address.objects.filter(user=request.user).order_by('-is_default')
        serializer = UserAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class AddressDetailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Address.objects.get(pk=pk, user=self.request.user)
        except Address.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        address = self.get_object(pk)
        serializer = UserAddressSerializer(address)
        return Response(serializer.data)

    def put(self, request, pk):
        address = self.get_object(pk)
        serializer = UserAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        address = self.get_object(pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ============================= Product  =============================
class ProductByCollectionListView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request, pk, *args, **kwargs):
        collection_name = self.kwargs["collection_name"]
        # product1 = Product.objects.filter(collection__collection_name=collection_name)
        products = Product.objects.filter(Q(collection__collection_name=collection_name) & ~Q(pk=pk))
        serialized_products = [
            {
                'id': product.id,
                'title': product.title,
                'price': product.price,
                'image': product.image.url,
                'collection_name': product.collection.collection_name
            } for product in products
        ]
        if len(products) > 4:
            return Response(random.sample(serialized_products, 4))

        return Response(serialized_products)


# @method_decorator(ensure_csrf_cookie, name='dispatch')
class ProductListView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)  # with APIView, manually handle (CRUD)
        # many=True -> multiple objects are being serialized, rather than just a single object
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            response = serializer.data
        except:
            response = {"error": "product not found"}

        return Response(response)


# ============================= Cart =============================
class CartView(APIView):
    """ list & create carts, only create cart when user is logged in """
    permission_classes = (permissions.AllowAny,)
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CartSerializer

    def get(self, request):
        # Get the cart for the current user (not using session)
        user = self.request.user  # if self.request.user.is_authenticated else None
        carts = Cart.objects.filter(user=user.user_id)
        # list() converts a QuerySet to a Python list
        # .values() retrieves specific fields from the QuerySet

        # cart_items = CartItem.objects.filter(cart=carts.first())
        # cart_items_serialized = CartItemSerializer(cart_items, many=True).data

        # print(carts)
        # print(cart_items_serialized)
        # cart_items = list(CartItem.objects.filter(cart=carts.first()).values())

        cart_data = []
        for cart in carts:
            total_quantity = cart.total_quantity()
            cart_items = CartItem.objects.filter(cart=cart)
            cart_items_serialized = []
            for cart_item in cart_items:
                cart_item_data = CartItemSerializer(cart_item).data
                # print("=============cart_item", cart_item_data)  # {'id': 1, 'quantity': 19, 'cart': 10, 'product': 3}
                # cart_item_data['product_details'] = cart_item.get_product_details()
                # cart_items_serialized.append(cart_item_data)
                # # print("==========cart_items_serialized", cart_items_serialized)
                # print(cart_item_data["id"])
                formatted_cart_item_data = {
                    # "cart_item_id": cart_item_data["id"],
                    "product_id": cart_item_data["product"],
                    "quantity": cart_item_data["quantity"],
                    "product_image": cart_item.get_product_details()["product_image"],
                    "product_title": cart_item.get_product_details()["product_title"],
                    "product_price": cart_item.get_product_details()["product_price"],
                }

                cart_items_serialized.append(formatted_cart_item_data)
            cart_data.append({
                'cart_id': cart.id,
                'user_id': cart.user.user_id,
                'total_quantity': total_quantity,
                "cart_items": cart_items_serialized  #cart_items
            })
        return Response(cart_data)

    def post(self, request):
        # Set the user or session key on the new cart
        user = self.request.user if self.request.user.is_authenticated else None
        session_key = self.request.session.session_key if self.request.session.session_key else None

        serializer = CartSerializer(data={
            'user': user.user_id,
            'session_key': session_key
        })
        if serializer.is_valid():
            serializer.save()
            # print("created cart successfully")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToCartView(CreateAPIView):
    """ add items to the cart """
    serializer_class = CartItemSerializer
    permission_classes = (permissions.AllowAny,)
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # authentication_classes = (SessionAuthentication,)

    def post(self, request, *args, **kwargs):

        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key if request.session.session_key else None

        # cart = Cart.objects.get(user=user)
        cart = Cart.objects.filter(user=user.user_id).first()
        product = Product.objects.get(pk=product_id)
        cart_item = CartItem.objects.filter(cart=cart, product=product).first()
        if cart_item:
            cart_item.quantity += int(quantity)
            cart_item.save()
        else:
            cart_item = CartItem(cart=cart, product=product, quantity=int(quantity))
            cart_item.save()
        # try:
        #     cart_item = CartItem.objects.filter(cart=cart.first(), product=product).first()
        #     print("360 cart_item", cart_item)
        #     cart_item.quantity += int(quantity)
        #     cart_item.save()
        #
        # except CartItem.DoesNotExist:
        #     cart_item = CartItem(cart=cart, product=product, quantity=int(quantity))
        #     cart_item.save()
        cart_item_data = {
            'id': cart_item.id,
            'product_id': cart_item.product.id,
            'quantity': cart_item.quantity
        }

        return JsonResponse(cart_item_data)

        # cart, created = Cart.objects.get_or_create(
        #     user=request.user if request.user.is_authenticated else None,
        #     session_key=request.session.session_key or request.session.create()
        # )
        # serializer = CartItemSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save(cart=cart)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemListView(ListAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def get_queryset(self):
        # Get the cart based on user & session_key
        user = self.request.user if self.request.user.is_authenticated else None
        session_key = self.request.session.session_key
        cart = None

        if user:
            # Logic to retrieve cart based on the authenticated user
            cart = Cart.objects.filter(user=user).first()
        elif session_key:
            # Logic to retrieve cart based on the session_key
            cart = Cart.objects.filter(session_key=session_key).first()

        if cart:
            # If cart exists, filter CartItem objects by the cart
            queryset = CartItem.objects.filter(cart=cart)
        else:
            # If cart doesn't exist, return an empty queryset
            queryset = CartItem.objects.none()

        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CartItemView(APIView):
    serializer_class = CartItemSerializer

    def get_object(self, pk):
        return get_object_or_404(CartItem, pk=pk)

    def get(self, request, pk):
        cart_item = self.get_object(pk)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    def put(self, request, pk):
        cart_item = self.get_object(pk)
        serializer = CartItemSerializer(cart_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            cart_item = self.get_object(pk)
        except CartItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


# ============================= Carousel =============================
class CarouselListView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        carousels = Carousel.objects.all()
        serializer = CarouselSerializer(carousels, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CarouselSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ============================= Collection ====================================

class CollectionListView(APIView):
    permission_classes = [IsSuperUserOrReadOnly]

    def get(self, request):
        collections = Collection.objects.all()
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CollectionDetailView(RetrieveAPIView):
    permission_classes = [IsSuperUserOrReadOnly]

    queryset = Collection.objects.all().prefetch_related("product_set")
    serializer_class = CollectionSerializer


# ============================= Material =============================
class MaterialListView(ListAPIView):
    permission_classes = [IsSuperUserOrReadOnly]

    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

