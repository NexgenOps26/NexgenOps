from django.db import models


class Company(models.Model):
    
    # SLIDE 1: Company details
    company_name = models.CharField(max_length=255)
    company_type = models.CharField(max_length=100)
    industry_sector = models.CharField(max_length=150)
    gst_identification_number = models.CharField(max_length=50)
    corporate_website = models.URLField(blank=True, null=True)
    corporate_work_email = models.EmailField()
    company_phone = models.CharField(max_length=20)

    # SLIDE 2: Primary contact / corporate info
    contact_officer_full_name = models.CharField(max_length=255)
    corporate_designation = models.CharField(max_length=150)
    mobile_contact_phone = models.CharField(max_length=20)
    credentials_outbox_email = models.EmailField()
    detailed_street_address = models.TextField()
    city = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    emergency_number = models.CharField(max_length=20, blank=True, null=True)
    postal_pincode = models.CharField(max_length=20)

    # SLIDE 3: Facility / demographics
    number_of_sites = models.PositiveIntegerField(default=1)
    total_buildings_complex = models.PositiveIntegerField(default=1)
    pre_onboarded_core_roster_count = models.PositiveIntegerField(default=0)
    workforce_shifts_strength = models.PositiveIntegerField(default=0)
    initial_facility_assets_count = models.PositiveIntegerField(default=0)

    # SLIDE 4 / onboarding metadata
    terms_accepted = models.BooleanField(default=False)

    # System fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name
