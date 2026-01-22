import { Course } from './course.model';
import { Student } from './user.model';

// Enrollment Model
export interface Enrollment {
  id: string;
  student: Student;
  course: Course;
  enrolledDate: Date;
  completionDate?: Date;
  progress: number; // percentage (0-100)
  status: EnrollmentStatus;
  certificateUrl?: string;
}

// Enrollment Status
export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  SUSPENDED = 'suspended'
}

// Student Progress
export interface StudentProgress {
  enrollmentId: string;
  studentId: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  lastAccessedDate: Date;
  estimatedCompletionDate?: Date;
}

// Enrollment Request DTO
export interface EnrollmentRequestDTO {
  studentId: string;
  courseId: string;
}

// Progress Update DTO
export interface ProgressUpdateDTO {
  enrollmentId: string;
  lessonId: string;
  completed: boolean;
}
