from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("company_name", "company_type", "industry_sector", "corporate_work_email", "created_at")
    search_fields = ("company_name", "corporate_work_email", "gst_identification_number")