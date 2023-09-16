from django.db import models

# Create your models here.


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    """ A product has many images- ForeignKey """
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    image_name = models.CharField(max_length=120)
    product_image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.image_name


class Carousel(models.Model):
    """ Image Sliders in home page """
    theme = models.CharField(max_length=120)
    caption = models.CharField(max_length=120)
    image = models.ImageField(null=True, blank=True, upload_to="carousel/")
