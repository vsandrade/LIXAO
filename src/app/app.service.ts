import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FooterBannerConfiguration } from './FooterBannerConfiguration';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public getAccountApplicationFooterBannerConfiguration(): Observable<FooterBannerConfiguration> {
    return of({...environment.footerBannerConfig} as FooterBannerConfiguration);
  }

}
