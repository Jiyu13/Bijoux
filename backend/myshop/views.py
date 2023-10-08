from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


# ============================= User =============================
# listing all users and creating a new user
class UserListView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer  # with generic views


# retrieving, updating, or deleting a specific user based on their id
class CustomerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomerProfileListView(ListCreateAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer


class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer


# ============================= Product  =============================
class ProductListView(APIView):
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
    queryset = Collection.objects.all().prefetch_related("product_set")
    serializer_class = CollectionSerializer


# ============================= Material =============================
class MaterialListView(ListAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

