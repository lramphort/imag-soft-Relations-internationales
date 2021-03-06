import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { CourseService } from '../services/back/course.service';

@Injectable()
export class CoursesResolver implements Resolve<{
    courses: Course[],
    nbRows: number
}> {
    constructor(private readonly courseService: CourseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        courses: Course[],
        nbRows: number
    }> {
        if (localStorage.getItem('type') === 'administrator') {
            return this.courseService.getCoursesByStudent(route.params.idPerson);
        }
        return this.courseService.getCoursesByStudent(localStorage.getItem('idPerson'));
    }
}
