from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Company
from .serializers import CompanyRegistrationSerializer


class CompanyRegisterView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = serializer.save()

        company = result["company"]
        user = result["user"]
        profile = result["profile"]

        # Generate JWT tokens for the newly created admin user
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Company registered successfully",
                "company": {
                    "id": company.id,
                    "company_name": company.company_name,
                    "company_type": company.company_type,
                    "industry_sector": company.industry_sector,
                    "corporate_work_email": company.corporate_work_email,
                },
                "admin_user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "profile": {
                    "id": profile.id,
                    "role": profile.role,
                    "phone": profile.phone,
                    "designation": profile.designation,
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            },
            status=status.HTTP_201_CREATED,
        )