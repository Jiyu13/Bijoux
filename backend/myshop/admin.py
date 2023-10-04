from django.contrib import admin
from .models import *

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "price", "image")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "image_name")


class CarouselAdmin(admin.ModelAdmin):
    list_display = ("theme", "caption", "image")


class CollectionAdmin(admin.ModelAdmin):
    list_display = ("collection_name", "cover_image")


class MaterialAdmin(admin.ModelAdmin):
    list_display = ("material_name",)


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Carousel, CarouselAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Material, MaterialAdmin)
