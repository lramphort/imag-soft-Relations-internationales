import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DailyTopic } from 'src/app/models/daily-topic';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyTopicsService {
  constructor(private readonly http: HttpClient) { }

  getDailyTopics(): Observable<{
    dailyTopics: DailyTopic[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_dailyTopics}`).pipe(
      map(response => {
        return {
          dailyTopics: response['DailyTopic'].map((dailyTopic: DailyTopic) => {
            return new DailyTopic(dailyTopic);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }

  getDailyTopicById(idDailyTopic: string): Observable<DailyTopic> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_dailyTopics}?idDailyTopic=${idDailyTopic}`)
      .pipe(
        map(dailyTopics => dailyTopics['DailyTopic']
          .map(dailyTopic => new DailyTopic(dailyTopic))
        )
      );
  }

  getDailyTopicsByStudent(idPerson: string): Observable<{
    dailyTopics: DailyTopic[],
    nbRows: number
  }> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.get_dailyTopics}?idPerson=${idPerson}`).pipe(
      map(response => {
        return {
          dailyTopics: response['DailyTopic'].map((dailyTopic: DailyTopic) => {
            return new DailyTopic(dailyTopic);
          }),
          nbRows: response['nombre']
        };
      })
    );
  }
// TODO daily topic synchro avec l'admin !!
  addDailyTopic(dailyTopic: object): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<object>(`${environment.ip_address}${environment.back.add_dailyTopic}?idPerson=${dailyTopic['idPerson']}&dateDailyTopic=${dailyTopic['dateDailyTopic']}&description=${dailyTopic['description']}&name=${dailyTopic['name']}`);
  }

  deleteDailyTopic(idDailyTopic: string): Observable<any> {
    return this.http.get<object>(`${environment.ip_address}${environment.back.delete_dailyTopic}?idDailyTopic=${idDailyTopic}`);
  }
}
