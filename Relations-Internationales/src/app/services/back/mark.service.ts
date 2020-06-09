import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from 'src/app/models/mark';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  constructor(private readonly http: HttpClient) { }

  getMarks(): Observable<{
    marks: Mark[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_marks}`).pipe(
      map(response => {
        return {
          marks: response['Mark'].map((mark: Mark) => {
            return new Mark(mark);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }

  getMarkById(idMark: string): Observable<Mark> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_marks}?idMark=${idMark}`)
      .pipe(
        map(marks => marks['Mark']
          .map(mark => new Mark(mark))
        )
      );
  }

  getMarksByStudent(idCourse: string, idPerson: string): Observable<{
    marks: Mark[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_marks}?idCourse=${idCourse}&idPerson=${idPerson}`).pipe(
      map(response => {
        return {
          marks: response['Mark'].map((mark: Mark) => {
            return new Mark(mark);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }

  addMark(mark: object): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<object>(`${environment.ip_address}${environment.back.add_mark}?idPerson=${mark['idPerson']}&idCourse=${mark['idCourse']}&typeMark=_&valueMark=${mark['valueMark']}`);
  }
}
