# Ein statisch generierter Blog mit Next.js, TypeScript und Markdown

Dieses Projekt demonstriert die Static Generation-Funktion von Next.js unter Verwendung von Markdown-Dateien als Datenquelle.

Die Blogbeiträge werden im Verzeichnis `/_posts` als Markdown-Dateien mit Front Matter-Unterstützung gespeichert. Das Hinzufügen einer neuen Markdown-Datei in diesem Ordner erzeugt automatisch einen neuen Blogbeitrag.

Für die Umwandlung der Markdown-Dateien in HTML verwende ich die Bibliotheken [`remark`](https://github.com/remarkjs/remark), [`remark-gfm`](https://github.com/remarkjs/remark-gfm), [`remark-html`](https://github.com/remarkjs/remark-html) und [`remark-rehype`](https://github.com/remarkjs/remark-rehype). Für die Umwandlung des Markdown‑AST in HTML‑AST und das anschließende Syntax‑Highlighting in Codeblöcken kommen `rehype-prism-plus` und `prismjs` zum Einsatz, bevor der HTML‑AST mit `rehype-stringify` in eine HTML‑Zeichenkette umgewandelt wird. Die resultierende HTML-Zeichenkette wird als Prop an die Seite übergeben. Die Metadaten jedes Beitrags werden mit [`gray-matter`](https://github.com/jonschlinkert/gray-matter) verarbeitet und ebenfalls als Props an die Seite weitergegeben. Datumsformatierungen nutze ich `date-fns`, und `classnames` hilft bei der dynamischen Vergabe von CSS‑Klassennamen.

## Demo

[https:/dev-blog-scriptum.vercel.app/](https:/dev-blog-scriptum.vercel.app/)

## 🚀 Funktionen

- ⚛️ Next.js App Router
- 🌎 Für SEO optimiert mit Next.js Metadata
- 🧾 Dynamische Open Graph (OG)-Bilder für Social-Media-Sharing
- 🎨 Tailwind CSS für responsives, Utility-First-Design
- 🌗 Automatischer Hell-/Dunkelmodus basierend auf Systemeinstellungen

#### Todos

- [x] Styling & Code‑Formatierung verbessern
- [x] Tags & Tag‑Suche implementieren
- [x] Kategorien hinzufügen
- [ ] Kontaktformular erstellen
- [ ] Suchfunktion für Blogbeiträge
- [ ] Kommentarbereich hinzufügen
- [ ] Umfassende Test-Suite mit Vitest

### Projektstruktur

- `app`: Enthält den Hauptanwendungscode, einschließlich Seiten, Komponenten und Layouts.
- `components`: Wiederverwendbare UI-Komponenten.Komponenten.
- `lib`: Hilfsfunktionen und Konstanten, die in der gesamten Anwendung verwendet werden.
- `_posts`: Beiträge, die in der Blogseite angezeigt werden.

### Wichtige Komponenten

-

### Styling

- Tailwind CSS wird für das Styling verwendet, mit einer benutzerdefinierten Konfigurationsdatei (`tailwind.config.js`).
- Automatischer Hell-/Dunkelmodus ist basierend auf den Systemeinstellungen aktiviert.

### Getting Started

Um mit der Anwendung zu starten, folge diesen Schritten:

1. Repository klonen: `git clone https://github.com/armanabkar/dev-blog.git`
2. Abhängigkeiten installieren: `npm install`
3. Anwendung starten: `npm run dev`

### Contributing

Um zum Projekt beizutragen, folge diesen Schritten:

1. Repository forken: `git fork https://github.com/your-username/your-repo-name.git`
2. Änderungen vornehmen: `git add .` und `git commit -m "deine Commit-Nachricht"`
3. Pull Request einreichen: `git push origin dein-branch-name`

### Deployment

Diese Website ist absichtlich für die Indexierung durch Suchmaschinen gesperrt.  
Grund: Sie befindet sich derzeit in der Entwicklung/Testphase und soll noch nicht öffentlich auffindbar sein.

#### Wie die Indexierung blockiert wird
1. **robots.txt** im Ordner `/public` blockiert alle Crawler.
2. **Globales `<meta name="robots" content="noindex, nofollow">`** wird über `metadata.robots` in `app/layout.tsx` gesetzt.

#### So aktivieren Sie die Indexierung wieder
Sobald die Seite live gehen soll:
1. **`public/robots.txt` anpassen**, um Crawling zu erlauben.
2. oder die Datei komplett entfernen.
2. **`app/layout.tsx` aktualisieren**:
```tsx
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
}
```

### License

Das Projekt wird unter der **MIT-Lizenz** veröffentlicht.