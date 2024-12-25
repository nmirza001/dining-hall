import { VotesState, DiningData } from '@/types';
import { MealPeriod } from '@/config/dining-hours';

const STORAGE_KEY = 'csbsju-dining-votes';

interface StoredVoteData {
  date: string;
  meal: MealPeriod;
  votes: VotesState;
}

export function saveVotes(votes: VotesState, meal: MealPeriod): void {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `${STORAGE_KEY}-${today}-${meal}`;
    localStorage.setItem(key, JSON.stringify(votes));
  } catch (error) {
    console.error('Failed to save votes:', error);
  }
}

export function loadVotes(meal: MealPeriod): VotesState | null {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `${STORAGE_KEY}-${today}-${meal}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load votes:', error);
    return null;
  }
}

export function getReactionCount(reactions: string[]): { [key: string]: number } {
  return reactions.reduce((acc, reaction) => {
    acc[reaction] = (acc[reaction] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
}

export function formatReactionCount(reaction: string, count: number): string {
  if (count <= 1) return reaction;
  return `${reaction} ${count}`;
}