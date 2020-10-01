from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import *
from . serializers import pin_stateSerializer


def index(request):
    return render(request,'myapp/index.html')

def change_state(request):
    obj1= pin_state.objects.get(pin_name="output5")

    if obj1.state == 1:
        obj1.state=0
    else:
        obj1.state=1

    obj1.save()

    return render(request,'myapp/index.html')


class pin_state_list(APIView):

    def get(self,request):
        states=pin_state.objects.all()
        serializer=pin_stateSerializer(states,many=True)
        return Response(serializer.data)