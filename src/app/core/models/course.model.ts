// Course Model
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: CourseDifficulty;
  instructor: InstructorInfo;
  price: number;
  rating: number;
  totalEnrolled: number;
  totalLessons: number;
  duration: number; // in hours
  image?: string;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
  syllabus: Lesson[];
}

// Instructor Info (light version)
export interface InstructorInfo {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Lesson Model
export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  order: number;
  videoUrl?: string;
  materials?: Material[];
  completed?: boolean;
}

// Material (Resources)
export interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'document' | 'video' | 'link';
  url: string;
  size?: number;
}

// Course Difficulty Enum
export enum CourseDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

// Create Course DTO
export interface CreateCourseDTO {
  title: string;
  description: string;
  category: string;
  difficulty: CourseDifficulty;
  price: number;
  duration: number;
  image?: string;
  syllabus: Lesson[];
}

// Update Course DTO
export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {
  id: string;
}
