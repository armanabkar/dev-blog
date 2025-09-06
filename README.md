# Ein statisch generierter Blog mit Next.js, TypeScript und Markdown

Dieses Projekt demonstriert die Static Generation-Funktion von Next.js unter Verwendung von Markdown-Dateien als Datenquelle.

Die Blogbeiträge werden im Verzeichnis `/_posts` als Markdown-Dateien mit Front Matter-Unterstützung gespeichert. Das Hinzufügen einer neuen Markdown-Datei in diesem Ordner erzeugt automatisch einen neuen Blogbeitrag.

Für die Umwandlung der Markdown-Dateien in HTML verwende ich die Bibliotheken [`remark`](https://github.com/remarkjs/remark) und [`remark-html`](https://github.com/remarkjs/remark-html). Die resultierende HTML-Zeichenkette wird als Prop an die Seite übergeben. Die Metadaten jedes Beitrags werden mit [`gray-matter`](https://github.com/jonschlinkert/gray-matter) verarbeitet und ebenfalls als Props an die Seite weitergegeben.

## Demo

[https:/dev-blog-scriptum.vercel.app/](https:/dev-blog-scriptum.vercel.app/)