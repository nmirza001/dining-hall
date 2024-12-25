// src/types/dining.types.ts
import { Campus, CrowdLevel } from '@/lib/dining-hours';
import { WeatherData } from './weather.types';

/**
 * Represents a user reaction to a dining experience
 */
export interface Reaction {
  reaction: string;
  timestamp: string;
}

/**
 * Represents the current state of a dining hall
 */
export interface DiningData {
  count: number;
  percentage: number;
  likes: string[];
  dislikes: string[];
  crowdLevel: CrowdLevel;
  recentReactions: Reaction[];
}

/**
 * Combined voting state for both campuses
 */
export interface VotesState {
  csb: DiningData;
  sju: DiningData;
}

/**
 * Props for the CampusCard component
 */
export interface CampusCardProps {
  campus: Campus;
  data: DiningData;
  name: string;
  weather: WeatherData;
  onVote: (campus: Campus) => void;
  onReaction: (campus: Campus, reaction: string) => void;
  onCrowdUpdate: (campus: Campus, level: CrowdLevel) => void;
  onFeedback: (campus: Campus, feedback: string, isLike: boolean) => void;
  isOpen: boolean;
  isLoading?: boolean;
}