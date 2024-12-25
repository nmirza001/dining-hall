"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import CampusCard from './CampusCard';
import { DINING_HOURS, Campus, CrowdLevel, MealPeriod } from '@/lib/dining-hours';
import { VotesState, WeatherState } from '@/types';
import { fetchWeather } from '@/lib/weather';
import { getTimeUntilReset } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CROWD_RESET_INTERVAL = 20 * 60 * 1000; // 20 minutes
const WEATHER_UPDATE_INTERVAL = 10 * 60 * 1000; // 10 minutes

const initialVoteState = {
  count: 0, 
  percentage: 50, 
  likes: [] as string[], 
  dislikes: [] as string[],
  crowdLevel: 'Unknown' as CrowdLevel,
  recentReactions: [] as Array<{ reaction: string; timestamp: string }>
};

const DiningVoteSystem = () => {
  const [currentMeal, setCurrentMeal] = useState<MealPeriod>('Closed');
  const [lastCrowdReset, setLastCrowdReset] = useState(new Date());
  const [nextCrowdReset, setNextCrowdReset] = useState(new Date());

  const [weatherData, setWeatherData] = useState<WeatherState>({
    csb: { temp: null, humidity: null, feelsLike: null },
    sju: { temp: null, humidity: null, feelsLike: null }
  });

  const [votes, setVotes] = useState<VotesState>({
    csb: { ...initialVoteState },
    sju: { ...initialVoteState }
  });

  // Reset crowd levels every 20 minutes
  useEffect(() => {
    const resetCrowdLevels = () => {
      setVotes(prev => ({
        csb: { ...prev.csb, crowdLevel: 'Unknown' },
        sju: { ...prev.sju, crowdLevel: 'Unknown' }
      }));
      setLastCrowdReset(new Date());
      setNextCrowdReset(new Date(Date.now() + CROWD_RESET_INTERVAL));
    };

    resetCrowdLevels();
    const interval = setInterval(resetCrowdLevels, CROWD_RESET_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Check if dining hall is open
  const isOpen = (campus: Campus): boolean => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const time = hour + minutes / 60;
    const day = now.getDay();
    const isWeekday = day >= 1 && day <= 5;
    const isFriday = day === 5;
    const isSaturday = day === 6;
    const isSunday = day === 0;

    if (campus === 'csb') {
      const hours = isWeekday ? DINING_HOURS.csb.weekday : DINING_HOURS.csb.weekend;
      return hours.open !== null && hours.close !== null && time >= hours.open && time < hours.close;
    } else {
      const hours = isFriday ? DINING_HOURS.sju.friday : 
                   isSaturday ? DINING_HOURS.sju.saturday :
                   isSunday ? DINING_HOURS.sju.sunday :
                   DINING_HOURS.sju.weekday;
      return hours.open !== null && hours.close !== null && time >= hours.open && time < hours.close;
    }
  };

  // Determine current meal period
  useEffect(() => {
    const getCurrentMeal = (): MealPeriod => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const time = hour + minutes / 60;
      
      if (!isOpen('csb') && !isOpen('sju')) return 'Closed';

      if (time >= 7 && time < 10.5) return 'Breakfast';
      if (time >= 11 && time < 14.5) return 'Lunch';
      return 'Dinner';
    };

    setCurrentMeal(getCurrentMeal());
    const timer = setInterval(() => {
      setCurrentMeal(getCurrentMeal());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle vote changes
  const handleVote = (campus: Campus) => {
    if (!isOpen(campus)) return;

    setVotes(prev => {
      const otherCampus = campus === 'csb' ? 'sju' : 'csb';
      const newCampusCount = prev[campus].count + 1;
      const totalVotes = newCampusCount + prev[otherCampus].count;

      return {
        ...prev,
        [campus]: {
          ...prev[campus],
          count: newCampusCount,
          percentage: Math.round((newCampusCount / totalVotes) * 100)
        },
        [otherCampus]: {
          ...prev[otherCampus],
          percentage: Math.round((prev[otherCampus].count / totalVotes) * 100)
        }
      };
    });
  };

  // Handle reaction updates
  const handleReaction = (campus: Campus, reaction: string) => {
    if (!isOpen(campus)) return;

    setVotes(prev => ({
      ...prev,
      [campus]: {
        ...prev[campus],
        recentReactions: [
          { reaction, timestamp: new Date().toLocaleTimeString() },
          ...prev[campus].recentReactions.slice(0, 4)
        ]
      }
    }));
  };

  // Handle crowd level updates
  const handleCrowdUpdate = (campus: Campus, level: CrowdLevel) => {
    if (!isOpen(campus)) return;

    setVotes(prev => ({
      ...prev,
      [campus]: { ...prev[campus], crowdLevel: level }
    }));
  };

  // Handle feedback updates
  const handleFeedback = (campus: Campus, feedback: string, isLike: boolean) => {
    if (!isOpen(campus) || !feedback.trim()) return;

    setVotes(prev => ({
      ...prev,
      [campus]: {
        ...prev[campus],
        [isLike ? 'likes' : 'dislikes']: [
          ...prev[campus][isLike ? 'likes' : 'dislikes'],
          feedback
        ].slice(-5)
      }
    }));
  };

  return (
    <div className="w-full max-w-4xl p-4 space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">CSBSJU Dining Battle</h1>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Clock className="h-5 w-5" />
          <span>{currentMeal}</span>
        </div>
        <div className="text-sm text-gray-600">
          Crowd levels reset in: {getTimeUntilReset(nextCrowdReset)}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CampusCard 
          campus="csb"
          data={votes.csb}
          name="Gorecki"
          weather={weatherData.csb}
          onVote={handleVote}
          onReaction={handleReaction}
          onCrowdUpdate={handleCrowdUpdate}
          onFeedback={handleFeedback}
          isOpen={isOpen('csb')}
        />
        <CampusCard 
          campus="sju"
          data={votes.sju}
          name="Refectory"
          weather={weatherData.sju}
          onVote={handleVote}
          onReaction={handleReaction}
          onCrowdUpdate={handleCrowdUpdate}
          onFeedback={handleFeedback}
          isOpen={isOpen('sju')}
        />
      </div>

      {currentMeal === 'Closed' && (
        <Alert>
          <AlertDescription>
            Dining halls are currently closed. Check back during meal times!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DiningVoteSystem;

