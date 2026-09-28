from django.contrib import admin
from settings.model.TermsAndConditions_model import TermsAndConditionsModel

@admin.register(TermsAndConditionsModel)
class TermsAndConditionsModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')
    readonly_fields = ('updated_at',)

    # دسته‌بندی تب‌ها به صورت منوهای بازشونده تاشو
    fieldsets = (
        ("General Config", {
            'fields': ('title',)
        }),
        ("General & Purchase Policies", {
            'classes': ('collapse',), # بازشوی تاشو برای شلوغ نشدن صفحه
            'fields': ('terms_of_use', 'purchase_terms')
        }),
        ("Ordering & Operations", {
            'classes': ('collapse',),
            'fields': ('order_rules', 'payment_rules')
        }),
        ("Shipping & Cancellations", {
            'classes': ('collapse',),
            'fields': ('shipping_rules', 'cancellation_terms')
        }),
        ("System Metadata", {
            'fields': ('updated_at',)
        }),
    )

    # سیستم تک‌رکورد (Singleton): جلوگیری از ساختن چندین صفحه قوانین مختلف در سایت
    def has_add_permission(self, request):
        if TermsAndConditionsModel.objects.exists():
            return False
        return True
