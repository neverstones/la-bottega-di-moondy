# La Bottega di Moondy - Portfolio Artistico

Portfolio artistico con calligrafia, illustrazioni e arte digitale, caratterizzato da uno stile unico con elementi scozzesi e design elegante.

## 🎨 Caratteristiche

- **Design Responsivo**: Ottimizzato per desktop, tablet e mobile
- **Portfolio Interattivo**: Galleria di opere con filtri per categoria
- **Modulo Contatti**: Integrazione con client email
- **Testimonianze**: Sezione dedicata ai feedback dei clienti
- **Tema Scozzese**: Background con pattern tartan autentico
- **Animazioni Fluide**: Transizioni smooth con Framer Motion

## 🚀 Deploy su GitHub Pages

### Configurazione Automatica

1. **Fork questo repository** nel tuo account GitHub

2. **Abilita GitHub Pages**:
   - Vai su Settings → Pages
   - Source: "GitHub Actions"
   - Salva le modificazioni

3. **Personalizza il sito**:
   - Modifica `client/index.html` per aggiornare i meta tag
   - Aggiorna i link social in `client/src/components/layout/Footer.tsx`
   - Sostituisci le immagini nel portfolio

4. **Deploy Automatico**:
   - Ogni push sul branch `main` triggera il deploy automatico
   - Il sito sarà disponibile su: `https://[username].github.io/la-bottega-di-moondy/`

### Build Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview del build
npm run preview
```

## 📁 Struttura del Progetto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componenti riutilizzabili
│   │   ├── pages/          # Pagine principali
│   │   ├── lib/            # Utilità e dati statici
│   │   └── hooks/          # Hook personalizzati
│   └── index.html          # Template HTML
├── .github/workflows/      # CI/CD GitHub Actions
├── public/                 # File statici
└── dist/                   # Build di produzione
```

## 🎨 Personalizzazione

### Colori e Stili

I colori principali sono definiti in `client/src/index.css`:

```css
:root {
  --primary: #8A4FFF;          /* Viola principale */
  --purple-dark: #6B46C1;      /* Viola scuro */
  --purple-light: #C4B5FD;     /* Viola chiaro */
  --gold: #F0CE6C;             /* Oro per accenti */
}
```

### Dati del Portfolio

Modifica `client/src/lib/artwork.ts` per:
- Aggiungere nuove opere d'arte
- Modificare categorie
- Aggiornare testimonianze

### Social Media

Aggiorna i link in `client/src/components/layout/Footer.tsx`:

```typescript
const socialLinks = [
  { icon: Instagram, href: "TUO_LINK_INSTAGRAM", label: "Instagram" },
  { icon: Facebook, href: "TUO_LINK_FACEBOOK", label: "Facebook" },
  // ... altri link
];
```

## 🛠️ Tecnologie Utilizzate

- **React 18** - Libreria UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animazioni
- **Wouter** - Routing
- **Radix UI** - Componenti accessibili
- **Vite** - Build tool

## 📧 Contatti

Il modulo contatti apre automaticamente il client email dell'utente con i dati precompilati. Per integrare un servizio di invio email (come Formspree), modifica `client/src/components/contact/ContactSection.tsx`.

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

---

**Sviluppato con ❤️ per La Bottega di Moondy**