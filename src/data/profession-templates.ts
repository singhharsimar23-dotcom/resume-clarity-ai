import type { ResumeData, SectionType } from '@/types/builder';

export type ProfessionCategory = 
  | 'all'
  | 'doctor'
  | 'architect'
  | 'civil-engineer'
  | 'driver'
  | 'teacher'
  | 'accountant'
  | 'retail'
  | 'human-resources'
  | 'administrative'
  | 'student'
  | 'legal'
  | 'software-engineer'
  | 'data-analyst'
  | 'product-manager';

export type ExperienceLevel = 'entry' | 'mid' | 'senior';

export interface ProfessionTemplate {
  id: string;
  name: string;
  profession: ProfessionCategory;
  professionLabel: string;
  experienceLevel: ExperienceLevel;
  description: string;
  previewData: Partial<ResumeData>;
  sectionOrder: SectionType[];
}

export const professionCategories: { id: ProfessionCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: 'Grid3X3' },
  { id: 'software-engineer', label: 'Software Engineer', icon: 'Code' },
  { id: 'data-analyst', label: 'Data Analyst', icon: 'BarChart3' },
  { id: 'product-manager', label: 'Product Manager', icon: 'Briefcase' },
  { id: 'doctor', label: 'Doctor', icon: 'Stethoscope' },
  { id: 'architect', label: 'Architect', icon: 'Building2' },
  { id: 'civil-engineer', label: 'Civil Engineer', icon: 'HardHat' },
  { id: 'teacher', label: 'Teacher', icon: 'GraduationCap' },
  { id: 'accountant', label: 'Accountant', icon: 'Calculator' },
  { id: 'retail', label: 'Retail', icon: 'ShoppingBag' },
  { id: 'human-resources', label: 'Human Resources', icon: 'Users' },
  { id: 'administrative', label: 'Administrative', icon: 'FileText' },
  { id: 'student', label: 'Student', icon: 'BookOpen' },
  { id: 'legal', label: 'Legal', icon: 'Scale' },
  { id: 'driver', label: 'Driver', icon: 'Truck' },
];

