# Generated by Django 4.2.5 on 2023-10-04 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myshop', '0002_rename_collection_product_collections'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='collections',
            new_name='collection',
        ),
    ]
