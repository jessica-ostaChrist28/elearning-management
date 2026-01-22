import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Course, CreateCourseDTO, UpdateCourseDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  /**
   * Load all courses from backend
   */
  loadCourses(): void {
    this.getAllCourses().subscribe(
      courses => this.coursesSubject.next(courses)
    );
  }

  /**
   * Get all courses
   */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get course by ID
   */
  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get courses by category
   */
  getCoursesByCategory(category: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?category=${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get featured courses
   */
  getFeaturedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}?featured=true`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create new course
   */
  createCourse(courseData: CreateCourseDTO): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, courseData)
      .pipe(
        tap(() => this.loadCourses()),
        catchError(this.handleError)
      );
  }

  /**
   * Update course
   */
  updateCourse(courseData: UpdateCourseDTO): Observable<Course> {
    const { id, ...data } = courseData;
    return this.http.put<Course>(`${this.apiUrl}/${id}`, data)
      .pipe(
        tap(() => this.loadCourses()),
        catchError(this.handleError)
      );
  }

  /**
   * Delete course
   */
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.loadCourses()),
        catchError(this.handleError)
      );
  }

  /**
   * Search courses
   */
  searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search?q=${query}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get courses from BehaviorSubject
   */
  getCachedCourses(): Course[] {
    return this.coursesSubject.value;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching courses';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.statusText;
    }

    console.error('CourseService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
