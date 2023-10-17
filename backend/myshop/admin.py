from django.contrib import admin
from .models import *
# from django.contrib.auth.models import User


# Register your models here.
class CustomerProfileInline(admin.StackedInline):
    model = CustomerProfile
    can_delete = False
    verbose_name_plural = 'Customer Profile'


class AppUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name')  # You can customize this as per your requirements
    search_fields = ('email',)
    ordering = ('email',)


# Additionally, if you want a separate admin for CustomerProfile
@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('customer', 'address', 'phone')
    search_fields = (
        'customer__first_name',
        'customer__last_name',
        'customer__email',
        'phone',
        'address'
    )


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


# admin.site.unregister(User)
admin.site.register(AppUser, AppUserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Carousel, CarouselAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Material, MaterialAdmin)
