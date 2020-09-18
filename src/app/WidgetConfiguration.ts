export class WidgetConfiguration {
    // Mortgage Application
    mfeMortgageApplicationIsEnabled: boolean | string | null;
    mfeMortgageApplicationUrl: string | null;

    // Mortgage Account
    mfeMortgageAccountIsEnabled: boolean | string | null;
    mfeMortgageAccountCmlsPortalUrl: string | null;

    // Offer Banner
    bannerStatus: string | null;
    bannerPreLaunchingUrl: string | null;
    bannerLaunchedUrl: string | null;
}

export enum FooterBannerType {
  PreLaunching = 'preLaunching',
  Launched = 'launched',
  Inactive = 'inactive'
}
