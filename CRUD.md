Hier sind Vorschläge für CRUD Funktionen die ein REST-Backend zur Verfügung stellen müsste:

1. GET-Funktionen:

- GET /api/questions => Liefert alle fragen
- GET /api/questions({id}) => Frage mit ID
- GET /api/questions/{id}/answers => Liefert alle antworten einer bestimmten frage zurück
- GET /api/iterations => Liefert alle Iterationen
- GET /api/iterations({id}) => Iterationen mit ID
- GET /api/iterations/{iterationId}/questions/{questionId}

2. POST-Funktionen:

- POST /api/iterations => Erstellt eine neue Iteration

3. PUT-Funktionen:

-PUT/api/questions/{questionId}/answers/{answerId} => Aktualisiert die antworten für die frage.
-PUT/api/iterations/{id} => Aktualisiert eine Iteration
-PUT/api/iterations/{iterationId}/questions/{questionId}/answers/{answerId} => Aktualisiert die Antworten für eine Frage in einer bestimmten Iteration

4. DELETE-Funktionen:

-DELETE/api/iterations/{id} => Löscht eine Iteration aus dem System
