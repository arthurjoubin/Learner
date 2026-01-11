import { useState } from 'react';
import { BookOpen, Plus, Trash2, BarChart3 } from 'lucide-react';

export default function Dashboard({ decks, stats, onAddDeck, onSelectDeck, onDeleteDeck }) {
  const [newDeckName, setNewDeckName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDeck = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      onAddDeck(newDeckName.trim());
      setNewDeckName('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Learner</h1>
          </div>
          <p className="text-gray-600">Master languages with spaced repetition</p>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Cards</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Due Today</p>
                <p className="text-3xl font-bold text-orange-600">{stats.due}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Reviewed Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.reviewedToday}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Decks Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Decks</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
            >
              <Plus className="w-5 h-5" />
              New Deck
            </button>
          </div>

          {/* Add Deck Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <form onSubmit={handleAddDeck}>
                <input
                  type="text"
                  placeholder="Enter deck name (e.g., Spanish Verbs)"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Decks Grid */}
          {decks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No decks yet. Create your first one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                >
                  <div
                    onClick={() => onSelectDeck(deck)}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{deck.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Click to open</p>
                  </div>
                  <div className="bg-gray-50 px-6 py-3 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Delete this deck and all its cards?')) {
                          onDeleteDeck(deck.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
