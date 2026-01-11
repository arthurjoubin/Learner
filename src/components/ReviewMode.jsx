import { useState, useMemo } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { isCardDue, calculateNextReview } from '../utils/ankiAlgorithm';

const QUALITY_BUTTONS = [
  { label: 'Again', value: 0, color: 'bg-red-500 hover:bg-red-600' },
  { label: 'Hard', value: 1, color: 'bg-orange-500 hover:bg-orange-600' },
  { label: 'Good', value: 3, color: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'Easy', value: 5, color: 'bg-green-500 hover:bg-green-600' },
];

export default function ReviewMode({ deck, cards, onUpdateCard, onBack }) {
  const dueCards = useMemo(() => cards.filter(isCardDue), [cards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  if (dueCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Deck
          </button>

          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <RotateCcw className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">All caught up! 🎉</h2>
            <p className="text-gray-600 text-lg mb-8">No more cards to review. Great job!</p>
            <p className="text-gray-600 mb-8">You reviewed {reviewedCount} card{reviewedCount !== 1 ? 's' : ''} today.</p>
            <button
              onClick={onBack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Return to Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];
  const progress = currentIndex + 1;
  const total = dueCards.length;
  const progressPercent = (progress / total) * 100;

  const handleAnswer = (quality) => {
    const updatedCard = {
      ...currentCard,
      lastReview: new Date().toISOString(),
      ...calculateNextReview(currentCard, quality),
    };

    onUpdateCard(updatedCard);
    setReviewedCount(reviewedCount + 1);
    setIsFlipped(false);

    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(dueCards.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit Review
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{deck.name} - Review</h1>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Card {progress} of {total}
            </span>
            <span className="text-sm font-semibold text-indigo-600">{reviewedCount} reviewed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="mb-8">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-white rounded-lg shadow-lg p-12 min-h-96 flex flex-col items-center justify-center cursor-pointer transform transition-transform hover:shadow-xl"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                {isFlipped ? 'Answer' : 'Question'}
              </p>
              <p className="text-4xl font-bold text-gray-800 mb-8">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              <p className="text-gray-500 text-sm">
                {isFlipped ? 'Click to hide answer' : 'Click to reveal answer'}
              </p>
            </div>
          </div>
        </div>

        {/* Quality Buttons */}
        {isFlipped && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-sm text-gray-600 font-semibold mb-4">How well did you remember?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUALITY_BUTTONS.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => handleAnswer(btn.value)}
                  className={`${btn.color} text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
