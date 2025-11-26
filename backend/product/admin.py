from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "stock", "image")
    list_filter = ("stock", "price")
    search_fields = ("name", "description")
    readonly_fields = ("id",)
    fieldsets = (
        ('Product Information', {'fields': ('name', 'description')}),
        ('Pricing & Inventory', {'fields': ('price', 'stock')}),
        ('Media', {'fields': ('image',)}),
    )


admin.site.register(Product, ProductAdmin)