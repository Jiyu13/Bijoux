# convert model instances to JSON so that frontend can work with the received data

from rest_framework import serializers
from .models import *


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "material_name"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "product", "image_name"]


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


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ["theme", "caption", "image"]


