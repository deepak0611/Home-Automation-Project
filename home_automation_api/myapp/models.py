from django.db import models

# Create your models here.
class pin_state(models.Model):
    pin_name = models.CharField(max_length=50)
    pin_no = models.IntegerField(default=1)
    state = models.BooleanField(default=False)
    schedule_status = models.BooleanField(default=False)
    interrupt = models.BooleanField(default=False)
    start_hr = models.IntegerField(default=0)
    start_min = models.IntegerField(default=0)
    end_hr = models.IntegerField(default=0)
    end_min = models.IntegerField(default=0)
    toggler = models.CharField(max_length=3,default="bc") #tells who control the switch

    def __str__(self):
        return self.pin_name

class hardware(models.Model):
    name = models.CharField(max_length=50)
    status = models.IntegerField(default=0)
    temp = models.CharField(max_length=50,default="0")
    humid = models.CharField(max_length=50,default="0")

    def __str__(self):
        return self.name