import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WidgetConfiguration } from './WidgetConfiguration';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public getAccountApplicationFooterBannerConfiguration(): Observable<WidgetConfiguration> {
    return this.http.get<WidgetConfiguration>(`http://localhost:3000/WidgetConfig`)
    .pipe(
      tap((x) => console.log(x))
    );
  }

}
