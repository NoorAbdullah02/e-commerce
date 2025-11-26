from django.contrib import admin
from .models import StripeModel, BillingAddress, OrderModel


class StripeModelAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "card_number", "user", "exp_month", "exp_year", "customer_id")
    list_filter = ("user", "exp_year")
    search_fields = ("email", "card_number", "user__username")
    readonly_fields = ("id", "customer_id", "card_id")


class BillingAddressModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "user", "phone_number", "city", "state")
    list_filter = ("city", "state", "user")
    search_fields = ("name", "user__username", "city")
    readonly_fields = ("id",)


class OrderModelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "user", "paid_status", "is_delivered", "total_price", "paid_at")
    list_filter = ("paid_status", "is_delivered", "paid_at")
    search_fields = ("name", "user__username", "ordered_item")
    readonly_fields = ("id", "paid_at")
    fieldsets = (
        ('Order Information', {'fields': ('name', 'user', 'ordered_item')}),
        ('Payment Details', {'fields': ('card_number', 'total_price', 'paid_status', 'paid_at')}),
        ('Delivery Information', {'fields': ('address', 'is_delivered', 'delivered_at')}),
    )


admin.site.register(StripeModel, StripeModelAdmin)
admin.site.register(BillingAddress, BillingAddressModelAdmin)
admin.site.register(OrderModel, OrderModelAdmin)