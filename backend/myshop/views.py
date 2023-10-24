from django.contrib.auth import login, logout
from django.http import JsonResponse, Http404
from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication

from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .validations import custom_validation, validate_email, validate_password
from .permissions import IsSuperUserOrReadOnly


# Create your views here.
# ============================= User Register / Login / Logout =============================
class UserRegister(APIView):
    """can be accessed by anyone, only has a post method"""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
            request.session["user"] = {
                'id': user.user_id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        request.session['user'] = None
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        user_info = request.session.get("user", None)
        return JsonResponse({'user': user_info})
        # return Response({'user': serializer.data}, status=status.HTTP_200_OK)


# ============================= User =============================
# listing all users and creating a new user
class UserListView(ListCreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer  # with generic views
    permission_classes = [IsSuperUserOrReadOnly]


# retrieving, updating, or deleting a specific user based on their id
class CustomerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer


class CustomerProfileListView(ListCreateAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer


class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer


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

