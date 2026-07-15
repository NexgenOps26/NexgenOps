import re
from .models import KnowledgeChunk
def search_knowledge(query,top_k=3):
    words=re.findall(r'\w+',query.lower())
    if not words:
        return []
    scored=[]
    for chunk in KnowledgeChunk.objects.all():
        haystack=f"{chunk.title} {chunk.content}".lower()
        score=sum(haystack.count(word) for word in words)
        if score>0:
            scored.append((score,chunk))
    
    scored.sort(reverse=True,key=lambda x:x[0])
    return [chunk for _, chunk in scored[:top_k]]