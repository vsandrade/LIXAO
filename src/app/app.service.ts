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

  private WidgetConfig: WidgetConfiguration;

  constructor(private http: HttpClient) { }

  public async widgetConfig(): Promise<WidgetConfiguration> {
    if (this.WidgetConfig === undefined) {
      await this.getAccountApplicationWidgetConfiguration().then((response) => this.WidgetConfig = response);
    }
    return this.WidgetConfig;
  }

  public async getAccountApplicationWidgetConfiguration(): Promise<WidgetConfiguration> {
    return await this.http.get<WidgetConfiguration>(`http://localhost:3000/WidgetConfig`).toPromise();
  }

}
