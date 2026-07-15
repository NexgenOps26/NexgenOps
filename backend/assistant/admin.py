
from django.contrib import admin
from .models import KnowledgeChunk

@admin.register(KnowledgeChunk)
class KnowledgeChunkAdmin(admin.ModelAdmin):
    list_display=("title","source_path","updated_at")
    search_fields=("title","content")
