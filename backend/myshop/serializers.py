# convert model instances to JSON so that frontend can work with the received data
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from .models import *

UserModel = get_user_model()


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "material_name"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


# ============================= Single Product Detail =============================

class ProductDetailSerializer(serializers.ModelSerializer):
    # Nested ProductImage serializers to display associated images with a product
    product_images = ProductImageSerializer(many=True, read_only=True)
    # to display materials for a product
    materials = MaterialSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "image", "product_images", "materials"]


class CollectionSerializer(serializers.ModelSerializer):
    products = ProductDetailSerializer(many=True, read_only=True, source='product_set')

    class Meta:
        model = Collection
        fields = ["collection_name", "cover_image", "products"]


# ============================= Product List =============================
class ProductSerializer(serializers.ModelSerializer):
    # Nested ProductImage serializers to display associated images with a product
    product_images = ProductImageSerializer(many=True, read_only=True)

    # to display materials for a product
    # read_only=True, cannot modify materials of a product directly through API endpoint using the serializer
    materials = MaterialSerializer(many=True, read_only=True)

    # To show the Collections details with each Product
    collection = CollectionSerializer()

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "image", "collection", "product_images", "materials"]


# ==========================  User + Customer Profile  =============================
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data['email'],
            password=clean_data['password']
        )
        user_obj.first_name = clean_data['first_name']
        user_obj.last_name = clean_data['last_name']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    """ authenticate username & password pf the user """
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError("Invalid email or password. Please try again.")  # Use DRF's ValidationError
        return user


class UserSerializer(serializers.ModelSerializer):
    """ based on the model & returns user """
    class Meta:
        model = UserModel
        fields = ["user_id", "first_name", "last_name", "email"]


# class CustomerProfileSerializer(serializers.ModelSerializer):
#     # Nested serialization to show user details
#     customer = UserSerializer(read_only=True)
#
#     class Meta:
#         model = CustomerProfile
#         fields = ["customer", "address", "phone"]


# ============================= User Address  =============================
class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'


class UserAddressSerializer(serializers.ModelSerializer):
    # to include additional details from the related AppUser model using a nested serializer
    user = UserSerializer(read_only=True)

    class Meta:
        model = Address
        fields = '__all__'


# ==============  Carousel - Home page image sliders ======================
class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ["theme", "caption", "image"]


