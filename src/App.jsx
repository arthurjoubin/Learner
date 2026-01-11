import { useState, useEffect } from 'react';
import { loadCards, saveCards, loadDecks, saveDecks } from './utils/storage';
import { getCardStats } from './utils/ankiAlgorithm';
import Dashboard from './components/Dashboard';
import DeckView from './components/DeckView';
import ReviewMode from './components/ReviewMode';
import AddCard from './components/AddCard';

export default function App() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [stats, setStats] = useState({ total: 0, due: 0, reviewedToday: 0 });

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedCards = loadCards();
    const loadedDecks = loadDecks();
    setCards(loadedCards);
    setDecks(loadedDecks);
  }, []);

  // Update stats whenever cards change
  useEffect(() => {
    setStats(getCardStats(cards));
  }, [cards]);

  // Save cards whenever they change
  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  // Save decks whenever they change
  useEffect(() => {
    saveDecks(decks);
  }, [decks]);

  const addDeck = (name) => {
    const newDeck = {
      id: Date.now().toString(),
      name,
      created: new Date().toISOString(),
    };
    setDecks([...decks, newDeck]);
  };

  const deleteDeck = (deckId) => {
    setDecks(decks.filter(d => d.id !== deckId));
    setCards(cards.filter(c => c.deckId !== deckId));
  };

  const addCard = (front, back, deckId) => {
    const newCard = {
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
    setCards([...cards, newCard]);
  };

  const updateCard = (updatedCard) => {
    setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(c => c.id !== cardId));
  };

  const getDeckCards = (deckId) => {
    return cards.filter(c => c.deckId === deckId);
  };

  const handleViewChange = (view, deck = null) => {
    setCurrentView(view);
    if (deck) setSelectedDeck(deck);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'dashboard' && (
        <Dashboard
          decks={decks}
          stats={stats}
          onAddDeck={addDeck}
          onSelectDeck={(deck) => handleViewChange('deck', deck)}
          onDeleteDeck={deleteDeck}
        />
      )}

      {currentView === 'deck' && selectedDeck && (
        <DeckView
          deck={selectedDeck}
          cards={getDeckCards(selectedDeck.id)}
          onAddCard={() => handleViewChange('addCard')}
          onReview={() => handleViewChange('review')}
          onBack={() => handleViewChange('dashboard')}
          onDeleteCard={deleteCard}
        />
      )}

      {currentView === 'addCard' && selectedDeck && (
        <AddCard
          deck={selectedDeck}
          onAdd={(front, back) => {
            addCard(front, back, selectedDeck.id);
            handleViewChange('deck', selectedDeck);
          }}
          onCancel={() => handleViewChange('deck', selectedDeck)}
        />
      )}

      {currentView === 'review' && selectedDeck && (
        <ReviewMode
          deck={selectedDeck}
          cards={getDeckCards(selectedDeck.id)}
          onUpdateCard={updateCard}
          onBack={() => handleViewChange('deck', selectedDeck)}
        />
      )}
    </div>
  );
}
