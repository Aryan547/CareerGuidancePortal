import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  BookOpen, 
  TrendingUp, 
  Users, 
  GraduationCap,
  MapPin,
  Clock,
  Star,
  Briefcase
} from 'lucide-react';

interface CareerDetailsProps {
  career: {
    career: string;
    score: number;
    description: string;
    topSkills: string[];
    averageSalary: string;
    jobOutlook: string;
    matchReasons: string[];
  };
  onBack: () => void;
}

export const CareerDetails: React.FC<CareerDetailsProps> = ({ career, onBack }) => {
  // Extended career information (would normally come from a database)
  const getExtendedInfo = (careerName: string) => {
    const careerInfo: { [key: string]: any } = {
      'Software Engineering': {
        workEnvironment: 'Office, Remote, or Hybrid environments',
        typicalDay: 'Writing code, debugging applications, collaborating with teams, attending meetings, code reviews',
        education: 'Bachelor\'s degree in Computer Science, Software Engineering, or related field',
        careerPath: ['Junior Developer', 'Software Engineer', 'Senior Engineer', 'Tech Lead', 'Engineering Manager'],
        industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Gaming'],
        workSchedule: 'Full-time, typically 40 hours/week with flexible schedules'
      },
      'Medical Doctor': {
        workEnvironment: 'Hospitals, clinics, private practices, emergency rooms',
        typicalDay: 'Patient consultations, diagnosis, treatment planning, surgeries, medical documentation',
        education: 'Medical degree (MD), residency training, board certification',
        careerPath: ['Medical Student', 'Resident', 'Fellow', 'Attending Physician', 'Department Head'],
        industries: ['Healthcare', 'Research', 'Academia', 'Public Health', 'Pharmaceuticals'],
        workSchedule: 'Long hours, including nights and weekends, on-call duties'
      },
      'Business Management': {
        workEnvironment: 'Corporate offices, client sites, remote work options',
        typicalDay: 'Strategic planning, team meetings, project oversight, stakeholder communication, performance analysis',
        education: 'Bachelor\'s degree in Business, MBA preferred for senior roles',
        careerPath: ['Analyst', 'Manager', 'Senior Manager', 'Director', 'VP', 'C-Suite Executive'],
        industries: ['Consulting', 'Manufacturing', 'Retail', 'Technology', 'Finance'],
        workSchedule: 'Full-time, may require travel and extended hours during critical projects'
      },
      'Creative Arts & Design': {
        workEnvironment: 'Studios, agencies, freelance, remote work common',
        typicalDay: 'Concept development, designing, client presentations, revisions, collaboration with creative teams',
        education: 'Bachelor\'s degree in Art, Design, or related field, portfolio essential',
        careerPath: ['Junior Designer', 'Designer', 'Senior Designer', 'Art Director', 'Creative Director'],
        industries: ['Advertising', 'Media', 'Gaming', 'Publishing', 'Entertainment'],
        workSchedule: 'Project-based deadlines, may include irregular hours'
      },
      'Teaching & Education': {
        workEnvironment: 'Schools, universities, online platforms, educational institutions',
        typicalDay: 'Lesson planning, teaching classes, grading, parent conferences, professional development',
        education: 'Bachelor\'s degree in subject area, teaching certification required',
        careerPath: ['Student Teacher', 'Teacher', 'Lead Teacher', 'Department Head', 'Principal'],
        industries: ['Public Education', 'Private Schools', 'Higher Education', 'Corporate Training'],
        workSchedule: 'School hours with evening and weekend work for planning and grading'
      },
      'Environmental Science': {
        workEnvironment: 'Field work, laboratories, offices, outdoor research sites',
        typicalDay: 'Data collection, analysis, report writing, environmental assessments, policy development',
        education: 'Bachelor\'s degree in Environmental Science, advanced degrees for research roles',
        careerPath: ['Field Technician', 'Environmental Scientist', 'Senior Scientist', 'Program Manager'],
        industries: ['Government', 'Consulting', 'Non-profits', 'Energy', 'Manufacturing'],
        workSchedule: 'Varies between office and field work, may include travel'
      },
      'Financial Services': {
        workEnvironment: 'Financial institutions, corporate offices, client meetings',
        typicalDay: 'Market analysis, client consultations, portfolio management, financial planning, compliance',
        education: 'Bachelor\'s degree in Finance, Economics, or Business, certifications preferred',
        careerPath: ['Analyst', 'Associate', 'Vice President', 'Senior VP', 'Managing Director'],
        industries: ['Banking', 'Investment Management', 'Insurance', 'Real Estate', 'Consulting'],
        workSchedule: 'Full-time, may include long hours during market volatility'
      }
    };

    return careerInfo[careerName] || {
      workEnvironment: 'Varies by specific role and company',
      typicalDay: 'Professional responsibilities vary based on position',
      education: 'Relevant degree and professional development',
      careerPath: ['Entry Level', 'Mid Level', 'Senior Level', 'Leadership'],
      industries: ['Various industries'],
      workSchedule: 'Standard business hours'
    };
  };

  const extendedInfo = getExtendedInfo(career.career);

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
          
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {career.career}
            </h1>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-lg px-4 py-1 bg-gradient-success text-success-foreground">
                {career.score}% Match
              </Badge>
              <Star className="h-5 w-5 text-success" />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {career.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Career Overview */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Career Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Salary & Outlook
                </h4>
                <p className="text-foreground font-medium">{career.averageSalary}</p>
                <p className="text-sm text-muted-foreground">{career.jobOutlook}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Work Schedule
                </h4>
                <p className="text-sm text-muted-foreground">{extendedInfo.workSchedule}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Work Environment
                </h4>
                <p className="text-sm text-muted-foreground">{extendedInfo.workEnvironment}</p>
              </div>
            </CardContent>
          </Card>

          {/* Why This Matches You */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                Why This Matches You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {career.matchReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Key Skills */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-education" />
                Key Skills Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {career.topSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education & Career Path */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-education" />
                Education & Career Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Education Requirements</h4>
                <p className="text-sm text-muted-foreground">{extendedInfo.education}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Typical Career Progression</h4>
                <div className="flex flex-wrap gap-1">
                  {extendedInfo.careerPath.map((step: string, index: number) => (
                    <React.Fragment key={step}>
                      <Badge variant="outline" className="text-xs">
                        {step}
                      </Badge>
                      {index < extendedInfo.careerPath.length - 1 && (
                        <span className="text-muted-foreground mx-1">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typical Day & Industries */}
          <Card className="shadow-elegant lg:col-span-2">
            <CardHeader>
              <CardTitle>Day-to-Day & Industry Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What a Typical Day Looks Like</h4>
                <p className="text-sm text-muted-foreground">{extendedInfo.typicalDay}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Common Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {extendedInfo.industries.map((industry: string) => (
                    <Badge key={industry} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Results
          </Button>
        </div>
      </div>
    </div>
  );
};