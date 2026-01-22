// Course Model
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string; // 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string | InstructorInfo; // Support both string and object
  duration: string | number; // Support both '4 weeks' and number in hours
  students?: number;
  totalEnrolled?: number;
  rating: number;
  isFeatured: boolean;
  isNew: boolean;
  image?: string;
  imageUrl?: string;
  price?: number;
  lessons?: Lesson[];
  materials?: Material[];
  syllabus?: Lesson[];
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
