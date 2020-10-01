from django.db import models

# Create your models here.
class pin_state(models.Model):
    pin_name = models.CharField(max_length=50)
    state = models.BooleanField(default=False)

    def __str__(self):
        return self.pin_name
