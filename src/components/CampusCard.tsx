import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Users, Utensils, MessageSquare } from 'lucide-react';
import WeatherDisplay from '@/components/WeatherDisplay';
import { Campus, CrowdLevel } from '@/lib/dining-hours';
import { CampusCardProps } from '@/types';
import { getReactionCount } from '@/lib/storage';

const reactions = ['👍', '👎', '😋', '🤔', '😕'];

const CampusCard: React.FC<CampusCardProps> = ({
  campus,
  data,
  name,
  weather,
  onVote,
  onReaction,
  onCrowdUpdate,
  onFeedback,
  isOpen
}) => {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Calculate reaction counts
  const reactionCounts = useMemo(() => {
    const counts = getReactionCount(data.recentReactions.map(r => r.reaction));
    return Object.entries(counts)
      .map(([reaction, count]) => count > 1 ? `${reaction} ${count}` : reaction)
      .join(' ');
  }, [data.recentReactions]);

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg md:text-xl">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            {name}
            <div className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <div className="text-sm font-normal">
            {isOpen ? `${data.crowdLevel} Crowd` : 'Closed'}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <WeatherDisplay weather={weather} />

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{data.percentage}%</span>
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {data.count} votes
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`${campus === 'csb' ? 'bg-blue-600' : 'bg-red-600'} rounded-full h-4 transition-all duration-500`}
            style={{ width: `${data.percentage}%` }}
          />
        </div>

        <Button 
          className="w-full"
          onClick={() => onVote(campus)}
          disabled={!isOpen}
        >
          <ThumbsUp className="h-5 w-5 mr-2" />
          Vote for {name}
        </Button>

        <div className="space-y-2">
          <div className="flex justify-between">
            {reactions.map((reaction, idx) => (
              <Button 
                key={idx}
                variant="outline"
                className="p-2"
                onClick={() => onReaction(campus, reaction)}
                disabled={!isOpen}
              >
                {reaction}
              </Button>
            ))}
          </div>
          {/* Display aggregated reactions */}
          <div className="text-sm text-gray-600 min-h-[1.5rem]">
            {reactionCounts}
          </div>
        </div>

        {isOpen && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Report Current Crowd:</div>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((level) => (
                <Button
                  key={level}
                  variant="outline"
                  className={`flex-1 ${data.crowdLevel === level ? 'bg-gray-100' : ''}`}
                  onClick={() => onCrowdUpdate(campus, level as CrowdLevel)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button 
            className="w-full"
            onClick={() => setShowFeedback(!showFeedback)}
            disabled={!isOpen}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Add Feedback
          </Button>
          
          {showFeedback && (
            <div className="space-y-2">
              <textarea
                className="w-full p-2 border rounded resize-none"
                placeholder="Share your dining experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    if (feedback.trim()) {
                      onFeedback(campus, feedback, true);
                      setFeedback('');
                      setShowFeedback(false);
                    }
                  }}
                >
                  👍 Like
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    if (feedback.trim()) {
                      onFeedback(campus, feedback, false);
                      setFeedback('');
                      setShowFeedback(false);
                    }
                  }}
                >
                  👎 Dislike
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm">
          {data.likes.length > 0 && (
            <div>
              <strong>Recent Likes:</strong>
              {data.likes.slice(-2).map((like, i) => (
                <div key={i} className="text-green-600 bg-green-50 p-2 rounded mt-1">
                  👍 {like}
                </div>
              ))}
            </div>
          )}
          {data.dislikes.length > 0 && (
            <div>
              <strong>Recent Dislikes:</strong>
              {data.dislikes.slice(-2).map((dislike, i) => (
                <div key={i} className="text-red-600 bg-red-50 p-2 rounded mt-1">
                  👎 {dislike}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampusCard;