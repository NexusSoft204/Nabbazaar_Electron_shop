from django.contrib import admin
from settings.model.ReturnPolicy_model import ReturnPolicyModel

@admin.register(ReturnPolicyModel)
class ReturnPolicyModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'time_limit', 'updated_at')
    readonly_fields = ('updated_at',)

    fieldsets = (
        ("Core Headers", {
            'fields': ('title', 'description', 'time_limit')
        }),
        ("Policy & Conditions Breakdown", {
            'classes': ('collapse',),
            'fields': ('return_conditions', 'returnable_items')
        }),
        ("Processes & Protections", {
            'classes': ('collapse',),
            'fields': ('return_steps', 'warranty_terms')
        }),
        ("Metadata", {
            'fields': ('updated_at',)
        }),
    )

    # Restricts the system to a single record row
    def has_add_permission(self, request):
        if ReturnPolicyModel.objects.exists():
            return False
        return True
