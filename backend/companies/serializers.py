from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Company
from users.models import UserProfile


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class CompanyRegistrationSerializer(serializers.ModelSerializer):
    # Slide 4 admin credentials (for Django User creation)
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Company
        fields = [
            # Slide 1: company details
            "company_name",
            "company_type",
            "industry_sector",
            "gst_identification_number",
            "corporate_website",
            "corporate_work_email",
            "company_phone",

            # Slide 2: primary contact / corporate info
            "contact_officer_full_name",
            "corporate_designation",
            "mobile_contact_phone",
            "credentials_outbox_email",
            "detailed_street_address",
            "city",
            "state_region",
            "emergency_number",
            "postal_pincode",

            # Slide 3: facility / demographics
            "number_of_sites",
            "total_buildings_complex",
            "pre_onboarded_core_roster_count",
            "workforce_shifts_strength",
            "initial_facility_assets_count",

            # Slide 4 / onboarding metadata
            "terms_accepted",

            # admin credentials (not Company model fields, serializer-only fields)
            "username",
            "email",
            "password",
            "confirm_password",
        ]

    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")
        terms_accepted = attrs.get("terms_accepted")

        if confirm_password is not None and password != confirm_password:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )

        if not terms_accepted:
            raise serializers.ValidationError(
                {"terms_accepted": "You must accept the terms and conditions."}
            )

        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError(
                {"username": "A user with this username already exists."}
            )

        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
                {"email": "A user with this email already exists."}
            )

        return attrs

    def create(self, validated_data):
        # Remove admin credential fields from company payload
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        validated_data.pop("confirm_password", None)

        # 1) Create Django auth user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # 2) Create company with backend-managed audit fields
        company = Company.objects.create(
            **validated_data,
            created_by=user,
            updated_by=user
        )

        # 3) Create linked user profile
        profile = UserProfile.objects.create(
        user=user,
        company=company,
        role="company_admin",
        phone=company.mobile_contact_phone,
        designation=company.corporate_designation
     )

        return {
            "company": company,
            "user": user,
            "profile": profile
        }