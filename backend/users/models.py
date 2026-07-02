from django.db import models
from django.contrib.auth.models import User
from companies.models import Company


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("company_admin", "Company Admin"),
        ("manager", "Manager"),
        ("technician", "Technician"),
        ("staff", "Staff"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="users")
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="company_admin")

    phone = models.CharField(max_length=20, blank=True, null=True)
    designation = models.CharField(max_length=150, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.company.company_name}"