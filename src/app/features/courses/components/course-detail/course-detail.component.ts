import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../core/models';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  loading = true;
  error: string | null = null;
  activeTab = 'about';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadCourse(params['id']);
      }
    });
  }

  loadCourse(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load course';
        this.loading = false;
      }
    });
  }

  enrollCourse(): void {
    // TODO: Implement enrollment logic
    console.log('Enrolling in course:', this.course?.id);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
