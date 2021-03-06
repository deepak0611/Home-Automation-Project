

from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index,name= "index"),
    path('pin_state/', views.pin_state_list.as_view()),
    path('change_state/<pin_no>/<interrupt>/<flag>',views.change_state),
    path('change_pin_name/<id>/<new_name>',views.change_pin_name),
    path('set_schedule_time/<pin_no>/<sh>/<sm>/<eh>/<em>',views.set_schedule_time),
    path('remove_schedule_time/<pin_no>',views.remove_schedule_time),
    path('control_with_google_assistant/<id>/<cmd>',views.control_with_google_assistant),
    path('interrupt_handler/<pin_no>',views.interrupt_handler),

# hardware related
    path('hardware_status_manager/<temp>/<humid>',views.hardware_status_manager),
    path('hardware_status/',views.hardware_status),
    path('hardware_reseter/',views.hardware_reseter),

#temperature sensitivity
    path('activate_temp_sensitivity/<pin_no>/<temp>/<cmd>',views.activate_temp_sensitivity),
    path('remove_temp_sensitivity/<pin_no>',views.remove_temp_sensitivity),

#authentication part #
    path('signup/',views.signup),
    path('login/',views.loginuser),
    path('logout/',views.logoutuser),

#sending email#
    path('notify_with_email/',views.notify_with_email),
]