export const professionTemplates: ProfessionTemplate[] = [
  // SOFTWARE ENGINEER TEMPLATES
  {
    id: 'swe-entry-1',
    name: 'Junior Developer',
    profession: 'software-engineer',
    professionLabel: 'Software Engineer',
    experienceLevel: 'entry',
    description: 'Perfect for recent graduates entering tech',
    sectionOrder: ['summary', 'education', 'projects', 'skills', 'experience'],
    previewData: {
      contact: {
        fullName: 'Alex Chen',
        email: 'alex.chen@email.com',
        phone: '(555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexchen',
      },
      summary: {
        content: 'Recent Computer Science graduate with strong foundation in full-stack development and a passion for building scalable web applications. Experienced with modern JavaScript frameworks and agile methodologies through internship and academic projects.',
      },
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.7',
          description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering',
        },
      ],
      experience: [
        {
          id: '1',
          company: 'TechStart Inc.',
          title: 'Software Engineering Intern',
          location: 'San Francisco, CA',
          startDate: '2023-06',
          endDate: '2023-08',
          current: false,
          bullets: [
            'Developed RESTful APIs using Node.js and Express, handling 10,000+ daily requests',
            'Implemented responsive UI components with React and TypeScript, improving mobile conversion by 15%',
            'Collaborated with senior engineers on database optimization, reducing query times by 40%',
          ],
        },
      ],
      projects: [
        {
          id: '1',
          name: 'E-Commerce Platform',
          description: 'Full-stack online marketplace with user authentication, product catalog, and payment integration',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'github.com/alexchen/ecommerce',
        },
        {
          id: '2',
          name: 'Real-Time Chat Application',
          description: 'WebSocket-based messaging app supporting group chats and file sharing',
          technologies: ['Socket.io', 'Express', 'MongoDB', 'Redis'],
        },
      ],
      skills: [
        { id: '1', name: 'JavaScript/TypeScript', level: 'advanced', category: 'Languages' },
        { id: '2', name: 'React', level: 'advanced', category: 'Frontend' },
        { id: '3', name: 'Node.js', level: 'intermediate', category: 'Backend' },
        { id: '4', name: 'PostgreSQL', level: 'intermediate', category: 'Database' },
        { id: '5', name: 'Git', level: 'advanced', category: 'Tools' },
        { id: '6', name: 'AWS', level: 'beginner', category: 'Cloud' },
      ],
    },
  },
  {
    id: 'swe-mid-1',
    name: 'Full-Stack Developer',
    profession: 'software-engineer',
    professionLabel: 'Software Engineer',
    experienceLevel: 'mid',
    description: 'For developers with 2-5 years of experience',
    sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education'],
    previewData: {
      contact: {
        fullName: 'Jordan Mitchell',
        email: 'jordan.mitchell@email.com',
        phone: '(555) 345-6789',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/jordanmitchell',
      },
      summary: {
        content: 'Full-stack developer with 4 years of experience building high-performance web applications. Expertise in React ecosystem and cloud-native architectures. Led multiple product initiatives that increased user engagement by 35% and reduced infrastructure costs by 25%.',
      },
      experience: [
        {
          id: '1',
          company: 'ScaleUp Technologies',
          title: 'Software Engineer II',
          location: 'Austin, TX',
          startDate: '2022-03',
          endDate: '',
          current: true,
          bullets: [
            'Architected and deployed microservices handling 1M+ daily transactions using Node.js and Kubernetes',
            'Led frontend migration from legacy jQuery to React, improving page load times by 60%',
            'Mentored 3 junior developers through code reviews and pair programming sessions',
            'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
          ],
        },
        {
          id: '2',
          company: 'Digital Solutions Co.',
          title: 'Junior Software Engineer',
          location: 'Dallas, TX',
          startDate: '2020-06',
          endDate: '2022-02',
          current: false,
          bullets: [
            'Built customer-facing dashboard using React and D3.js, visualizing 50+ data metrics',
            'Developed REST APIs serving 100,000+ requests daily with 99.9% uptime',
            'Optimized PostgreSQL queries reducing average response time by 45%',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'React/Next.js', level: 'expert', category: 'Frontend' },
        { id: '2', name: 'Node.js/Express', level: 'advanced', category: 'Backend' },
        { id: '3', name: 'TypeScript', level: 'expert', category: 'Languages' },
        { id: '4', name: 'AWS/GCP', level: 'advanced', category: 'Cloud' },
        { id: '5', name: 'PostgreSQL/MongoDB', level: 'advanced', category: 'Database' },
        { id: '6', name: 'Docker/Kubernetes', level: 'intermediate', category: 'DevOps' },
      ],
      education: [
        {
          id: '1',
          institution: 'University of Texas at Austin',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-08',
          endDate: '2020-05',
        },
      ],
    },
  },
  {
    id: 'swe-senior-1',
    name: 'Senior Engineer',
    profession: 'software-engineer',
    professionLabel: 'Software Engineer',
    experienceLevel: 'senior',
    description: 'For tech leads and senior developers',
    sectionOrder: ['summary', 'experience', 'skills', 'certifications', 'education'],
    previewData: {
      contact: {
        fullName: 'Sarah Thompson',
        email: 'sarah.thompson@email.com',
        phone: '(555) 456-7890',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/sarahthompson',
      },
      summary: {
        content: 'Senior Software Engineer with 8+ years of experience designing and scaling distributed systems serving millions of users. Track record of leading cross-functional teams, driving architectural decisions, and delivering products that generated $10M+ in revenue. Passionate about mentoring engineers and fostering engineering excellence.',
      },
      experience: [
        {
          id: '1',
          company: 'CloudScale Inc.',
          title: 'Senior Software Engineer',
          location: 'Seattle, WA',
          startDate: '2021-01',
          endDate: '',
          current: true,
          bullets: [
            'Led architecture redesign of payment processing system handling $500M annually, achieving 99.99% uptime',
            'Managed team of 6 engineers, conducting 1:1s, performance reviews, and technical mentorship',
            'Spearheaded adoption of event-driven architecture, reducing system coupling and improving scalability by 300%',
            'Established engineering standards and code review practices adopted across 50+ engineers',
          ],
        },
        {
          id: '2',
          company: 'Enterprise Tech Corp',
          title: 'Software Engineer III',
          location: 'Portland, OR',
          startDate: '2018-03',
          endDate: '2020-12',
          current: false,
          bullets: [
            'Designed and built real-time analytics platform processing 10TB of data daily',
            'Reduced cloud infrastructure costs by 40% through performance optimization and resource management',
            'Led migration from monolithic to microservices architecture for core platform',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'System Design', level: 'expert', category: 'Architecture' },
        { id: '2', name: 'Go/Python/Java', level: 'expert', category: 'Languages' },
        { id: '3', name: 'Kubernetes/Terraform', level: 'expert', category: 'Infrastructure' },
        { id: '4', name: 'AWS/GCP', level: 'expert', category: 'Cloud' },
        { id: '5', name: 'Kafka/RabbitMQ', level: 'advanced', category: 'Messaging' },
        { id: '6', name: 'Technical Leadership', level: 'expert', category: 'Soft Skills' },
      ],
      certifications: [
        {
          id: '1',
          name: 'AWS Solutions Architect Professional',
          issuer: 'Amazon Web Services',
          date: '2023-01',
        },
        {
          id: '2',
          name: 'Google Cloud Professional Cloud Architect',
          issuer: 'Google Cloud',
          date: '2022-06',
        },
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2014-08',
          endDate: '2016-05',
        },
      ],
    },
  },

  // DATA ANALYST TEMPLATES
  {
    id: 'da-entry-1',
    name: 'Junior Analyst',
    profession: 'data-analyst',
    professionLabel: 'Data Analyst',
    experienceLevel: 'entry',
    description: 'For analysts starting their career',
    sectionOrder: ['summary', 'education', 'skills', 'projects', 'experience'],
    previewData: {
      contact: {
        fullName: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '(555) 567-8901',
        location: 'Chicago, IL',
      },
      summary: {
        content: 'Detail-oriented data analyst with strong statistical foundation and hands-on experience with Python and SQL. Passionate about transforming complex datasets into actionable business insights through visualization and statistical analysis.',
      },
      education: [
        {
          id: '1',
          institution: 'University of Illinois at Chicago',
          degree: 'Bachelor of Science',
          field: 'Statistics',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.8',
        },
      ],
      skills: [
        { id: '1', name: 'Python (Pandas, NumPy)', level: 'advanced', category: 'Programming' },
        { id: '2', name: 'SQL', level: 'advanced', category: 'Database' },
        { id: '3', name: 'Tableau/Power BI', level: 'intermediate', category: 'Visualization' },
        { id: '4', name: 'Excel (Advanced)', level: 'advanced', category: 'Tools' },
        { id: '5', name: 'Statistical Analysis', level: 'advanced', category: 'Analytics' },
      ],
      projects: [
        {
          id: '1',
          name: 'Customer Churn Prediction Model',
          description: 'Built ML model predicting customer churn with 85% accuracy using logistic regression',
          technologies: ['Python', 'Scikit-learn', 'Pandas'],
        },
        {
          id: '2',
          name: 'Sales Dashboard',
          description: 'Interactive Tableau dashboard tracking $2M+ in quarterly sales across 5 regions',
          technologies: ['Tableau', 'SQL', 'Excel'],
        },
      ],
    },
  },
  {
    id: 'da-mid-1',
    name: 'Business Analyst',
    profession: 'data-analyst',
    professionLabel: 'Data Analyst',
    experienceLevel: 'mid',
    description: 'For analysts with 2-5 years experience',
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'certifications'],
    previewData: {
      contact: {
        fullName: 'Michael Park',
        email: 'michael.park@email.com',
        phone: '(555) 678-9012',
        location: 'New York, NY',
      },
      summary: {
        content: 'Data Analyst with 4 years of experience driving data-informed decisions across marketing, operations, and finance. Expert in building automated reporting systems and predictive models that have saved companies $500K+ annually.',
      },
      experience: [
        {
          id: '1',
          company: 'Global Retail Corp',
          title: 'Senior Data Analyst',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: '',
          current: true,
          bullets: [
            'Developed predictive inventory model reducing overstock by 25% and saving $2M annually',
            'Built automated reporting pipeline processing 5M+ daily transactions for executive dashboards',
            'Led A/B testing framework implementation, improving conversion rates by 18%',
          ],
        },
        {
          id: '2',
          company: 'Analytics Firm LLC',
          title: 'Data Analyst',
          location: 'Boston, MA',
          startDate: '2020-06',
          endDate: '2021-12',
          current: false,
          bullets: [
            'Created customer segmentation models identifying $1.5M in upsell opportunities',
            'Automated monthly reporting reducing manual work by 30 hours per month',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Python/R', level: 'expert', category: 'Programming' },
        { id: '2', name: 'SQL (Advanced)', level: 'expert', category: 'Database' },
        { id: '3', name: 'Tableau/Looker', level: 'advanced', category: 'Visualization' },
        { id: '4', name: 'Machine Learning', level: 'intermediate', category: 'Analytics' },
        { id: '5', name: 'BigQuery/Snowflake', level: 'advanced', category: 'Data Warehouse' },
      ],
      education: [
        {
          id: '1',
          institution: 'Columbia University',
          degree: 'Master of Science',
          field: 'Business Analytics',
          startDate: '2018-08',
          endDate: '2020-05',
        },
      ],
    },
  },

  // DOCTOR TEMPLATES
  {
    id: 'doctor-entry-1',
    name: 'Medical Resident',
    profession: 'doctor',
    professionLabel: 'Doctor',
    experienceLevel: 'entry',
    description: 'For residents and early-career physicians',
    sectionOrder: ['summary', 'education', 'certifications', 'experience', 'research', 'skills'],
    previewData: {
      contact: {
        fullName: 'Dr. Amanda Foster',
        email: 'amanda.foster.md@email.com',
        phone: '(555) 789-0123',
        location: 'Boston, MA',
      },
      summary: {
        content: 'Internal Medicine Resident with strong foundation in evidence-based patient care and clinical research. Committed to delivering compassionate healthcare while advancing medical knowledge through research and continuous learning.',
      },
      education: [
        {
          id: '1',
          institution: 'Harvard Medical School',
          degree: 'Doctor of Medicine',
          field: 'Medicine',
          startDate: '2019-08',
          endDate: '2023-05',
        },
        {
          id: '2',
          institution: 'Yale University',
          degree: 'Bachelor of Science',
          field: 'Biology',
          startDate: '2015-08',
          endDate: '2019-05',
          gpa: '3.9',
        },
      ],
      certifications: [
        { id: '1', name: 'USMLE Step 1', issuer: 'NBME', date: '2021-06' },
        { id: '2', name: 'USMLE Step 2 CK', issuer: 'NBME', date: '2023-01' },
        { id: '3', name: 'BLS/ACLS Certified', issuer: 'American Heart Association', date: '2023-05' },
      ],
      experience: [
        {
          id: '1',
          company: 'Massachusetts General Hospital',
          title: 'Internal Medicine Resident (PGY-1)',
          location: 'Boston, MA',
          startDate: '2023-07',
          endDate: '',
          current: true,
          bullets: [
            'Manage diverse patient census of 15-20 patients daily across inpatient and outpatient settings',
            'Collaborate with multidisciplinary teams including specialists, nurses, and social workers',
            'Conduct patient rounds and present cases at weekly morbidity and mortality conferences',
          ],
        },
      ],
      research: [
        {
          id: '1',
          title: 'Impact of Telemedicine on Chronic Disease Management',
          institution: 'Harvard Medical School',
          startDate: '2022-01',
          endDate: '2023-05',
          description: 'Co-authored study published in JAMA Internal Medicine examining patient outcomes',
        },
      ],
      skills: [
        { id: '1', name: 'Patient Assessment', level: 'advanced', category: 'Clinical' },
        { id: '2', name: 'Electronic Health Records (Epic)', level: 'advanced', category: 'Technology' },
        { id: '3', name: 'Clinical Research', level: 'intermediate', category: 'Research' },
        { id: '4', name: 'Spanish (Conversational)', level: 'intermediate', category: 'Language' },
      ],
    },
  },
  {
    id: 'doctor-senior-1',
    name: 'Attending Physician',
    profession: 'doctor',
    professionLabel: 'Doctor',
    experienceLevel: 'senior',
    description: 'For established physicians and specialists',
    sectionOrder: ['summary', 'experience', 'education', 'certifications', 'publications', 'research'],
    previewData: {
      contact: {
        fullName: 'Dr. Robert Chen',
        email: 'robert.chen.md@email.com',
        phone: '(555) 890-1234',
        location: 'Los Angeles, CA',
      },
      summary: {
        content: 'Board-certified Cardiologist with 12 years of experience in interventional cardiology and heart failure management. Published researcher with 25+ peer-reviewed articles. Dedicated to advancing patient care through innovation and clinical excellence.',
      },
      experience: [
        {
          id: '1',
          company: 'UCLA Medical Center',
          title: 'Director of Interventional Cardiology',
          location: 'Los Angeles, CA',
          startDate: '2018-07',
          endDate: '',
          current: true,
          bullets: [
            'Lead team of 8 interventional cardiologists performing 1,500+ procedures annually',
            'Reduced 30-day readmission rates by 22% through implementation of structured follow-up program',
            'Established cardiac catheterization fellowship program, training 4 fellows per year',
          ],
        },
      ],
      education: [
        {
          id: '1',
          institution: 'Johns Hopkins University School of Medicine',
          degree: 'Doctor of Medicine',
          field: 'Medicine',
          startDate: '2004-08',
          endDate: '2008-05',
        },
      ],
      certifications: [
        { id: '1', name: 'Board Certified - Cardiovascular Disease', issuer: 'ABIM', date: '2014-07' },
        { id: '2', name: 'Board Certified - Interventional Cardiology', issuer: 'ABIM', date: '2015-07' },
      ],
      publications: [
        {
          id: '1',
          title: 'Novel Approaches in TAVR: A 10-Year Retrospective Analysis',
          publisher: 'Journal of the American College of Cardiology',
          date: '2023-03',
        },
      ],
    },
  },

  // TEACHER TEMPLATES
  {
    id: 'teacher-entry-1',
    name: 'New Teacher',
    profession: 'teacher',
    professionLabel: 'Teacher',
    experienceLevel: 'entry',
    description: 'For new teachers and recent graduates',
    sectionOrder: ['summary', 'education', 'certifications', 'experience', 'skills'],
    previewData: {
      contact: {
        fullName: 'Jessica Williams',
        email: 'jessica.williams@email.com',
        phone: '(555) 901-2345',
        location: 'Denver, CO',
      },
      summary: {
        content: 'Passionate elementary educator with student teaching experience and strong classroom management skills. Committed to creating inclusive learning environments that foster curiosity and academic growth for diverse learners.',
      },
      education: [
        {
          id: '1',
          institution: 'University of Colorado',
          degree: 'Bachelor of Arts',
          field: 'Elementary Education',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.75',
        },
      ],
      certifications: [
        { id: '1', name: 'Colorado Teaching License (K-6)', issuer: 'Colorado Department of Education', date: '2024-05' },
        { id: '2', name: 'ESL Endorsement', issuer: 'Colorado Department of Education', date: '2024-05' },
      ],
      experience: [
        {
          id: '1',
          company: 'Lincoln Elementary School',
          title: 'Student Teacher',
          location: 'Denver, CO',
          startDate: '2024-01',
          endDate: '2024-05',
          current: false,
          bullets: [
            'Designed and implemented differentiated lesson plans for class of 24 third-grade students',
            'Utilized formative assessments to track student progress and adjust instruction accordingly',
            'Collaborated with mentor teacher to integrate technology and hands-on learning activities',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Differentiated Instruction', level: 'intermediate', category: 'Teaching' },
        { id: '2', name: 'Classroom Management', level: 'intermediate', category: 'Teaching' },
        { id: '3', name: 'Google Classroom/Canvas', level: 'advanced', category: 'Technology' },
        { id: '4', name: 'Assessment & Evaluation', level: 'intermediate', category: 'Teaching' },
      ],
    },
  },
  {
    id: 'teacher-mid-1',
    name: 'Experienced Educator',
    profession: 'teacher',
    professionLabel: 'Teacher',
    experienceLevel: 'mid',
    description: 'For teachers with 3-8 years experience',
    sectionOrder: ['summary', 'experience', 'education', 'certifications', 'awards', 'skills'],
    previewData: {
      contact: {
        fullName: 'David Martinez',
        email: 'david.martinez@email.com',
        phone: '(555) 012-3456',
        location: 'Phoenix, AZ',
      },
      summary: {
        content: 'High school mathematics teacher with 6 years of experience and proven track record of improving student achievement. AP Calculus instructor with 85% pass rate. Dedicated to making mathematics accessible and engaging for all learners.',
      },
      experience: [
        {
          id: '1',
          company: 'Phoenix High School',
          title: 'Mathematics Teacher & Department Lead',
          location: 'Phoenix, AZ',
          startDate: '2020-08',
          endDate: '',
          current: true,
          bullets: [
            'Teach Algebra II, Pre-Calculus, and AP Calculus to 150+ students annually',
            'Increased AP Calculus pass rate from 65% to 85% over three years',
            'Lead math department of 8 teachers, coordinating curriculum and professional development',
            'Implemented peer tutoring program reducing D/F rates by 30%',
          ],
        },
      ],
      awards: [
        { id: '1', title: 'Teacher of the Year', issuer: 'Phoenix High School', date: '2023-05' },
      ],
      certifications: [
        { id: '1', name: 'Arizona Teaching Certificate (Secondary Math)', issuer: 'Arizona Dept of Education', date: '2018-05' },
        { id: '2', name: 'AP Calculus Certified Instructor', issuer: 'College Board', date: '2020-08' },
      ],
      education: [
        {
          id: '1',
          institution: 'Arizona State University',
          degree: 'Master of Education',
          field: 'Curriculum & Instruction',
          startDate: '2020-08',
          endDate: '2022-05',
        },
      ],
      skills: [
        { id: '1', name: 'Curriculum Development', level: 'expert', category: 'Teaching' },
        { id: '2', name: 'Data-Driven Instruction', level: 'advanced', category: 'Teaching' },
        { id: '3', name: 'Student Engagement', level: 'expert', category: 'Teaching' },
      ],
    },
  },

  // STUDENT TEMPLATES
  {
    id: 'student-1',
    name: 'College Student',
    profession: 'student',
    professionLabel: 'Student',
    experienceLevel: 'entry',
    description: 'For students seeking internships',
    sectionOrder: ['summary', 'education', 'skills', 'projects', 'leadership', 'experience'],
    previewData: {
      contact: {
        fullName: 'Taylor Kim',
        email: 'taylor.kim@university.edu',
        phone: '(555) 123-4567',
        location: 'Philadelphia, PA',
      },
      summary: {
        content: 'Motivated Business Administration junior with strong analytical skills and leadership experience. Seeking summer internship to apply coursework knowledge and develop professional experience in marketing or business development.',
      },
      education: [
        {
          id: '1',
          institution: 'University of Pennsylvania',
          degree: 'Bachelor of Science',
          field: 'Business Administration',
          startDate: '2022-08',
          endDate: '2026-05',
          gpa: '3.6',
          description: 'Concentration in Marketing. Dean\'s List (4 semesters)',
        },
      ],
      skills: [
        { id: '1', name: 'Microsoft Office Suite', level: 'advanced', category: 'Software' },
        { id: '2', name: 'Google Analytics', level: 'intermediate', category: 'Marketing' },
        { id: '3', name: 'Social Media Marketing', level: 'intermediate', category: 'Marketing' },
        { id: '4', name: 'Data Analysis', level: 'intermediate', category: 'Analytics' },
      ],
      projects: [
        {
          id: '1',
          name: 'Campus Coffee Shop Marketing Campaign',
          description: 'Developed comprehensive marketing strategy that increased weekly sales by 25%',
          technologies: ['Market Research', 'Social Media', 'Analytics'],
        },
      ],
      leadership: [
        {
          id: '1',
          role: 'Vice President',
          organization: 'Business Student Association',
          startDate: '2023-09',
          endDate: '',
          description: 'Lead team of 10 in organizing networking events with 200+ attendees',
        },
      ],
    },
  },
  {
    id: 'student-2',
    name: 'Graduate Student',
    profession: 'student',
    professionLabel: 'Student',
    experienceLevel: 'mid',
    description: 'For graduate students and researchers',
    sectionOrder: ['summary', 'education', 'research', 'publications', 'skills', 'experience'],
    previewData: {
      contact: {
        fullName: 'Priya Sharma',
        email: 'priya.sharma@mit.edu',
        phone: '(555) 234-5678',
        location: 'Cambridge, MA',
      },
      summary: {
        content: 'PhD candidate in Materials Science with focus on sustainable energy materials. Published researcher with expertise in nanomaterial synthesis and characterization. Seeking postdoctoral or industry research positions.',
      },
      education: [
        {
          id: '1',
          institution: 'Massachusetts Institute of Technology',
          degree: 'Doctor of Philosophy',
          field: 'Materials Science & Engineering',
          startDate: '2021-08',
          endDate: '2026-05',
          description: 'Thesis: Novel Perovskite Materials for Next-Generation Solar Cells',
        },
        {
          id: '2',
          institution: 'Indian Institute of Technology Delhi',
          degree: 'Bachelor of Technology',
          field: 'Metallurgical Engineering',
          startDate: '2017-08',
          endDate: '2021-05',
          gpa: '3.9',
        },
      ],
      research: [
        {
          id: '1',
          title: 'Perovskite Solar Cell Efficiency Enhancement',
          institution: 'MIT Department of Materials Science',
          startDate: '2021-08',
          endDate: '',
          description: 'Developing novel deposition techniques achieving 24% efficiency',
        },
      ],
      publications: [
        {
          id: '1',
          title: 'Enhanced Stability in Mixed-Halide Perovskites',
          publisher: 'Nature Materials',
          date: '2024-01',
        },
      ],
      skills: [
        { id: '1', name: 'XRD/SEM/TEM Analysis', level: 'expert', category: 'Characterization' },
        { id: '2', name: 'Python/MATLAB', level: 'advanced', category: 'Programming' },
        { id: '3', name: 'Thin Film Deposition', level: 'expert', category: 'Fabrication' },
      ],
    },
  },

  // ACCOUNTANT TEMPLATES
  {
    id: 'accountant-entry-1',
    name: 'Junior Accountant',
    profession: 'accountant',
    professionLabel: 'Accountant',
    experienceLevel: 'entry',
    description: 'For entry-level accounting positions',
    sectionOrder: ['summary', 'education', 'certifications', 'experience', 'skills'],
    previewData: {
      contact: {
        fullName: 'Brian Thompson',
        email: 'brian.thompson@email.com',
        phone: '(555) 345-6789',
        location: 'Atlanta, GA',
      },
      summary: {
        content: 'Detail-oriented accounting graduate with CPA exam in progress. Strong foundation in GAAP, financial reporting, and tax preparation. Seeking entry-level position to apply analytical skills and grow in public or corporate accounting.',
      },
      education: [
        {
          id: '1',
          institution: 'Georgia State University',
          degree: 'Bachelor of Business Administration',
          field: 'Accounting',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.7',
        },
      ],
      certifications: [
        { id: '1', name: 'CPA Exam (3/4 Sections Passed)', issuer: 'AICPA', date: '2024-08' },
      ],
      experience: [
        {
          id: '1',
          company: 'Regional CPA Firm',
          title: 'Tax Intern',
          location: 'Atlanta, GA',
          startDate: '2024-01',
          endDate: '2024-04',
          current: false,
          bullets: [
            'Prepared 50+ individual and small business tax returns using ProConnect Tax',
            'Reconciled accounts and maintained accurate financial records for 20+ clients',
            'Assisted with audit fieldwork including testing and documentation',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'QuickBooks', level: 'advanced', category: 'Software' },
        { id: '2', name: 'Microsoft Excel (Advanced)', level: 'advanced', category: 'Software' },
        { id: '3', name: 'GAAP', level: 'intermediate', category: 'Knowledge' },
        { id: '4', name: 'Tax Preparation', level: 'intermediate', category: 'Skills' },
      ],
    },
  },
  {
    id: 'accountant-senior-1',
    name: 'Senior Accountant',
    profession: 'accountant',
    professionLabel: 'Accountant',
    experienceLevel: 'senior',
    description: 'For experienced CPAs and controllers',
    sectionOrder: ['summary', 'experience', 'certifications', 'education', 'skills'],
    previewData: {
      contact: {
        fullName: 'Michelle Anderson',
        email: 'michelle.anderson@email.com',
        phone: '(555) 456-7890',
        location: 'Charlotte, NC',
      },
      summary: {
        content: 'CPA with 10+ years of progressive experience in corporate accounting and financial management. Expertise in financial reporting, internal controls, and process improvement. Track record of leading teams and implementing systems that improved efficiency by 40%.',
      },
      experience: [
        {
          id: '1',
          company: 'Fortune 500 Manufacturing Company',
          title: 'Assistant Controller',
          location: 'Charlotte, NC',
          startDate: '2020-03',
          endDate: '',
          current: true,
          bullets: [
            'Oversee accounting operations for $500M revenue division with team of 8 accountants',
            'Lead monthly close process, reducing close time from 12 days to 5 days',
            'Implemented new ERP system (SAP), improving reporting accuracy by 30%',
            'Manage external audit relationship and ensure SOX compliance',
          ],
        },
        {
          id: '2',
          company: 'Big 4 Accounting Firm',
          title: 'Senior Audit Associate',
          location: 'Charlotte, NC',
          startDate: '2016-08',
          endDate: '2020-02',
          current: false,
          bullets: [
            'Led audit engagements for clients with revenues up to $200M',
            'Supervised and trained teams of 3-5 staff associates',
          ],
        },
      ],
      certifications: [
        { id: '1', name: 'Certified Public Accountant (CPA)', issuer: 'North Carolina Board of CPA', date: '2017-09' },
        { id: '2', name: 'Certified Management Accountant (CMA)', issuer: 'IMA', date: '2020-06' },
      ],
      education: [
        {
          id: '1',
          institution: 'Wake Forest University',
          degree: 'Master of Science',
          field: 'Accountancy',
          startDate: '2015-08',
          endDate: '2016-05',
        },
      ],
      skills: [
        { id: '1', name: 'SAP/Oracle', level: 'expert', category: 'ERP' },
        { id: '2', name: 'Financial Reporting', level: 'expert', category: 'Accounting' },
        { id: '3', name: 'Team Leadership', level: 'advanced', category: 'Management' },
        { id: '4', name: 'SOX Compliance', level: 'advanced', category: 'Regulatory' },
      ],
    },
  },

  // HUMAN RESOURCES TEMPLATES
  {
    id: 'hr-entry-1',
    name: 'HR Coordinator',
    profession: 'human-resources',
    professionLabel: 'Human Resources',
    experienceLevel: 'entry',
    description: 'For entry-level HR positions',
    sectionOrder: ['summary', 'education', 'experience', 'skills', 'certifications'],
    previewData: {
      contact: {
        fullName: 'Nicole Johnson',
        email: 'nicole.johnson@email.com',
        phone: '(555) 567-8901',
        location: 'Minneapolis, MN',
      },
      summary: {
        content: 'HR professional with foundational experience in recruitment, onboarding, and employee relations. Strong interpersonal and organizational skills with passion for creating positive workplace cultures and supporting employee development.',
      },
      education: [
        {
          id: '1',
          institution: 'University of Minnesota',
          degree: 'Bachelor of Arts',
          field: 'Human Resource Management',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.5',
        },
      ],
      experience: [
        {
          id: '1',
          company: 'Tech Startup Inc.',
          title: 'HR Coordinator',
          location: 'Minneapolis, MN',
          startDate: '2024-06',
          endDate: '',
          current: true,
          bullets: [
            'Coordinate full-cycle recruitment for 20+ positions, reducing time-to-fill by 25%',
            'Manage employee onboarding program for 50+ new hires annually',
            'Administer HRIS (BambooHR) and maintain accurate employee records',
            'Support benefits administration and answer employee inquiries',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'BambooHR/Workday', level: 'intermediate', category: 'HRIS' },
        { id: '2', name: 'Recruitment & Selection', level: 'intermediate', category: 'HR' },
        { id: '3', name: 'Employee Relations', level: 'intermediate', category: 'HR' },
        { id: '4', name: 'Microsoft Office', level: 'advanced', category: 'Software' },
      ],
    },
  },
  {
    id: 'hr-senior-1',
    name: 'HR Manager',
    profession: 'human-resources',
    professionLabel: 'Human Resources',
    experienceLevel: 'senior',
    description: 'For HR managers and directors',
    sectionOrder: ['summary', 'experience', 'certifications', 'education', 'skills'],
    previewData: {
      contact: {
        fullName: 'Patricia Williams',
        email: 'patricia.williams@email.com',
        phone: '(555) 678-9012',
        location: 'Dallas, TX',
      },
      summary: {
        content: 'SHRM-SCP certified HR leader with 10+ years of experience building high-performing teams and driving organizational development. Expertise in talent acquisition, compensation & benefits, and employee engagement. Proven track record of reducing turnover by 35% and improving employee satisfaction scores.',
      },
      experience: [
        {
          id: '1',
          company: 'Healthcare Services Company',
          title: 'Director of Human Resources',
          location: 'Dallas, TX',
          startDate: '2019-04',
          endDate: '',
          current: true,
          bullets: [
            'Lead HR function for 800+ employee organization across 5 locations',
            'Redesigned compensation structure resulting in 20% improvement in offer acceptance rate',
            'Implemented employee engagement program improving NPS from 35 to 72',
            'Reduced annual turnover from 28% to 18% through retention initiatives',
          ],
        },
      ],
      certifications: [
        { id: '1', name: 'SHRM-SCP', issuer: 'SHRM', date: '2018-03' },
        { id: '2', name: 'PHR', issuer: 'HRCI', date: '2015-06' },
      ],
      education: [
        {
          id: '1',
          institution: 'Southern Methodist University',
          degree: 'Master of Business Administration',
          field: 'Human Resource Management',
          startDate: '2014-08',
          endDate: '2016-05',
        },
      ],
      skills: [
        { id: '1', name: 'Strategic HR Planning', level: 'expert', category: 'Strategy' },
        { id: '2', name: 'Compensation & Benefits', level: 'expert', category: 'HR' },
        { id: '3', name: 'Employment Law', level: 'advanced', category: 'Legal' },
        { id: '4', name: 'HRIS (Workday/SAP)', level: 'advanced', category: 'Technology' },
      ],
    },
  },

  // RETAIL TEMPLATES
  {
    id: 'retail-entry-1',
    name: 'Sales Associate',
    profession: 'retail',
    professionLabel: 'Retail',
    experienceLevel: 'entry',
    description: 'For retail and customer service roles',
    sectionOrder: ['summary', 'experience', 'skills', 'education'],
    previewData: {
      contact: {
        fullName: 'Ashley Brown',
        email: 'ashley.brown@email.com',
        phone: '(555) 789-0123',
        location: 'Orlando, FL',
      },
      summary: {
        content: 'Enthusiastic retail professional with 2+ years of customer service experience. Proven ability to exceed sales goals while delivering exceptional customer experiences. Strong product knowledge and visual merchandising skills.',
      },
      experience: [
        {
          id: '1',
          company: 'Fashion Retail Store',
          title: 'Sales Associate',
          location: 'Orlando, FL',
          startDate: '2022-06',
          endDate: '',
          current: true,
          bullets: [
            'Consistently exceed monthly sales targets by 15-20%, ranking in top 3 of 12 associates',
            'Provide personalized styling advice resulting in 30% increase in multi-item purchases',
            'Process 50+ transactions daily while maintaining 98% accuracy rate',
            'Train new associates on POS systems and store policies',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Customer Service', level: 'advanced', category: 'Core' },
        { id: '2', name: 'POS Systems', level: 'advanced', category: 'Technology' },
        { id: '3', name: 'Visual Merchandising', level: 'intermediate', category: 'Retail' },
        { id: '4', name: 'Inventory Management', level: 'intermediate', category: 'Operations' },
      ],
      education: [
        {
          id: '1',
          institution: 'Valencia College',
          degree: 'Associate of Arts',
          field: 'Business Administration',
          startDate: '2020-08',
          endDate: '2022-05',
        },
      ],
    },
  },
  {
    id: 'retail-mid-1',
    name: 'Store Manager',
    profession: 'retail',
    professionLabel: 'Retail',
    experienceLevel: 'mid',
    description: 'For retail management positions',
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'certifications'],
    previewData: {
      contact: {
        fullName: 'Marcus Davis',
        email: 'marcus.davis@email.com',
        phone: '(555) 890-1234',
        location: 'Houston, TX',
      },
      summary: {
        content: 'Results-driven retail manager with 6+ years of experience leading high-volume store operations. Track record of increasing sales by 25% year-over-year while reducing shrinkage and improving team retention. Skilled in P&L management, team development, and customer experience optimization.',
      },
      experience: [
        {
          id: '1',
          company: 'Major Retail Chain',
          title: 'Store Manager',
          location: 'Houston, TX',
          startDate: '2021-03',
          endDate: '',
          current: true,
          bullets: [
            'Manage $4M annual revenue store with team of 25 associates',
            'Increased comparable store sales by 18% through targeted promotions and improved customer service',
            'Reduced employee turnover from 45% to 22% by implementing recognition and development programs',
            'Achieved highest customer satisfaction scores in district (4.8/5.0)',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'P&L Management', level: 'advanced', category: 'Business' },
        { id: '2', name: 'Team Leadership', level: 'advanced', category: 'Management' },
        { id: '3', name: 'Inventory Control', level: 'advanced', category: 'Operations' },
        { id: '4', name: 'Loss Prevention', level: 'intermediate', category: 'Operations' },
      ],
      education: [
        {
          id: '1',
          institution: 'University of Houston',
          degree: 'Bachelor of Business Administration',
          field: 'Retail Management',
          startDate: '2014-08',
          endDate: '2018-05',
        },
      ],
    },
  },

  // LEGAL TEMPLATES
  {
    id: 'legal-entry-1',
    name: 'Paralegal',
    profession: 'legal',
    professionLabel: 'Legal',
    experienceLevel: 'entry',
    description: 'For paralegals and legal assistants',
    sectionOrder: ['summary', 'education', 'certifications', 'experience', 'skills'],
    previewData: {
      contact: {
        fullName: 'Lauren Mitchell',
        email: 'lauren.mitchell@email.com',
        phone: '(555) 901-2345',
        location: 'Washington, DC',
      },
      summary: {
        content: 'Certified paralegal with expertise in corporate law and litigation support. Detail-oriented professional skilled in legal research, document preparation, and case management. Committed to supporting attorneys and ensuring efficient legal operations.',
      },
      education: [
        {
          id: '1',
          institution: 'Georgetown University',
          degree: 'Bachelor of Arts',
          field: 'Legal Studies',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.6',
        },
      ],
      certifications: [
        { id: '1', name: 'Certified Paralegal (CP)', issuer: 'NALA', date: '2024-07' },
      ],
      experience: [
        {
          id: '1',
          company: 'Corporate Law Firm LLP',
          title: 'Paralegal',
          location: 'Washington, DC',
          startDate: '2024-06',
          endDate: '',
          current: true,
          bullets: [
            'Conduct legal research using Westlaw and LexisNexis for 10+ attorneys',
            'Draft and proofread legal documents including contracts, pleadings, and correspondence',
            'Manage case files and maintain document databases for 50+ active matters',
            'Coordinate with courts, clients, and opposing counsel on scheduling and filings',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Westlaw/LexisNexis', level: 'advanced', category: 'Research' },
        { id: '2', name: 'Legal Document Drafting', level: 'advanced', category: 'Core' },
        { id: '3', name: 'Case Management Software', level: 'intermediate', category: 'Technology' },
        { id: '4', name: 'E-Discovery', level: 'intermediate', category: 'Technology' },
      ],
    },
  },
  {
    id: 'legal-senior-1',
    name: 'Associate Attorney',
    profession: 'legal',
    professionLabel: 'Legal',
    experienceLevel: 'senior',
    description: 'For practicing attorneys',
    sectionOrder: ['summary', 'experience', 'education', 'certifications', 'publications', 'skills'],
    previewData: {
      contact: {
        fullName: 'James Richardson, Esq.',
        email: 'james.richardson@lawfirm.com',
        phone: '(555) 012-3456',
        location: 'New York, NY',
      },
      summary: {
        content: 'Corporate attorney with 7 years of experience in mergers & acquisitions, securities law, and corporate governance. Successfully closed $2B+ in transactions. Recognized for thorough due diligence, client relationship management, and complex deal structuring.',
      },
      experience: [
        {
          id: '1',
          company: 'White Shoe Law Firm',
          title: 'Senior Associate',
          location: 'New York, NY',
          startDate: '2020-09',
          endDate: '',
          current: true,
          bullets: [
            'Lead counsel on M&A transactions ranging from $50M to $500M',
            'Advise Fortune 500 clients on SEC compliance and corporate governance matters',
            'Draft and negotiate complex transaction documents including merger agreements and stock purchase agreements',
            'Mentor and supervise team of 3 junior associates and 2 paralegals',
          ],
        },
      ],
      education: [
        {
          id: '1',
          institution: 'Columbia Law School',
          degree: 'Juris Doctor',
          field: 'Law',
          startDate: '2014-08',
          endDate: '2017-05',
          description: 'Law Review, Harlan Fiske Stone Scholar',
        },
      ],
      certifications: [
        { id: '1', name: 'New York State Bar', issuer: 'NY Bar Association', date: '2017-11' },
        { id: '2', name: 'Securities Industry Essentials (SIE)', issuer: 'FINRA', date: '2018-03' },
      ],
      publications: [
        {
          id: '1',
          title: 'SPAC Transactions: Regulatory Developments and Best Practices',
          publisher: 'Harvard Business Law Review',
          date: '2022-06',
        },
      ],
      skills: [
        { id: '1', name: 'M&A Transactions', level: 'expert', category: 'Practice Area' },
        { id: '2', name: 'Securities Law', level: 'expert', category: 'Practice Area' },
        { id: '3', name: 'Due Diligence', level: 'expert', category: 'Skills' },
        { id: '4', name: 'Contract Negotiation', level: 'advanced', category: 'Skills' },
      ],
    },
  },

  // ADMINISTRATIVE TEMPLATES
  {
    id: 'admin-entry-1',
    name: 'Administrative Assistant',
    profession: 'administrative',
    professionLabel: 'Administrative',
    experienceLevel: 'entry',
    description: 'For administrative and office support',
    sectionOrder: ['summary', 'experience', 'skills', 'education'],
    previewData: {
      contact: {
        fullName: 'Rebecca Torres',
        email: 'rebecca.torres@email.com',
        phone: '(555) 123-4567',
        location: 'San Diego, CA',
      },
      summary: {
        content: 'Organized and proactive administrative professional with strong multitasking abilities and attention to detail. Experienced in calendar management, travel coordination, and office operations. Known for maintaining confidentiality and anticipating executive needs.',
      },
      experience: [
        {
          id: '1',
          company: 'Corporate Services Inc.',
          title: 'Administrative Assistant',
          location: 'San Diego, CA',
          startDate: '2023-03',
          endDate: '',
          current: true,
          bullets: [
            'Manage complex calendars for 3 executives, scheduling 50+ meetings weekly',
            'Coordinate domestic and international travel arrangements with $100K+ annual travel budget',
            'Prepare expense reports, presentations, and confidential correspondence',
            'Serve as primary point of contact for clients and vendors',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Microsoft Office Suite', level: 'advanced', category: 'Software' },
        { id: '2', name: 'Calendar Management', level: 'advanced', category: 'Administrative' },
        { id: '3', name: 'Travel Coordination', level: 'advanced', category: 'Administrative' },
        { id: '4', name: 'Communication', level: 'advanced', category: 'Core' },
      ],
      education: [
        {
          id: '1',
          institution: 'San Diego State University',
          degree: 'Bachelor of Arts',
          field: 'Communications',
          startDate: '2019-08',
          endDate: '2023-05',
        },
      ],
    },
  },
  {
    id: 'admin-mid-1',
    name: 'Executive Assistant',
    profession: 'administrative',
    professionLabel: 'Administrative',
    experienceLevel: 'mid',
    description: 'For executive assistants and office managers',
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'certifications'],
    previewData: {
      contact: {
        fullName: 'Katherine Wright',
        email: 'katherine.wright@email.com',
        phone: '(555) 234-5678',
        location: 'Boston, MA',
      },
      summary: {
        content: 'Executive Assistant with 8+ years of experience supporting C-suite executives in fast-paced corporate environments. Expert in project coordination, stakeholder management, and confidential communications. Trusted partner known for anticipating needs and ensuring seamless operations.',
      },
      experience: [
        {
          id: '1',
          company: 'Global Technology Company',
          title: 'Executive Assistant to CEO',
          location: 'Boston, MA',
          startDate: '2019-06',
          endDate: '',
          current: true,
          bullets: [
            'Serve as strategic partner to CEO, managing all scheduling, correspondence, and travel',
            'Coordinate quarterly board meetings and annual shareholder meetings for 500+ attendees',
            'Manage $500K annual budget for executive office operations',
            'Lead special projects including office relocations and executive events',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Executive Support', level: 'expert', category: 'Core' },
        { id: '2', name: 'Project Management', level: 'advanced', category: 'Management' },
        { id: '3', name: 'Budget Management', level: 'advanced', category: 'Financial' },
        { id: '4', name: 'Stakeholder Communication', level: 'expert', category: 'Communication' },
      ],
      certifications: [
        { id: '1', name: 'Certified Administrative Professional (CAP)', issuer: 'IAAP', date: '2020-09' },
      ],
      education: [
        {
          id: '1',
          institution: 'Boston University',
          degree: 'Bachelor of Science',
          field: 'Business Administration',
          startDate: '2012-08',
          endDate: '2016-05',
        },
      ],
    },
  },

  // CIVIL ENGINEER TEMPLATES
  {
    id: 'civil-entry-1',
    name: 'Junior Civil Engineer',
    profession: 'civil-engineer',
    professionLabel: 'Civil Engineer',
    experienceLevel: 'entry',
    description: 'For entry-level civil engineering',
    sectionOrder: ['summary', 'education', 'projects', 'skills', 'certifications', 'experience'],
    previewData: {
      contact: {
        fullName: 'Ryan Cooper',
        email: 'ryan.cooper@email.com',
        phone: '(555) 345-6789',
        location: 'Denver, CO',
      },
      summary: {
        content: 'Civil Engineering graduate with hands-on experience in structural analysis and transportation projects. Proficient in AutoCAD, Civil 3D, and structural modeling software. EIT certified and pursuing PE licensure.',
      },
      education: [
        {
          id: '1',
          institution: 'Colorado School of Mines',
          degree: 'Bachelor of Science',
          field: 'Civil Engineering',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '3.6',
        },
      ],
      projects: [
        {
          id: '1',
          name: 'Bridge Design Capstone Project',
          description: 'Designed 200-ft prestressed concrete bridge meeting AASHTO specifications',
          technologies: ['SAP2000', 'AutoCAD Civil 3D', 'STAAD Pro'],
        },
        {
          id: '2',
          name: 'Stormwater Management Study',
          description: 'Developed comprehensive drainage plan for 50-acre development',
          technologies: ['HEC-RAS', 'Civil 3D', 'GIS'],
        },
      ],
      skills: [
        { id: '1', name: 'AutoCAD/Civil 3D', level: 'advanced', category: 'Design' },
        { id: '2', name: 'Structural Analysis', level: 'intermediate', category: 'Engineering' },
        { id: '3', name: 'Project Management', level: 'intermediate', category: 'Soft Skills' },
      ],
      certifications: [
        { id: '1', name: 'Engineer in Training (EIT)', issuer: 'Colorado DORA', date: '2024-06' },
      ],
    },
  },
  {
    id: 'civil-senior-1',
    name: 'Senior Civil Engineer',
    profession: 'civil-engineer',
    professionLabel: 'Civil Engineer',
    experienceLevel: 'senior',
    description: 'For licensed PEs and project managers',
    sectionOrder: ['summary', 'experience', 'certifications', 'education', 'projects', 'skills'],
    previewData: {
      contact: {
        fullName: 'Thomas Anderson, PE',
        email: 'thomas.anderson@email.com',
        phone: '(555) 456-7890',
        location: 'Phoenix, AZ',
      },
      summary: {
        content: 'Licensed Professional Engineer with 12+ years of experience in infrastructure design and project management. Led $100M+ in highway and bridge projects. Expert in structural design, transportation planning, and team leadership.',
      },
      experience: [
        {
          id: '1',
          company: 'Major Engineering Firm',
          title: 'Senior Project Manager',
          location: 'Phoenix, AZ',
          startDate: '2018-06',
          endDate: '',
          current: true,
          bullets: [
            'Manage portfolio of $50M+ transportation infrastructure projects',
            'Lead multidisciplinary teams of 15+ engineers, surveyors, and technicians',
            'Ensure projects meet schedule, budget, and quality requirements with 98% on-time delivery',
            'Develop and maintain client relationships with state DOT and municipal agencies',
          ],
        },
      ],
      certifications: [
        { id: '1', name: 'Professional Engineer (PE)', issuer: 'Arizona Board of Technical Registration', date: '2015-08' },
        { id: '2', name: 'Project Management Professional (PMP)', issuer: 'PMI', date: '2018-03' },
      ],
      education: [
        {
          id: '1',
          institution: 'Arizona State University',
          degree: 'Master of Science',
          field: 'Structural Engineering',
          startDate: '2012-08',
          endDate: '2014-05',
        },
      ],
      skills: [
        { id: '1', name: 'Project Management', level: 'expert', category: 'Management' },
        { id: '2', name: 'Structural Design', level: 'expert', category: 'Engineering' },
        { id: '3', name: 'Client Relations', level: 'advanced', category: 'Business Development' },
      ],
    },
  },

  // ARCHITECT TEMPLATES
  {
    id: 'architect-entry-1',
    name: 'Junior Architect',
    profession: 'architect',
    professionLabel: 'Architect',
    experienceLevel: 'entry',
    description: 'For architecture graduates and interns',
    sectionOrder: ['summary', 'education', 'projects', 'skills', 'experience'],
    previewData: {
      contact: {
        fullName: 'Sophia Garcia',
        email: 'sophia.garcia@email.com',
        phone: '(555) 567-8901',
        location: 'Los Angeles, CA',
      },
      summary: {
        content: 'Architecture graduate with expertise in sustainable design and 3D visualization. Skilled in Revit, AutoCAD, and SketchUp with portfolio featuring award-winning academic projects. Passionate about creating spaces that enhance human experience.',
      },
      education: [
        {
          id: '1',
          institution: 'USC School of Architecture',
          degree: 'Master of Architecture',
          field: 'Architecture',
          startDate: '2022-08',
          endDate: '2024-05',
        },
      ],
      projects: [
        {
          id: '1',
          name: 'Sustainable Community Center',
          description: 'LEED Platinum-targeted design featuring passive cooling, solar integration, and rainwater harvesting',
          technologies: ['Revit', 'Grasshopper', 'EnergyPlus'],
        },
        {
          id: '2',
          name: 'Adaptive Reuse Housing',
          description: 'Converted industrial warehouse into 24-unit affordable housing complex',
          technologies: ['AutoCAD', 'Lumion', 'SketchUp'],
        },
      ],
      skills: [
        { id: '1', name: 'Revit', level: 'advanced', category: 'BIM' },
        { id: '2', name: 'AutoCAD', level: 'advanced', category: 'CAD' },
        { id: '3', name: 'Sustainable Design', level: 'intermediate', category: 'Specialty' },
        { id: '4', name: 'Rhino/Grasshopper', level: 'intermediate', category: 'Parametric' },
      ],
      experience: [
        {
          id: '1',
          company: 'Design Studio Architecture',
          title: 'Architectural Intern',
          location: 'Los Angeles, CA',
          startDate: '2023-06',
          endDate: '2023-08',
          current: false,
          bullets: [
            'Developed construction documents for $5M residential renovation project',
            'Created 3D renderings and presentation materials for client meetings',
            'Assisted with site visits, measurements, and as-built documentation',
          ],
        },
      ],
    },
  },

  // DRIVER TEMPLATES
  {
    id: 'driver-entry-1',
    name: 'Commercial Driver',
    profession: 'driver',
    professionLabel: 'Driver',
    experienceLevel: 'entry',
    description: 'For CDL and delivery drivers',
    sectionOrder: ['summary', 'certifications', 'experience', 'skills'],
    previewData: {
      contact: {
        fullName: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '(555) 678-9012',
        location: 'Memphis, TN',
      },
      summary: {
        content: 'CDL Class A driver with clean driving record and 3+ years of over-the-road experience. Committed to safety, on-time delivery, and professional customer service. Experienced with ELD compliance and DOT regulations.',
      },
      certifications: [
        { id: '1', name: 'CDL Class A License', issuer: 'Tennessee DMV', date: '2021-03' },
        { id: '2', name: 'HAZMAT Endorsement', issuer: 'Tennessee DMV', date: '2022-06' },
        { id: '3', name: 'DOT Medical Certificate', issuer: 'FMCSA', date: '2024-01' },
      ],
      experience: [
        {
          id: '1',
          company: 'National Trucking Company',
          title: 'OTR Driver',
          location: 'Memphis, TN',
          startDate: '2021-06',
          endDate: '',
          current: true,
          bullets: [
            'Drive 2,500+ miles weekly delivering freight across 48 states',
            'Maintain 100% on-time delivery rate and zero preventable accidents',
            'Perform pre-trip and post-trip vehicle inspections per DOT requirements',
            'Manage ELD logs and maintain compliance with HOS regulations',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Defensive Driving', level: 'advanced', category: 'Driving' },
        { id: '2', name: 'ELD/GPS Systems', level: 'advanced', category: 'Technology' },
        { id: '3', name: 'Load Securing', level: 'advanced', category: 'Operations' },
        { id: '4', name: 'Customer Service', level: 'intermediate', category: 'Core' },
      ],
    },
  },

  // PRODUCT MANAGER TEMPLATES
  {
    id: 'pm-entry-1',
    name: 'Associate PM',
    profession: 'product-manager',
    professionLabel: 'Product Manager',
    experienceLevel: 'entry',
    description: 'For APMs and transitioning into PM',
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects'],
    previewData: {
      contact: {
        fullName: 'Daniel Lee',
        email: 'daniel.lee@email.com',
        phone: '(555) 789-0123',
        location: 'San Francisco, CA',
      },
      summary: {
        content: 'Aspiring product manager with background in software engineering and strong analytical skills. Experienced in user research, agile methodologies, and cross-functional collaboration. Passionate about building products that solve real user problems.',
      },
      experience: [
        {
          id: '1',
          company: 'Tech Startup',
          title: 'Associate Product Manager',
          location: 'San Francisco, CA',
          startDate: '2023-06',
          endDate: '',
          current: true,
          bullets: [
            'Own product roadmap for mobile app feature with 100K+ monthly active users',
            'Conduct user research including interviews, surveys, and A/B testing',
            'Write product requirements documents and user stories for engineering team',
            'Analyze product metrics and present insights to leadership monthly',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Product Analytics', level: 'intermediate', category: 'Skills' },
        { id: '2', name: 'User Research', level: 'intermediate', category: 'Skills' },
        { id: '3', name: 'SQL', level: 'advanced', category: 'Technical' },
        { id: '4', name: 'Figma', level: 'intermediate', category: 'Design' },
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2019-08',
          endDate: '2023-05',
        },
      ],
    },
  },
  {
    id: 'pm-senior-1',
    name: 'Senior PM',
    profession: 'product-manager',
    professionLabel: 'Product Manager',
    experienceLevel: 'senior',
    description: 'For experienced product leaders',
    sectionOrder: ['summary', 'experience', 'skills', 'education'],
    previewData: {
      contact: {
        fullName: 'Jennifer Wang',
        email: 'jennifer.wang@email.com',
        phone: '(555) 890-1234',
        location: 'Seattle, WA',
      },
      summary: {
        content: 'Senior Product Manager with 8+ years of experience building B2B SaaS products. Track record of launching products that generated $50M+ in ARR. Expert in go-to-market strategy, product-led growth, and building high-performing product teams.',
      },
      experience: [
        {
          id: '1',
          company: 'Enterprise SaaS Company',
          title: 'Senior Product Manager',
          location: 'Seattle, WA',
          startDate: '2020-04',
          endDate: '',
          current: true,
          bullets: [
            'Lead product strategy for $100M ARR enterprise platform serving 500+ customers',
            'Launched 3 major product lines contributing 40% of company revenue growth',
            'Manage team of 2 product managers and collaborate with 25+ engineers',
            'Drive product-led growth initiatives increasing trial-to-paid conversion by 35%',
          ],
        },
        {
          id: '2',
          company: 'Growth Stage Startup',
          title: 'Product Manager',
          location: 'San Francisco, CA',
          startDate: '2017-06',
          endDate: '2020-03',
          current: false,
          bullets: [
            'Built product from 0 to 1, achieving product-market fit and $10M ARR',
            'Established product analytics framework tracking 50+ key metrics',
          ],
        },
      ],
      skills: [
        { id: '1', name: 'Product Strategy', level: 'expert', category: 'Strategy' },
        { id: '2', name: 'Go-to-Market', level: 'advanced', category: 'Strategy' },
        { id: '3', name: 'Team Leadership', level: 'advanced', category: 'Leadership' },
        { id: '4', name: 'Data Analysis', level: 'advanced', category: 'Technical' },
      ],
      education: [
        {
          id: '1',
          institution: 'UC Berkeley',
          degree: 'MBA',
          field: 'Business Administration',
          startDate: '2015-08',
          endDate: '2017-05',
        },
      ],
    },
  },
];

export const getTemplatesByProfession = (profession: ProfessionCategory): ProfessionTemplate[] => {
  if (profession === 'all') {
    return professionTemplates;
  }
  return professionTemplates.filter(t => t.profession === profession);
};

export const getExperienceLevelLabel = (level: ExperienceLevel): string => {
  switch (level) {
    case 'entry': return 'Entry Level';
    case 'mid': return 'Mid Level';
    case 'senior': return 'Senior Level';
  }
};
