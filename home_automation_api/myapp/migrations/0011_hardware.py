# Generated by Django 3.1 on 2020-10-19 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_remove_pin_state_hardware_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='hardware',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False)),
            ],
        ),
    ]