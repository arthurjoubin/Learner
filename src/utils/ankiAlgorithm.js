// Simplified SM-2 Anki algorithm
const FACTORS = {
  INITIAL_EASE: 2.5,
  EASY_BONUS: 0.3,
  HARD_PENALTY: 0.2,
  MIN_EASE: 1.3,
};

const INTERVALS = {
  NEW: 1,
  LEARNING: 10,
  REVIEW: 1,
};

/**
 * Calculate next review interval based on Anki SM-2 algorithm
 * @param {number} ease - Factor affecting ease of recall (1.3 - 2.5+)
 * @param {number} interval - Current interval in days
 * @param {number} repetitions - Number of successful repetitions
 * @param {number} quality - Quality of answer (0-5)
 * @returns {object} Updated card state
 */
export const calculateNextReview = (card, quality) => {
  // Quality scale: 0-5
  // 0-2: again (fail), 3-4: good (pass), 5: easy

  let ease = card.ease || FACTORS.INITIAL_EASE;
  let interval = card.interval || 0;
  let repetitions = card.repetitions || 0;

  // Update ease factor
  if (quality < 3) {
    // Failed - reset
    ease = Math.max(FACTORS.MIN_EASE, ease - FACTORS.HARD_PENALTY);
    interval = 1;
    repetitions = 0;
  } else {
    // Passed
    if (quality === 5) {
      ease = ease + FACTORS.EASY_BONUS;
    } else if (quality === 3) {
      ease = Math.max(FACTORS.MIN_EASE, ease - 0.14);
    }

    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 3;
    } else {
      interval = Math.round(interval * ease);
    }
  }

  return {
    ease: Number(ease.toFixed(2)),
    interval,
    repetitions,
    nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString(),
  };
};

/**
 * Check if a card is due for review
 */
export const isCardDue = (card) => {
  if (!card.nextReview) return true;
  return new Date(card.nextReview) <= new Date();
};

/**
 * Get card statistics
 */
export const getCardStats = (cards) => {
  const dueCards = cards.filter(isCardDue);
  const totalCards = cards.length;
  const reviewedToday = cards.filter(card => {
    if (!card.lastReview) return false;
    const today = new Date().toDateString();
    return new Date(card.lastReview).toDateString() === today;
  }).length;

  return {
    total: totalCards,
    due: dueCards.length,
    reviewedToday,
  };
};
