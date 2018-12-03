import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Evento} from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  EVENT_URL = 'http://127.0.0.1:3000/eventos';
  USER_URL = 'http://127.0.0.1:3000/usuarios';

  constructor(private http: HttpClient) { }

  getEvents():Observable<any>{
    const httpOptions = {
      headers: {'Authorization': "Basic " + btoa("string:PenaPena"),
      'Content-Type': 'application/json'
    }};
  // Make the HTTP request:
  return this.http.get(this.EVENT_URL, httpOptions).pipe(
    map(function(res){
      return res;
    })
  );
  }

  getEvent(id): Observable<any> {
  const httpOptions = {
      headers: {'Authorization': "Basic " + btoa("string:PenaPena"),
      'Content-Type': 'application/json'
    }};
  return this.http.get(this.EVENT_URL + '/' + id, httpOptions).pipe(
    map(function(res){
      return res;
    }));
  }

  postEvent(event : Evento):Observable<any>{
    const httpOptions = {
      headers: {'Authorization': "Basic " + btoa("string:PenaPena"),
      'Content-Type': 'application/json'
    }};
    return this.http
      .post(this.EVENT_URL, event, httpOptions).pipe(
        map(function(res){
          return res;
        }));
  }

  getUserById(mail : String):Observable<any>{
    return this.http.get(this.USER_URL + '/' + mail, this.httpOptions).pipe(
      map(function(res){
        return res;
      })
    );
  }
}
