import { Injectable } from '@angular/core';
import { Administrator } from 'src/app/models/administrator';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {sha256} from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  constructor(private readonly http: HttpClient) { }

  testLogs(login: string, passWord: string): Observable<boolean> {
    const encryptedPassword = sha256(passWord);
    return this.http.get<boolean>(
      `${environment.ip_address}${environment.back.login_administrator}?loginAdministrator=${login}&passWordAdministrator=${encryptedPassword}`
    );
  }

  getAdministrators(): Observable<{
    administrators: Administrator[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_administrators}`).pipe(
      map(response => {
        return {
          administrators: response['Administrator'].map((administrator: Administrator) => {
            return new Administrator(administrator);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }

  getAdministrator(idPerson: string): Observable<Administrator> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_administrators}?idPerson=${idPerson}`)
      .pipe(
        map(administrators => administrators['Administrator']
          .map(administrator => new Administrator(administrator))
        )
      );
  }

  getHasBeenSeenTopicsByStudent(idPerson: string): Observable<number> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.count_dailyTopics_not_seen}?idPerson=${idPerson}`)
      .pipe(
        map(result => result['nombre'])
      );
  }

  updateDailyTopicOnSeeForAStudent(idPerson: string): Observable<any> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.update_dailyTopic}?idPerson=${idPerson}`)
      .pipe(
        map(result => result)
      );
  }
}
