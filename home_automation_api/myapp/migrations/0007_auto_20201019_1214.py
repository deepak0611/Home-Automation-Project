# Generated by Django 3.1 on 2020-10-19 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_pin_state_gac_toggler'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin_state',
            name='bc_toggler',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='pin_state',
            name='sc_toggler',
            field=models.BooleanField(default=False),
        ),
    ]
