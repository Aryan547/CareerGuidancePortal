import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, ArrowLeft, BookOpen, TrendingUp, Users } from 'lucide-react';
import { CareerDetails } from './CareerDetails';

interface CareerRecommendation {
  career: string;
  score: number;
  description: string;
  topSkills: string[];
  averageSalary: string;
  jobOutlook: string;
  matchReasons: string[];
}

interface CareerResultsProps {
  recommendations: CareerRecommendation[];
  onBack: () => void;
}

export const CareerResults: React.FC<CareerResultsProps> = ({ recommendations, onBack }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);

  if (selectedCareer) {
    return (
      <CareerDetails 
        career={selectedCareer} 
        onBack={() => setSelectedCareer(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-success p-4 rounded-full shadow-glow">
              <Trophy className="h-8 w-8 text-success-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Career Recommendations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your academic performance and interests, here are the careers that align best with your profile.
          </p>
        </div>

        {/* Results */}
        <div className="space-y-6 mb-8">
          {recommendations.map((rec, index) => (
            <Card 
              key={rec.career} 
              className={`animate-scale-in shadow-elegant ${
                index === 0 ? 'ring-2 ring-success shadow-glow' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {index === 0 && (
                      <div className="bg-gradient-success p-2 rounded-full">
                        <Star className="h-5 w-5 text-success-foreground" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">
                        {index === 0 && <span className="text-success mr-2">🏆</span>}
                        {rec.career}
                      </CardTitle>
                      <CardDescription>
                        Match Score: {rec.score}%
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Rank #{index + 1}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{rec.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-education" />
                      <h4 className="font-semibold text-sm">Key Skills</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {rec.topSkills.map((skill) => (
                        <li key={skill}>• {skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <h4 className="font-semibold text-sm">Salary Range</h4>
                    </div>
                    <p className="text-sm font-medium text-foreground">{rec.averageSalary}</p>
                    <p className="text-xs text-muted-foreground">{rec.jobOutlook}</p>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm">Why This Matches</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {rec.matchReasons.slice(0, 2).map((reason, i) => (
                        <li key={i}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 animate-fade-in">
          <Button 
            onClick={onBack} 
            variant="outline" 
            size="lg"
            className="px-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Take Assessment Again
          </Button>
          <Button 
            variant="default" 
            size="lg"
            className="px-8"
            onClick={() => setSelectedCareer(recommendations[0])}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Explore Career Details
          </Button>
        </div>
      </div>
    </div>
  );
};