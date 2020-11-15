from django.shortcuts import render, redirect
import time
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import pin_stateSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout


def signup(request):
    if(request.method == 'POST'):
        username = request.POST.get("username")
        password = request.POST.get("password1")
        email = request.POST.get("email")
        user = User.objects.create_user(username,email,password)
        user.save()
        return  redirect(index)

    return render(request,'myapp/signup.html')

def loginuser(request):
    if(request.method == 'POST'):
        username = request.POST.get("username")
        password = request.POST.get("password1")
        user = authenticate(username = username,password = password)
        if user is not None:
            login(request,user)

    return redirect(index)

def logoutuser(request):
    if(request.method=="POST"):
        logout(request)
        return redirect(index)


def index(request):
    obj1 = pin_state.objects.all()
    obj2 = hardware.objects.get(id=1)
    # if(request.user.is_anonymous):
    #     # return redirect(loginuser)
    #     print(request.user)
    #     return render(request, 'myapp/login.html',{'hardware':obj2,'anonymous':True})

    # return render(request, 'myapp/index.html', {'pin': obj1})
    return render(request, 'myapp/index.html', {'pin': obj1,'hardware':obj2})


def change_state(request, pin_no, interrupt, flag):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    print(interrupt)
    if(int(interrupt)==int(1)):
        obj1.toggler="bc"
    else :
        obj1.toggler="sc"



    if (obj1.schedule_status):
        obj1.interrupt = bool(interrupt)
    else:
        obj1.interrupt = 0

    print(obj1.interrupt)

    obj1.state = flag

    obj1.save()
    return redirect('/')


def change_pin_name(request,id,new_name):
    obj1=pin_state.objects.get(id=id)
    obj1.pin_name = new_name.capitalize()
    obj1.save()
    return HttpResponse("new pin name saved successfully!")

# def switch_state_change_on_scheduled_time(request):
#     x = time.localtime(time.time())
#     z = time.strftime("%I:%M %p", x)
#     y = time.strftime("%d-%m-%Y", x)


# def set_schedule_time(request,pin_no):
#     obj1= pin_state.objects.get(pin_no=pin_no)
#
#     obj1.start_hr=request.GET['sh'];
#     obj1.start_min=request.GET['sm'];
#     obj1.end_hr=request.GET['eh'];
#     obj1.end_min=request.GET['em'];
#     obj1.schedule_status=1;
#     obj1.save()
#
#     return redirect('/')

def set_schedule_time(request, pin_no, sh, sm, eh, em):
    obj1 = pin_state.objects.get(pin_no=pin_no)

    obj1.start_hr = sh
    obj1.start_min = sm
    obj1.end_hr = eh
    obj1.end_min = em
    obj1.schedule_status = 1
    obj1.interrupt = 0
    obj1.save()

    return redirect('/')


def remove_schedule_time(request, pin_no):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    obj1.schedule_status = 0
    obj1.interrupt = 0
    obj1.save()
    return redirect('/')


class pin_state_list(APIView):

    def get(self, request):

        states = pin_state.objects.all()
        serializer = pin_stateSerializer(states, many=True)
        return Response(serializer.data)



def hardware_status_manager(request,temp,humid):
    obj1 = hardware.objects.get(id=1)
    obj1.status = obj1.status +1
    obj1.temp = temp
    obj1.humid =humid
    obj1.save()

    return HttpResponse("response sent!")


def hardware_status(request):
    obj1 = hardware.objects.get(id=1)
    return HttpResponse(obj1.status)


def hardware_reseter(request):
    obj1 = hardware.objects.get(id=1)
    obj1.status = 0
    obj1.save()
    return HttpResponse("reset successful!")



def control_with_google_assistant(request, id, cmd):
    obj1 = pin_state.objects.get(id=id)
    # obj1.interrupt=1

    obj1.toggler = "gac"


    if (obj1.schedule_status):
        obj1.interrupt = 1
    else:
        obj1.interrupt = 0

    if (cmd == "off"):
        obj1.state = 0
    else:
        obj1.state = 1

    obj1.save()
    return HttpResponse("request executed successfully!")


def interrupt_handler(request, pin_no):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    obj1.interrupt = 0
    obj1.save()
    return HttpResponse("interrupt changed to False")

def notify_with_email():
    pass