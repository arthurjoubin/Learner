import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AddCard({ deck, onAdd, onCancel }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onAdd(front.trim(), back.trim());
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Deck
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Add New Card</h1>
          <p className="text-gray-600 mt-1">to {deck.name}</p>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Front (Question)
              </label>
              <textarea
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="e.g., What is the Spanish word for 'hello'?"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                autoFocus
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Back (Answer)
              </label>
              <textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="e.g., Hola"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!front.trim() || !back.trim() || isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition"
              >
                {isSubmitting ? 'Adding...' : 'Add Card'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for effective cards:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Keep answers concise and specific</li>
            <li>• Focus on one concept per card</li>
            <li>• Use real-world context when possible</li>
            <li>• Include pronunciation guides if helpful</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
