from django.contrib import admin
from .models import *

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "price")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "image_name")


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
