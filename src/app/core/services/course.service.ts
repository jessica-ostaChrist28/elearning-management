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
   * Mock courses for demo purposes
   */
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular framework',
      category: 'Web Development',
      difficulty: 'Beginner',
      instructor: 'John Doe',
      duration: '4 weeks',
      students: 1250,
      rating: 4.8,
      isFeatured: true,
      isNew: false,
      imageUrl: 'assets/courses/course1.jpg',
      lessons: [],
      materials: []
    },
    {
      id: '2',
      title: 'React Basics',
      description: 'Master React for building interactive UIs',
      category: 'Web Development',
      difficulty: 'Beginner',
      instructor: 'Jane Smith',
      duration: '5 weeks',
      students: 2100,
      rating: 4.9,
      isFeatured: true,
      isNew: true,
      imageUrl: 'assets/courses/course2.jpg',
      lessons: [],
      materials: []
    },
    {
      id: '3',
      title: 'Vue.js Advanced',
      description: 'Advanced concepts in Vue.js development',
      category: 'Web Development',
      difficulty: 'Advanced',
      instructor: 'Mike Johnson',
      duration: '6 weeks',
      students: 850,
      rating: 4.7,
      isFeatured: false,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=Vue+Advanced',
      lessons: [],
      materials: []
    },
    {
      id: '4',
      title: 'TypeScript Mastery',
      description: 'Complete TypeScript for professional development',
      category: 'Programming Languages',
      difficulty: 'Intermediate',
      instructor: 'Sarah Williams',
      duration: '4 weeks',
      students: 1800,
      rating: 4.6,
      isFeatured: true,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=TypeScript+Mastery',
      lessons: [],
      materials: []
    },
    {
      id: '5',
      title: 'Node.js Backend',
      description: 'Build scalable backend applications with Node.js',
      category: 'Web Development',
      difficulty: 'Intermediate',
      instructor: 'Tom Brown',
      duration: '5 weeks',
      students: 1600,
      rating: 4.8,
      isFeatured: false,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=NodeJS+Backend',
      lessons: [],
      materials: []
    },
    {
      id: '6',
      title: 'Python for Data Science',
      description: 'Data analysis and visualization with Python',
      category: 'Data Science',
      difficulty: 'Intermediate',
      instructor: 'Emily Davis',
      duration: '6 weeks',
      students: 2200,
      rating: 4.9,
      isFeatured: true,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=Python+Data+Science',
      lessons: [],
      materials: []
    },
    {
      id: '7',
      title: 'Web Design Essentials',
      description: 'UI/UX design principles for the web',
      category: 'Web Development',
      difficulty: 'Beginner',
      instructor: 'Alex Martinez',
      duration: '4 weeks',
      students: 1400,
      rating: 4.5,
      isFeatured: false,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Web+Design',
      lessons: [],
      materials: []
    },
    {
      id: '8',
      title: 'Database Design',
      description: 'SQL and NoSQL database design patterns',
      category: 'Programming Languages',
      difficulty: 'Advanced',
      instructor: 'Chris Lee',
      duration: '5 weeks',
      students: 950,
      rating: 4.7,
      isFeatured: false,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Database+Design',
      lessons: [],
      materials: []
    },
    {
      id: '9',
      title: 'iOS Development',
      description: 'Build native iOS apps with Swift',
      category: 'Mobile Development',
      difficulty: 'Intermediate',
      instructor: 'Jessica Brown',
      duration: '6 weeks',
      students: 1100,
      rating: 4.6,
      isFeatured: true,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=iOS+Development',
      lessons: [],
      materials: []
    },
    {
      id: '10',
      title: 'Android Development',
      description: 'Create Android apps with Kotlin',
      category: 'Mobile Development',
      difficulty: 'Intermediate',
      instructor: 'David Wilson',
      duration: '6 weeks',
      students: 950,
      rating: 4.5,
      isFeatured: false,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=Android+Development',
      lessons: [],
      materials: []
    },
    {
      id: '11',
      title: 'Machine Learning Basics',
      description: 'Introduction to Machine Learning algorithms',
      category: 'Data Science',
      difficulty: 'Intermediate',
      instructor: 'Dr. Rachel Green',
      duration: '8 weeks',
      students: 1750,
      rating: 4.8,
      isFeatured: true,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=Machine+Learning',
      lessons: [],
      materials: []
    },
    {
      id: '12',
      title: 'Deep Learning Advanced',
      description: 'Neural networks and deep learning frameworks',
      category: 'Data Science',
      difficulty: 'Advanced',
      instructor: 'Prof. Andrew Chen',
      duration: '10 weeks',
      students: 680,
      rating: 4.9,
      isFeatured: false,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=Deep+Learning',
      lessons: [],
      materials: []
    },
    {
      id: '13',
      title: 'JavaScript ES6+',
      description: 'Modern JavaScript features and best practices',
      category: 'Programming Languages',
      difficulty: 'Beginner',
      instructor: 'Kevin Moore',
      duration: '4 weeks',
      students: 2500,
      rating: 4.7,
      isFeatured: false,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=JavaScript+ES6',
      lessons: [],
      materials: []
    },
    {
      id: '14',
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques',
      category: 'Web Development',
      difficulty: 'Beginner',
      instructor: 'Sophie Turner',
      duration: '3 weeks',
      students: 1900,
      rating: 4.8,
      isFeatured: true,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=CSS+Grid+Flexbox',
      lessons: [],
      materials: []
    },
    {
      id: '15',
      title: 'Docker & Kubernetes',
      description: 'Container orchestration for production deployments',
      category: 'Programming Languages',
      difficulty: 'Advanced',
      instructor: 'Marcus Johnson',
      duration: '7 weeks',
      students: 720,
      rating: 4.8,
      isFeatured: false,
      isNew: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Docker+Kubernetes',
      lessons: [],
      materials: []
    },
    {
      id: '16',
      title: 'Cloud Computing with AWS',
      description: 'Deploy and manage applications on AWS',
      category: 'Programming Languages',
      difficulty: 'Intermediate',
      instructor: 'Lisa Anderson',
      duration: '5 weeks',
      students: 1600,
      rating: 4.7,
      isFeatured: true,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x200?text=AWS+Cloud',
      lessons: [],
      materials: []
    }
  ];

  /**
   * Load all courses from backend or use mock data
   */
  loadCourses(): void {
    this.getAllCourses().subscribe(
      courses => this.coursesSubject.next(courses),
      error => {
        console.warn('Backend unavailable, loading mock courses');
        this.coursesSubject.next(this.mockCourses);
      }
    );
  }

  /**
   * Get all courses
   */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          // If backend is unavailable, return mock data
          console.warn('Using mock data instead of backend API');
          return new Observable<Course[]>(observer => {
            observer.next(this.mockCourses);
            observer.complete();
          });
        })
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
