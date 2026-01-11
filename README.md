# Learner - Language Learning with Anki

A modern, open-source language learning app using spaced repetition (Anki method). Built with React, Tailwind CSS, and Vite.

## Features

- 🎯 **Anki Spaced Repetition**: Uses the SM-2 algorithm for optimal learning
- 📚 **Multiple Decks**: Organize your cards into different decks
- 💾 **Local Storage**: All data saved locally in your browser
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Lightning Fast**: Built with Vite for instant hot reload
- 📱 **Mobile Friendly**: Fully responsive design

## Getting Started

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## How to Use

1. **Create a Deck**: Click "New Deck" on the dashboard
2. **Add Cards**: Click "Add Card" in your deck to create flashcards
3. **Study**: Click "Review" to start studying with spaced repetition
4. **Rate Your Knowledge**: After each card, rate how well you knew it:
   - **Again**: You forgot (restarts learning)
   - **Hard**: You struggled
   - **Good**: You got it right
   - **Easy**: Very easy for you

## Anki Algorithm

The app uses the SM-2 (SuperMemo 2) spaced repetition algorithm:

- **New cards**: Reviewed after 1 day
- **Learning**: Exponential intervals based on ease factor
- **Ease Factor**: Ranges from 1.3 to 2.5+, adjusted based on performance
- **Optimal scheduling**: Cards appear right before you're about to forget them

## Deployment on Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. Push your repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub account
4. Select your repository
5. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click Deploy

### Option 2: Direct Upload

1. Build the project: `npm run build`
2. Go to Cloudflare Pages
3. Upload the `dist` folder
4. Your app is live!

## Local Storage

All data is stored in your browser's localStorage:
- `learner_cards`: Stores all flashcards
- `learner_decks`: Stores all decks

Export your data anytime by opening browser DevTools and running:
```javascript
JSON.parse(localStorage.getItem('learner_cards'))
```

## Technologies

- **React 19**: Modern UI framework
- **Vite 7**: Ultra-fast build tool
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **localStorage**: Browser-based data persistence

## Browser Support

Works on all modern browsers with localStorage support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Contributing

Feel free to fork and submit improvements!
