import { ArrowLeft, Plus, Play, Trash2 } from 'lucide-react';
import { isCardDue } from '../utils/ankiAlgorithm';

export default function DeckView({ deck, cards, onAddCard, onReview, onBack, onDeleteCard }) {
  const dueCards = cards.filter(isCardDue);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Decks
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{deck.name}</h1>
          <p className="text-gray-600 mt-1">{cards.length} cards • {dueCards.length} due</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={onAddCard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Add Card
          </button>
          <button
            onClick={onReview}
            disabled={dueCards.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
          >
            <Play className="w-5 h-5" />
            Review ({dueCards.length})
          </button>
        </div>

        {/* Cards List */}
        {cards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No cards in this deck yet.</p>
            <button
              onClick={onAddCard}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Create Your First Card
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  isCardDue(card) ? 'border-l-4 border-orange-500' : ''
                }`}
              >
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Front</p>
                  <p className="text-lg font-semibold text-gray-800">{card.front}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Back</p>
                  <p className="text-gray-700">{card.back}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-blue-50 rounded px-3 py-2">
                    <p className="text-gray-600">Reps: {card.repetitions}</p>
                  </div>
                  <div className="bg-blue-50 rounded px-3 py-2">
                    <p className="text-gray-600">Ease: {card.ease.toFixed(2)}</p>
                  </div>
                </div>
                {card.nextReview && (
                  <div className="text-xs text-gray-600 mb-4">
                    <p>Next review: {new Date(card.nextReview).toLocaleDateString()}</p>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (window.confirm('Delete this card?')) {
                      onDeleteCard(card.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition text-sm font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
