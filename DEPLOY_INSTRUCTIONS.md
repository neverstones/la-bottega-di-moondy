# Istruzioni per Caricare su GitHub Pages

## 1. Scarica il Progetto da Replit

1. Vai su File → Export → Download as ZIP
2. Estrai il file ZIP sul tuo computer

## 2. Crea un Repository su GitHub

1. Vai su [GitHub.com](https://github.com) e accedi
2. Clicca su "New repository" (verde)
3. Nome del repository: `la-bottega-di-moondy`
4. Descrizione: `Portfolio artistico con calligrafia, illustrazioni e arte digitale`
5. Imposta come **Public**
6. NON aggiungere README, .gitignore o licenza (li abbiamo già)
7. Clicca "Create repository"

## 3. Carica i File

### Opzione A: Via Web (più semplice)
1. Nella pagina del repository vuoto, clicca "uploading an existing file"
2. Trascina tutti i file del progetto (eccetto node_modules se presente)
3. Scrivi nel commit message: "Initial commit - Portfolio artistico"
4. Clicca "Commit changes"

### Opzione B: Via Git (se hai git installato)
```bash
# Nella cartella del progetto estratto
git init
git add .
git commit -m "Initial commit - Portfolio artistico"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/la-bottega-di-moondy.git
git push -u origin main
```

## 4. Abilita GitHub Pages

1. Nel repository, vai su **Settings** (tab in alto)
2. Scorri fino a **Pages** (menu laterale sinistro)
3. In "Source" seleziona **GitHub Actions**
4. Salva le modifiche

## 5. Deploy Automatico

- Il workflow GitHub Actions si attiverà automaticamente
- Vai su **Actions** tab per vedere il progresso
- Il deploy richiede 2-5 minuti
- Il sito sarà disponibile su: `https://TUO_USERNAME.github.io/la-bottega-di-moondy/`

## 6. Personalizzazioni Post-Deploy

### Aggiorna i Meta Tag
In `client/index.html`, sostituisci:
```html
<meta property="og:url" content="https://TUO_USERNAME.github.io/la-bottega-di-moondy/" />
```

### Aggiorna i Link Social
In `client/src/components/layout/Footer.tsx`, modifica i link social con i tuoi reali.

### Sostituisci le Immagini
- Carica le tue opere in `attached_assets/`
- Aggiorna i percorsi in `client/src/lib/artwork.ts`

### Modifica Email di Contatto
In `client/src/components/contact/ContactSection.tsx`, cambia:
```typescript
const mailtoLink = `mailto:tua-email@dominio.com?subject=...
```

## 7. Aggiornamenti Futuri

Ogni volta che modifichi i file e fai push su GitHub, il sito si aggiornerà automaticamente in 2-5 minuti.

## Note Importanti

- Il sito è completamente statico, perfetto per GitHub Pages
- Il modulo contatti apre il client email dell'utente
- Tutte le animazioni e funzionalità funzionano senza server
- Il background tartan scozzese è incluso nel CSS

## Supporto

Se hai problemi:
1. Controlla la tab **Actions** per errori di build
2. Verifica che tutti i file siano stati caricati correttamente
3. Assicurati che GitHub Pages sia abilitato nelle Settings