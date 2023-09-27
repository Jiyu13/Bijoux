# convert model instances to JSON so that frontend can work with the received data

from rest_framework import serializers
from .models import Product, ProductImage, Carousel, Category


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "product", "image_name"]


class ProductDetailSerializer(serializers.ModelSerializer):
    # Nested ProductImage serializers to display associated images with a product
    product_images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "image", "product_images"]


class CategorySerializer(serializers.ModelSerializer):
    products = ProductDetailSerializer(many=True, read_only=True, source='product_set')

    class Meta:
        model = Category
        fields = ["category_name", "cover_image", "products"]


class ProductSerializer(serializers.ModelSerializer):
    # Nested ProductImage serializers to display associated images with a product
    product_images = ProductImageSerializer(many=True, read_only=True)
    # To show the Collections details with each Product
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "image", "category", "product_images"]


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ["theme", "caption", "image"]


