"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from myshop.views import *


# for views& viewsets
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'products', views.ProductView, '')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', ProductListView.as_view(), name="products"),
    path('products/<int:pk>/', ProductDetailView.as_view(), name="product-detail"),
    path('product/<int:pk>/<str:collection_name>/', ProductByCollectionListView.as_view(), name="products-by-collection"),

    path('carousels/', CarouselListView.as_view(), name="carousels"),
    path('collections/', CollectionListView.as_view(), name="collections"),
    path('collections/<int:pk>/', CollectionDetailView.as_view(), name="collections-detail"),

    path('materials/', MaterialListView.as_view(), name="materials"),

    # ==================== user =============================
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    # ==================== user address =============================
    path('addresses/', AddressListView.as_view(), name='addresses-list'),
    path('address/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),

    # ===============================================================

    # path('customers/', UserListView.as_view(), name="customers"),
    # path('customers/<int:pk>/', CustomerDetailView.as_view(), name="customer-detail"),
    path('contact-requests/create/', CreateContactRequestView.as_view(), name='create-contact-request'),
    path('contact-requests/', ListContactRequestsView.as_view(), name='list-contact-requests'),

    # path('profiles/', CustomerProfileListView.as_view(), name="customer-profiles"),
    # path('profiles/<int:pk>/', CustomerProfileListView.as_view(), name="customer-profile-detail"),

    path('cart/', CartView.as_view(), name='cart'),
    path('cart-items/', CartItemListView.as_view(), name='cart-items'),
    path('cart-item/<int:pk>/', CartItemView.as_view(), name='cart-item'),
    path('cart-item/add/', AddToCartView.as_view(), name='add-cart-item'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
