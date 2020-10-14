

from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index),
    path('pin_state/', views.pin_state_list.as_view()),
    path('change_state/<pin_no>/<interrupt>/<flag>',views.change_state),
    path('set_schedule_time/<pin_no>/<sh>/<sm>/<eh>/<em>',views.set_schedule_time),
    path('remove_schedule_time/<pin_no>',views.remove_schedule_time),
    path('control_with_google_assistant/<id>/<cmd>',views.control_with_google_assistant),
    path('interrupt_handler/<pin_no>',views.interrupt_handler),


]
