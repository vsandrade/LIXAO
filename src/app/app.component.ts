import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
} from '@angular/animations';
import { FooterBannerType, FooterBannerConfiguration } from './FooterBannerConfiguration';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        visibility: 'hidden',
      })),
      state('final', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('final=>initial', [
        group([
          query('.offerBanner_footerLabel', [
            animate('300ms ease-in', style({ overflow: 'hidden', opacity: 0 }))
          ]),
          query('.offerBanner_container_bannerContainer', [
            animate('300ms ease-in', style({ height: '0', overflow: 'hidden', opacity: 0, visibility: 'hidden' }))
          ]),
          animate('300ms ease-in'),
        ]
        )]),
      transition('initial=>final', [
        animate('300ms ease-out'),
        query('.offerBanner_container_bannerContainer', [
          animate('300s ease-out', style({ height: '*', overflow: 'hidden' }))
        ]),
      ])
    ]),
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0deg)'})),
      state('rotated', style({ transform: 'rotate(0deg)'})),
      transition('default <=> rotated', animate('100ms'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy  {

  public isOpen = true;

  public statusBanner: FooterBannerConfiguration;

  private unsubscriber = new Subject();

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    if (window.scrollY > 100) {
      this.isOpen = false;
      sessionStorage.setItem('footerBannerOpen', `${this.isOpen}`);
    }
  }

  constructor(public service: AppService) { }

  ngOnInit(): void {
    this.isOpen = sessionStorage.getItem('footerBannerOpen') === null ? true : JSON.parse(sessionStorage.getItem('footerBannerOpen'));
    this.afterLaunch();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    sessionStorage.setItem('footerBannerOpen', `${this.isOpen}`);
  }

  afterLaunch(): void {
    this.service.getAccountApplicationFooterBannerConfiguration()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        (config) => {
            this.statusBanner = config;
        },
        (error) => {
            console.error(error);
        }
      );
  }

  callMortgageInfo(): void {
    if (this.statusBanner.status === FooterBannerType.PreLaunching) {
        window.open(this.statusBanner.preLaunchingUrl, '_blank');
    } else {
        window.open(this.statusBanner.launchedUrl, '_blank');
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
