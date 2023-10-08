from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Material(models.Model):
    material_name = models.CharField(max_length=255)

    def __str__(self):
        return self.material_name


class Collection(models.Model):
    """ A collection can have many Products """
    collection_name = models.CharField(max_length=120)
    cover_image = models.ImageField(null=True, blank=True, upload_to='collections/')

    def __str__(self):
        return self.collection_name


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    price = models.FloatField()
    # stock = models.PositiveIntegerField()
    # is_active = models.BooleanField(default=True)
    # create_at = models.DateTimeField(auto_now_add=True)
    # cover image
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    materials = models.ManyToManyField(Material, related_name="products")

    collection = models.ForeignKey(Collection, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    """ A product has many images- ForeignKey """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image_name = models.CharField(max_length=120)
    product_image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.image_name


class Carousel(models.Model):
    """ Image Sliders in home page """
    theme = models.CharField(max_length=120)
    caption = models.CharField(max_length=120)
    image = models.ImageField(null=True, blank=True, upload_to="carousel/")

    def __str__(self):
        return self.theme


# ==========================  User Profile  =============================
class CustomerProfile(models.Model):
    # cus
    customer = models.OneToOneField(User, on_delete=models.CASCADE)  # delete user will delete user profile, not vice verse
    address = models.TextField(null=True, blank=True)
    phone = models.CharField(null=True, blank=True, max_length=20)

    def __str__(self):
        return self.customer.username



