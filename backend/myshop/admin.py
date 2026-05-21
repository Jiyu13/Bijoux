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
    list_display = ("id", "title", "collection", "price", "image")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image_name")


class CarouselAdmin(admin.ModelAdmin):
    list_display = ("id", "theme", "caption", "image")


class CollectionAdmin(admin.ModelAdmin):
    list_display = ("id", "collection_name", "cover_image")


class MaterialAdmin(admin.ModelAdmin):
    list_display = ("id", "material_name",)


class CartAdmin(admin.ModelAdmin):
    list_display = ('id',)
    # 'user_id', )

    # @admin.display(description='user id')
    # def user_id(self, object):
    #     return object.user.user_id


class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", 'cart', 'product', 'quantity',)


class OrderItemInline(admin.TabularInline):
    # OrderItemInline is only used inside OrderAdmin. It is not used with admin.site.register().
    # it shows items inside the Order detail page.
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'product_title', 'product_image', 'quantity', 'price',)


class OrderAdmin(admin.ModelAdmin):
    # Orders list page: Shows one row per order, with item count
    # Order detail page: Shows the actual OrderItems inside that order
    list_display = ('id', 'user', 'email', 'total', 'status', 'order_item_count', 'created_at',)

    inlines = [OrderItemInline]

    def order_item_count(self, obj):
        return obj.order_items.count()


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'product_title', 'quantity', 'price', )

# admin.site.unregister(User)
admin.site.register(AppUser, AppUserAdmin)
admin.site.register(ContactRequest, ContactRequestAdmin)
admin.site.register(Address, AddressAdmin)

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Carousel, CarouselAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Material, MaterialAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
