from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "company", "role", "phone", "designation", "created_at")
    search_fields = ("user__username", "company__company_name")
