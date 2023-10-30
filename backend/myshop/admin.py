from django.contrib import admin
from .models import *
# from django.contrib.auth.models import User


# Register your models here.
# class CustomerProfileInline(admin.StackedInline):
#     model = CustomerProfile
#     can_delete = False
#     verbose_name_plural = 'Customer Profile'


class AppUserAdmin(admin.ModelAdmin):
    list_display = ("user_id", 'email', 'first_name', 'last_name')  # You can customize this as per your requirements
    search_fields = ('email',)
    ordering = ('email',)


class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'subject', 'created_at')


class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "id", 'user', 'first_name', 'last_name', 'city', 'state', 'zip_code', 'phone', 'is_default'
    )  # Fields you want to see in the list view
    # search_fields = ['user__first_name', 'city', 'state']  # Fields you want to be able to search by
    # list_filter = ['is_default', 'city', 'state']  # Fields you want filters for


# Additionally, if you want a separate admin for CustomerProfile
# @admin.register(CustomerProfile)
# class CustomerProfileAdmin(admin.ModelAdmin):
#     list_display = ("id", 'customer', 'address', 'phone')
#     search_fields = (
#         'customer__first_name',
#         'customer__last_name',
#         'customer__email',
#         'phone',
#         'address'
#     )


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "price", "image")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image_name")


class CarouselAdmin(admin.ModelAdmin):
    list_display = ("id", "theme", "caption", "image")


class CollectionAdmin(admin.ModelAdmin):
    list_display = ("id", "collection_name", "cover_image")


class MaterialAdmin(admin.ModelAdmin):
    list_display = ("id", "material_name",)


# admin.site.unregister(User)
admin.site.register(AppUser, AppUserAdmin)
admin.site.register(ContactRequest, ContactRequestAdmin)
admin.site.register(Address, AddressAdmin)

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Carousel, CarouselAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Material, MaterialAdmin)
