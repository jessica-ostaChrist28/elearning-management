import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Enrollment, StudentProgress, EnrollmentRequestDTO, ProgressUpdateDTO, EnrollmentStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/api/enrollments';
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  public enrollments$ = this.enrollmentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Enroll student in course
   */
  enrollCourse(request: EnrollmentRequestDTO): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get enrollments for student
   */
  getStudentEnrollments(studentId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get enrollments for course
   */
  getCourseEnrollments(courseId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?courseId=${courseId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get single enrollment
   */
  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update student progress
   */
  updateProgress(progressUpdate: ProgressUpdateDTO): Observable<StudentProgress> {
    return this.http.post<StudentProgress>(`${this.apiUrl}/progress`, progressUpdate)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get student progress
   */
  getStudentProgress(enrollmentId: string): Observable<StudentProgress> {
    return this.http.get<StudentProgress>(`${this.apiUrl}/${enrollmentId}/progress`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Drop course
   */
  dropCourse(enrollmentId: string): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.apiUrl}/${enrollmentId}`, { status: EnrollmentStatus.DROPPED })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Complete course
   */
  completeCourse(enrollmentId: string): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.apiUrl}/${enrollmentId}`, { status: EnrollmentStatus.COMPLETED })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get certificate
   */
  getCertificate(enrollmentId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${enrollmentId}/certificate`, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred with enrollment';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.statusText;
    }

    console.error('EnrollmentService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
