from django.db import models
from django.utils import timezone
from searchbar.models import *

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    shortname = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "1. Country"
        verbose_name_plural = "1. Country"
        
    def __str__(self):
        return self.name
    