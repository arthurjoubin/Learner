const STORAGE_KEY = 'learner_cards';
const DECKS_KEY = 'learner_decks';

export const loadCards = () => {
  try {
    const cards = localStorage.getItem(STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
};

export const saveCards = (cards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving cards:', error);
  }
};

export const loadDecks = () => {
  try {
    const decks = localStorage.getItem(DECKS_KEY);
    return decks ? JSON.parse(decks) : [];
  } catch (error) {
    console.error('Error loading decks:', error);
    return [];
  }
};

export const saveDecks = (decks) => {
  try {
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (error) {
    console.error('Error saving decks:', error);
  }
};

export const createCard = (front, back, deckId) => {
  return {
    id: Date.now().toString(),
    front,
    back,
    deckId,
    created: new Date().toISOString(),
    lastReview: null,
    nextReview: null,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
  };
};

export const createDeck = (name) => {
  return {
    id: Date.now().toString(),
    name,
    created: new Date().toISOString(),
  };
};
