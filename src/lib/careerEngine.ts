// Career recommendation engine with scoring algorithm

interface SubjectMark {
  subject: string;
  marks: number;
}

interface CareerProfile {
  name: string;
  description: string;
  requiredSubjects: string[];
  subjectWeights: { [subject: string]: number };
  requiredInterests: string[];
  interestWeights: { [interest: string]: number };
  topSkills: string[];
  averageSalary: string;
  jobOutlook: string;
}

// Career database with profiles for different career paths
const CAREER_PROFILES: CareerProfile[] = [
  {
    name: 'Software Engineering',
    description: 'Design, develop, and maintain software applications and systems. Work with cutting-edge technologies to solve complex problems.',
    requiredSubjects: ['Mathematics', 'Computer Science', 'Physics'],
    subjectWeights: { 
      'Mathematics': 0.3, 
      'Computer Science': 0.4, 
      'Physics': 0.2, 
      'Science': 0.1 
    },
    requiredInterests: ['Technology', 'Problem Solving', 'Engineering'],
    interestWeights: { 
      'Technology': 0.4, 
      'Problem Solving': 0.3, 
      'Engineering': 0.2, 
      'Research': 0.1 
    },
    topSkills: ['Programming', 'System Design', 'Problem Solving', 'Technical Communication'],
    averageSalary: '$85,000 - $150,000',
    jobOutlook: 'Excellent growth (22% by 2030)'
  },
  {
    name: 'Medical Doctor',
    description: 'Diagnose and treat patients, promoting health and wellness. Make a direct impact on people\'s lives through medical care.',
    requiredSubjects: ['Biology', 'Chemistry', 'Science', 'Mathematics'],
    subjectWeights: { 
      'Biology': 0.35, 
      'Chemistry': 0.25, 
      'Science': 0.25, 
      'Mathematics': 0.15 
    },
    requiredInterests: ['Healthcare', 'Social Work', 'Research'],
    interestWeights: { 
      'Healthcare': 0.4, 
      'Social Work': 0.3, 
      'Research': 0.2, 
      'Problem Solving': 0.1 
    },
    topSkills: ['Medical Knowledge', 'Diagnosis', 'Patient Care', 'Critical Thinking'],
    averageSalary: '$200,000 - $400,000',
    jobOutlook: 'Strong growth (4% by 2030)'
  },
  {
    name: 'Business Management',
    description: 'Lead organizations and teams to achieve business objectives. Develop strategies and oversee operations across various industries.',
    requiredSubjects: ['Mathematics', 'Economics', 'English'],
    subjectWeights: { 
      'Mathematics': 0.25, 
      'Economics': 0.35, 
      'English': 0.25, 
      'History': 0.15 
    },
    requiredInterests: ['Management', 'Finance', 'Communication'],
    interestWeights: { 
      'Management': 0.4, 
      'Finance': 0.3, 
      'Communication': 0.2, 
      'Problem Solving': 0.1 
    },
    topSkills: ['Leadership', 'Strategic Planning', 'Communication', 'Financial Analysis'],
    averageSalary: '$75,000 - $180,000',
    jobOutlook: 'Average growth (8% by 2030)'
  },
  {
    name: 'Creative Arts & Design',
    description: 'Express creativity through visual arts, graphic design, or multimedia. Create compelling visual content for various media.',
    requiredSubjects: ['English', 'History'],
    subjectWeights: { 
      'English': 0.3, 
      'History': 0.2, 
      'Computer Science': 0.3, 
      'Mathematics': 0.2 
    },
    requiredInterests: ['Creative Arts', 'Technology', 'Entertainment'],
    interestWeights: { 
      'Creative Arts': 0.5, 
      'Technology': 0.2, 
      'Entertainment': 0.2, 
      'Communication': 0.1 
    },
    topSkills: ['Design Software', 'Creativity', 'Visual Communication', 'Project Management'],
    averageSalary: '$45,000 - $90,000',
    jobOutlook: 'Good growth (13% by 2030)'
  },
  {
    name: 'Teaching & Education',
    description: 'Educate and inspire the next generation. Share knowledge and help students develop critical thinking skills.',
    requiredSubjects: ['English', 'History', 'Science', 'Mathematics'],
    subjectWeights: { 
      'English': 0.3, 
      'Mathematics': 0.25, 
      'Science': 0.25, 
      'History': 0.2 
    },
    requiredInterests: ['Teaching', 'Social Work', 'Communication'],
    interestWeights: { 
      'Teaching': 0.4, 
      'Social Work': 0.3, 
      'Communication': 0.2, 
      'Research': 0.1 
    },
    topSkills: ['Curriculum Development', 'Communication', 'Mentoring', 'Assessment'],
    averageSalary: '$40,000 - $70,000',
    jobOutlook: 'Average growth (8% by 2030)'
  },
  {
    name: 'Environmental Science',
    description: 'Study and protect the environment. Work on sustainability projects and environmental conservation initiatives.',
    requiredSubjects: ['Science', 'Biology', 'Chemistry', 'Geography'],
    subjectWeights: { 
      'Science': 0.3, 
      'Biology': 0.25, 
      'Chemistry': 0.25, 
      'Geography': 0.2 
    },
    requiredInterests: ['Environment', 'Research', 'Social Work'],
    interestWeights: { 
      'Environment': 0.4, 
      'Research': 0.3, 
      'Social Work': 0.2, 
      'Problem Solving': 0.1 
    },
    topSkills: ['Data Analysis', 'Field Research', 'Environmental Assessment', 'Report Writing'],
    averageSalary: '$55,000 - $95,000',
    jobOutlook: 'Excellent growth (15% by 2030)'
  },
  {
    name: 'Financial Services',
    description: 'Manage investments, analyze markets, and provide financial advice. Help individuals and organizations make sound financial decisions.',
    requiredSubjects: ['Mathematics', 'Economics'],
    subjectWeights: { 
      'Mathematics': 0.4, 
      'Economics': 0.4, 
      'English': 0.1, 
      'Computer Science': 0.1 
    },
    requiredInterests: ['Finance', 'Management', 'Problem Solving'],
    interestWeights: { 
      'Finance': 0.5, 
      'Management': 0.2, 
      'Problem Solving': 0.2, 
      'Technology': 0.1 
    },
    topSkills: ['Financial Analysis', 'Risk Assessment', 'Client Relations', 'Data Interpretation'],
    averageSalary: '$65,000 - $150,000',
    jobOutlook: 'Good growth (6% by 2030)'
  }
];

