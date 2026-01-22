import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { Course, CourseDifficulty } from '../../../../core/models';
import { HighlightFeaturedDirective } from '../../../../shared/directives/highlight-featured.directive';
import { HighlightNewDirective } from '../../../../shared/directives/highlight-new.directive';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HighlightFeaturedDirective,
    HighlightNewDirective
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  selectedCategory = '';
  selectedDifficulty = '';
  categories: string[] = [];
  difficulties = Object.values(CourseDifficulty);

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
      this.extractCategories();
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchQuery ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = !this.selectedCategory ||
        course.category.toLowerCase() === this.selectedCategory.toLowerCase();

      const matchesDifficulty = !this.selectedDifficulty ||
        course.difficulty === this.selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }

  extractCategories(): void {
    const categorySet = new Set(this.courses.map(c => c.category));
    this.categories = Array.from(categorySet);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.applyFilters();
  }

  enrollCourse(courseId: string): void {
    // TODO: Implement enrollment logic
    console.log('Enrolling in course:', courseId);
  }
}
