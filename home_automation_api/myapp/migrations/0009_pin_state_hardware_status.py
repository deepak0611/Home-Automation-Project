# Generated by Django 3.1 on 2020-10-19 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_auto_20201019_1226'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin_state',
            name='hardware_status',
            field=models.BooleanField(default=False),
        ),
    ]
