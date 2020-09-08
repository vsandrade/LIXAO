import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
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
        opacity: 0,
        visibility: 'hidden',
      })),
      state('final', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('400ms'))
    ]),
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(90deg)'})),
      state('rotated', style({ transform: 'rotate(-90deg)'})),
      transition('default <=> rotated', animate('100ms'))
    ])
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy  {

  public isOpen = true;

  public statusBanner: FooterBannerConfiguration;

  private unsubscriber = new Subject();

  public ActiveBanner = {
    preLaunching: {
      title: 'A better mortgage offering...is coming soon',
      description: 'To be the first to know when it launches, tell us about your mortgage needs.',
      btnLabel: `I'M INTERESTED`
    },
    launched: {
      title: 'Introducing <label>QuestMortgage</label>',
      description: 'An easier, online way to get a mortgage with a BetterRate so you can keep more of your money.',
      btnLabel: 'LEARN MORE'
    }
  };

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
