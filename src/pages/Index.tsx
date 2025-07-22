import React, { useState } from 'react';
import { CareerForm } from '@/components/CareerForm';
import { CareerResults } from '@/components/CareerResults';
import { calculateCareerRecommendations, CareerRecommendation } from '@/lib/careerEngine';

interface SubjectMark {
  subject: string;
  marks: number;
}

interface CareerFormData {
  subjects: SubjectMark[];
  interests: string[];
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  const handleFormSubmit = (data: CareerFormData) => {
    const careerRecommendations = calculateCareerRecommendations(data.subjects, data.interests);
    setRecommendations(careerRecommendations);
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  if (currentView === 'results') {
    return (
      <CareerResults 
        recommendations={recommendations}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <CareerForm onSubmit={handleFormSubmit} />
  );
};

export default Index;
