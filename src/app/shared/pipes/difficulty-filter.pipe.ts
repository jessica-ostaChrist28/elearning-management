import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/models';

@Pipe({
  name: 'difficultyFilter',
  standalone: true
})
export class DifficultyFilterPipe implements PipeTransform {
  transform(courses: Course[], difficulty: string): Course[] {
    if (!courses || !difficulty) {
      return courses;
    }
    return courses.filter(course => course.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
}
