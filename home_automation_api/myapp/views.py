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
from django.core.mail import send_mail
from django.conf import settings


def signup(request):
    if(request.method == 'POST'):
        username = request.POST.get("username")
        password = request.POST.get("password1")
        email = request.POST.get("email")
        user = User.objects.create_user(username,email,password)
        user.save()
        subject = "Welcome to Home Automation!"
        message = f'Hello {user.username}, \nWe assure you for a clean and smooth experience at our platform.\n\nRegards,\nTeam Home Automation'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        send_mail(subject, message, email_from, recipient_list)
        login(request, user)
        return  redirect(index)

    return render(request,'myapp/signup.html')

def loginuser(request):
    obj2 = hardware.objects.get(id=1)
    if(request.method == 'POST'):
        username = request.POST.get("username")
        password = request.POST.get("password1")
        user = authenticate(username = username,password = password)
        if user is not None:
            login(request,user)
            return redirect(index)
        else:
            return render(request, 'myapp/login.html', {'hardware': obj2, 'sign': 1})


    return render(request, 'myapp/login.html',{'hardware':obj2,'sign':0})

def logoutuser(request):
    if(request.method=="POST"):
        logout(request)
        return redirect(index)


def index(request):
    obj1 = pin_state.objects.all()
    obj2 = hardware.objects.get(id=1)

    if(request.user.is_anonymous):
        return redirect(loginuser)

    # return render(request, 'myapp/index.html', {'pin': obj1})
    return render(request, 'myapp/index.html', {'pin': obj1,'hardware':obj2})


def change_state(request, pin_no, interrupt, flag):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    # print(int(interrupt))
    if(int(interrupt)==int(1)):
        obj1.toggler="bc"
    else :
        obj1.toggler="sc"

    # print(bool(interrupt))


    if (obj1.schedule_status):
        obj1.interrupt = int(interrupt)
    else:
        obj1.interrupt = 0

    # print(obj1.interrupt)

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
    obj1.temp = str(temp)
    obj1.humid =str(humid)
    obj1.save()

    return HttpResponse("response sent!")


def hardware_status(request):
    obj1 = hardware.objects.get(id=1)
    status = obj1.status
    temp = obj1.temp
    humid = obj1.humid
    res = ""
    res = res + str(status) + " " + str(temp) + " " + str(humid)
    # print(res)
    return HttpResponse(res)


def hardware_reseter(request):
    obj1 = hardware.objects.get(id=1)
    obj1.status = 0
    obj1.save()
    return HttpResponse("reset successful!")



def control_with_google_assistant(request, id, cmd):
    obj1 = pin_state.objects.get(id=id)
    if(obj1.temp_sensitivity_status):
        return HttpResponse("command cannot be executed")
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
    return HttpResponse("command executed successfully!")


def interrupt_handler(request, pin_no):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    obj1.interrupt = 0
    obj1.save()
    return HttpResponse("interrupt changed to False")

def notify_with_email(request):
    subject = "welcome yo home automation!"
    message = f'we are very happy for you to being part of our community.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['deepak.16214334@gmail.com','dkumar@ec.iitr.ac.in']
    send_mail(subject,message,email_from,recipient_list)

    return HttpResponse("email sent!")

def activate_temp_sensitivity(request,pin_no,temp,cmd):
    obj1= pin_state.objects.get(pin_no=pin_no)
    obj1.temp_sensitivity_status=1
    obj1.sensitive_temp=temp
    obj1.sensitive_action=cmd
    obj1.save()
    return HttpResponse("successful!")

def remove_temp_sensitivity(request,pin_no):
    obj1 = pin_state.objects.get(pin_no=pin_no)
    obj1.temp_sensitivity_status = 0
    obj1.save()
    return HttpResponse("removed successfully!")
