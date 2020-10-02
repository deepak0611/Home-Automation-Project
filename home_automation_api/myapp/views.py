from django.shortcuts import render,redirect

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import *
from . serializers import pin_stateSerializer


def index(request):
    obj1 = pin_state.objects.all()

    return render(request,'myapp/index.html',{'pin':obj1})

def change_state(request,pin_no):
    obj1= pin_state.objects.get(pin_no=pin_no)

    if obj1.state == 1:
        obj1.state=0
    else:
        obj1.state=1

    obj1.save()
    return redirect('/')


def set_schedule_time(request,pin_no):
    obj1= pin_state.objects.get(pin_no=pin_no)

    obj1.start_hr=request.GET['sh'];
    obj1.start_min=request.GET['sm'];
    obj1.end_hr=request.GET['eh'];
    obj1.end_min=request.GET['em'];
    obj1.schedule_status=1;
    obj1.save()

    return redirect('/')

def remove_schedule_time(request,pin_no):
    obj1=pin_state.objects.get(pin_no=pin_no)
    obj1.schedule_status=0;
    obj1.save()
    return redirect('/')




class pin_state_list(APIView):

    def get(self,request):
        states=pin_state.objects.all()
        serializer=pin_stateSerializer(states,many=True)
        return Response(serializer.data)