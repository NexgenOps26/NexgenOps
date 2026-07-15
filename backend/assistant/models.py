from django.db import models

class KnowledgeChunk(models.Model):
    title=models.CharField(max_length=255)
    content=models.TextField()
    source_path=models.CharField(max_length=255,blank=True)

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title 
