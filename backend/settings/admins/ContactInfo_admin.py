from django.contrib import admin
from settings.model.ContactInfo_model import ContactInfoModel

@admin.register(ContactInfoModel)
class ContactInfoModelAdmin(admin.ModelAdmin):
    list_display = ('email', 'whatsapp', 'working_hours')
    
    fieldsets = (
        ("Social & Messaging Networks", {
            'fields': ('whatsapp', 'telegram', 'instagram', 'facebook')
        }),
        ("Direct Communication", {
            'fields': ('email', 'working_hours')
        }),
        ("Physical Geography & Coordinates", {
            'fields': ('address', 'google_map_link')
        }),
    )

    # Enforces a singleton structure so the team can't accidently add multiple info cards
    def has_add_permission(self, request):
        if ContactInfoModel.objects.exists():
            return False
        return True
