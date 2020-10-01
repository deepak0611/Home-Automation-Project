from rest_framework import serializers
from . models import *

class pin_stateSerializer(serializers.ModelSerializer):

    class Meta:
        model = pin_state
        fields = '__all__'