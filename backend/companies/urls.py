from django.urls import path
from .views import CompanyRegisterView

urlpatterns = [
    path("register/", CompanyRegisterView.as_view(), name="company-register"),
]