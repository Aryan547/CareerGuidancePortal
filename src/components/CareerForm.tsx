import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Target, TrendingUp } from 'lucide-react';

interface SubjectMark {
  subject: string;
  marks: number;
}

interface CareerFormData {
  subjects: SubjectMark[];
  interests: string[];
}

const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics'
];

const INTERESTS = [
  'Problem Solving',
  'Creative Arts',
  'Management',
  'Technology',
  'Healthcare',
  'Teaching',
  'Research',
  'Finance',
  'Communication',
  'Social Work',
  'Engineering',
  'Sports & Fitness',
  'Environment',
  'Law & Justice',
  'Entertainment'
];

interface CareerFormProps {
  onSubmit: (data: CareerFormData) => void;
}

export const CareerForm: React.FC<CareerFormProps> = ({ onSubmit }) => {
  const [subjects, setSubjects] = useState<SubjectMark[]>(
    SUBJECTS.map(subject => ({ subject, marks: 0 }))
  );
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubjectChange = (subject: string, marks: number) => {
    setSubjects(prev => 
      prev.map(s => s.subject === subject ? { ...s, marks } : s)
    );
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setInterests(prev => 
      checked 
        ? [...prev, interest]
        : prev.filter(i => i !== interest)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ subjects, interests });
  };

  const isFormValid = subjects.some(s => s.marks > 0) && interests.length > 0;

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-primary p-4 rounded-full shadow-glow">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Career Guidance Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your ideal career path based on your academic performance and interests. 
            Let's build your future together!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subject Marks Section */}
          <Card className="animate-scale-in shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>
                    Enter your percentage marks in each subject
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBJECTS.map((subject) => (
                  <div key={subject} className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {subject}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter marks (0-100)"
                      value={subjects.find(s => s.subject === subject)?.marks || ''}
                      onChange={(e) => handleSubjectChange(subject, Number(e.target.value))}
                      className="transition-all duration-300 focus:shadow-elegant"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card className="animate-scale-in shadow-elegant">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-accent" />
                <div>
                  <CardTitle>Your Interests</CardTitle>
                  <CardDescription>
                    Select all areas that interest you (choose at least one)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INTERESTS.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={interests.includes(interest)}
                      onCheckedChange={(checked) => 
                        handleInterestChange(interest, checked as boolean)
                      }
                      className="transition-all duration-300"
                    />
                    <label
                      htmlFor={interest}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={!isFormValid}
              className="px-12 py-6 text-lg font-semibold animate-scale-in"
            >
              Discover My Career Path
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};