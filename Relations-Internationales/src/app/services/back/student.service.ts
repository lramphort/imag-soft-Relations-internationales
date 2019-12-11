import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { sha256, sha224 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private readonly http: HttpClient) { }

  testLogs(login: string, passWord: string): Observable<any> {
    const encryptedPassword = sha256(passWord);
    return this.http.get<any>(
      `${environment.ip_address}${environment.back.login_student}?loginStudent=${login}&passWordStudent=${encryptedPassword}`
    ).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStudents(): Observable<{
    students: Student[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_students}`).pipe(
      map(response => {
        return {
          students: response['Student'].map((student: Student) => {
            return new Student(student);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }

  getStudent(idPerson: string): Observable<Student> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_students}?idPerson=${idPerson}`)
      .pipe(
        map(students => students['Student']
          .map(student => new Student(student))
        )
      );
  }

  addStudent(student: object): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<object>(`${environment.ip_address}${environment.back.add_student}?emailAddress=${student['emailAddress']}&firstName=${student['firstName']}&lastName=${student['lastName']}&birthDate=${student['birthDate']}&phoneNumber=${student['phoneNumber']}&university=${student['university']}&isEntrant=${student['isEntrant']}`);
  }

  updateLAStudent(student: object): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<object>(`${environment.ip_address}${environment.back.update_LA_student}?idPerson=${student['idPerson']}&isLearningAgreementValid=${student['isLearningAgreementValid']}`);
  }

  updateIsArchivedStudent(personId: string, isArchived: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<object>(`${environment.ip_address}${environment.back.update_isArchived_student}?idPerson=${personId}&isArchived=${isArchived}`);
  }
}
