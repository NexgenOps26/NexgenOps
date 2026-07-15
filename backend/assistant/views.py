from rest_framework.views import APIView
from rest_framework.response import Response
from .services import search_knowledge

class AssistantQueryView(APIView):
    def post(self, request):
        query=request.data.get("query", "").strip()
        if not query:
            return Response({"answer":"Please type a question.","sources":[]})
        chunks=search_knowledge(query)
        if not chunks:
            return Response({
                "answer":"I couldn't find any anything about that yet.",
                "sources":[],
            })
        best=chunks[0]
        return Response({
            "answer":best.content,
            "sources":[{"title":c.title,"path":c.source_path} for c in chunks],
        })