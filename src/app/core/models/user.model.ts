// User Model - Base interface for all users
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Instructor Model
export interface Instructor extends User {
  role: 'instructor';
  department: string;
  bio?: string;
  specialization: string[];
  coursesCount: number;
}

// Student Model
export interface Student extends User {
  role: 'student';
  enrollmentStatus: 'active' | 'inactive' | 'suspended';
  totalEnrolled: number;
  completionRate: number;
}

// Auth Response
export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// User Role Type
export type UserRole = 'student' | 'instructor' | 'admin';

// Login Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register Credentials
export interface RegisterCredentials extends LoginCredentials {
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
