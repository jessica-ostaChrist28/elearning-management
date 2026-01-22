import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/models';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    if (!courses || !category) {
      return courses;
    }
    return courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }
}
