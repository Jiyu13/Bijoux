# Generated by Django 4.2.5 on 2023-10-04 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myshop', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='collection',
            new_name='collections',
        ),
    ]
