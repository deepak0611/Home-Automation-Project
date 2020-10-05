

from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index),
    path('pin_state/', views.pin_state_list.as_view()),
    path('change_state/<pin_no>',views.change_state),
    path('set_schedule_time/<pin_no>/<sh>/<sm>/<eh>/<em>',views.set_schedule_time),
    path('remove_schedule_time/<pin_no>',views.remove_schedule_time),

    path('switch_on_pin1/',views.switch_on_pin1),
    path('switch_off_pin1/',views.switch_off_pin1),
    path('switch_on_pin2/',views.switch_on_pin2),
    path('switch_off_pin2/',views.switch_off_pin2),
    path('switch_on_pin3/',views.switch_on_pin3),
    path('switch_off_pin3/',views.switch_off_pin3),
    path('switch_on_pin4/',views.switch_on_pin4),
    path('switch_off_pin4/',views.switch_off_pin4),
]
