export class FooterBannerConfiguration {
  status: FooterBannerType | null;
  preLaunchingUrl: string | null;
  launchedUrl: string | null;
}

export enum FooterBannerType {
  PreLaunching = 'preLaunching',
  Launched = 'launched',
  Inactive = 'inactive'
}
