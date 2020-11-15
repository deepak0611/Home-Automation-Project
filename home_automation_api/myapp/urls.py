

from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index,name= "index"),
    path('pin_state/', views.pin_state_list.as_view()),
    path('hardware_status_manager/<temp>/<humid>',views.hardware_status_manager),
    path('hardware_status/',views.hardware_status),
    path('hardware_reseter/',views.hardware_reseter),
    path('change_state/<pin_no>/<interrupt>/<flag>',views.change_state),
    path('change_pin_name/<id>/<new_name>',views.change_pin_name),
    path('set_schedule_time/<pin_no>/<sh>/<sm>/<eh>/<em>',views.set_schedule_time),
    path('remove_schedule_time/<pin_no>',views.remove_schedule_time),
    path('control_with_google_assistant/<id>/<cmd>',views.control_with_google_assistant),
    path('interrupt_handler/<pin_no>',views.interrupt_handler),

#authentication part #
    path('signup/',views.signup),
    path('login/',views.loginuser),
    path('logout/',views.logoutuser),
]