export interface CareerRecommendation {
  career: string;
  score: number;
  description: string;
  topSkills: string[];
  averageSalary: string;
  jobOutlook: string;
  matchReasons: string[];
}

export function calculateCareerRecommendations(
  subjects: SubjectMark[],
  interests: string[]
): CareerRecommendation[] {
  const recommendations: CareerRecommendation[] = [];

  for (const profile of CAREER_PROFILES) {
    let totalScore = 0;
    const matchReasons: string[] = [];

    // Calculate subject score (60% weight)
    let subjectScore = 0;
    let totalSubjectWeight = 0;
    
    for (const [subject, weight] of Object.entries(profile.subjectWeights)) {
      const userMark = subjects.find(s => s.subject === subject)?.marks || 0;
      const normalizedMark = userMark / 100; // Convert to 0-1 scale
      subjectScore += normalizedMark * weight;
      totalSubjectWeight += weight;
      
      if (userMark >= 70) {
        matchReasons.push(`Strong performance in ${subject} (${userMark}%)`);
      }
    }
    
    if (totalSubjectWeight > 0) {
      subjectScore = (subjectScore / totalSubjectWeight) * 0.6;
    }

    // Calculate interest score (40% weight)
    let interestScore = 0;
    let totalInterestWeight = 0;
    let matchingInterests = 0;
    
    for (const [interest, weight] of Object.entries(profile.interestWeights)) {
      if (interests.includes(interest)) {
        interestScore += weight;
        matchingInterests++;
        matchReasons.push(`Interest in ${interest}`);
      }
      totalInterestWeight += weight;
    }
    
    if (totalInterestWeight > 0) {
      interestScore = (interestScore / totalInterestWeight) * 0.4;
    }

    // Add bonus for multiple matching interests
    if (matchingInterests >= 2) {
      matchReasons.push(`Multiple aligned interests (${matchingInterests} matches)`);
    }

    totalScore = (subjectScore + interestScore) * 100;

    // Only include careers with reasonable match (> 20%)
    if (totalScore > 20) {
      recommendations.push({
        career: profile.name,
        score: Math.round(totalScore),
        description: profile.description,
        topSkills: profile.topSkills,
        averageSalary: profile.averageSalary,
        jobOutlook: profile.jobOutlook,
        matchReasons
      });
    }
  }

  // Sort by score (highest first) and return top 5
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}