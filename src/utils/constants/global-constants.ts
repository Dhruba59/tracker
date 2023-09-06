// import xandrLogo from '@images/xandr.png';
// import dv360Logo from '@images/dv360.png';
// import marketplaceLogo from '@images/marketplace.png';
// import { removeLastCharacter } from '@helpers/marketplace-action-list-helper';

export const INIT_PAGE_ITEMS_LIMIT: number = 10;
export const CAMPAIGN_TYPE = {
  DEAL_ID: 'DEAL_ID',
  MANAGED_CAMPAIGN: 'CAMPAIGN',
};

export const FORM_TYPE = {
  DSP_SELECTION_FORM: 'dsp-selection',
  DATE_AND_BUDGET_FORM: 'date_and_budget',
  CREATIVES_FORM: 'creatives',
  TARGETING_FORM: 'targeting',
};

export const TARGETING_TYPE = {
  GEO: 'geo',
  PLATFORM: 'platform',
  DEVICE: 'device',
  DOMAIN: 'domain',
  BUNDLE: 'bundle',
  BRANDSAFETY: 'brandsafety',
};

/**
 *? Step 2 is missing here intentionally.
 *? For Deals the steps are 0,1,3,5,6. And for Campaigns steps are 0,3,4,5,6.
 *? Here a pattern is created. For deals we should go for the odd steps and
 *? for campaigns just go to the next step with adding one (both first and
 *? last step are common for deals and campaigns).
 *? That's way we reduces some extra conditional codes.
 */

export const CURRENT_STEP_NAME = {
  CREATE_CAMPAIGN: 0,
  DSP_SELECTION: 1,
  DATE_AND_BUDGET: 3,
  CREATIVES: 4,
  TARGETING: 5,
  ADD_LINE_ITEM: 6,
};

export const STATUS_CODES = {
  TOKEN_EXPIRED: 401,
  UNAUTHORIZED: 403,
  NOT_FOUND: 400,
};

export const API_END_POINTS = {
  TOKEN: 'auth/token',
  LOGIN: 'auth/login',
  SIGN_UP: 'auth/register',
  REQUEST_RESET_PASSWORD: 'auth/request-password-reset',
  RESET_PASSWORD: 'auth/reset-password',
  VERIFY_EMAIL: 'auth/verify-email',
  LOGOUT: 'auth/logout',
  RE_TOKEN: 'auth/refresh-token',
  WORKSPACE: 'workspace',
  WORKSPACE_MEMBERS: 'workspace-members',
  TRACKER: 'tracker',
  TRACKER_MEMBERS: 'tracker-members',
  TASK: 'task',
  MILESTONE: 'milestone',
  USER: 'user',
  EVENT_LOG: 'event-logs',
  TARGET: 'target',
  CAMPAIGNS: 'campaigns',
  LINE_ITEMS: 'campaigns/line-item',
  BUSINESS_UNITS: 'campaigns/business-unit',
  SETTINGS: 'campaigns/setting',
  USER_DETAILS: 'users/user-details',
  ENTITY_OFFICES: 'campaigns/search-buying-entity-offices',
  BUYING_ENTITY: 'buying-entities',
  DRAFTS: 'drafts',
  WATCHED_CAMPAIGNS: 'watched-campaigns',
  METADATA_CAMPAIGNS: 'metadata-campaigns',
  METADATA_INTREGRATION_PLATFORMS: 'metadata-integration-platforms',
  METADATA_SALES_PERSONS: 'metadata-sales-persons',
  METADATA_ADOPS_PERSONS: 'metadata-ad-ops-persons',
  METADATA_ADVERTISERS: 'metadata-advertisers',
  META_DATA_AGENCIES: 'metadata-agencies',
  AUTH_MARKETPLACE_ACCESS: 'auth/marketplace-access',
};

export const CAMPAIGN_MODES = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const THEME_COLORS: { [key: string]: string } = {
  DISABLED: '#B1B9C5',
  ACTIVE: '#03F0A9',
  DRAFT: '#9ea7ad',
  PAUSE_INACTIVE: '#ffb302',
  FINISHED: '#2dccff',
  MISSING: '#FEC400',
  COMPLETED: '#03F0A9',
};

export const THEME_FONT_SIZE = {
  DEFAULT: '16px',
};

export const PAGE_TITLE = {
  MY_CAMPAIGN: 'My Campaigns',
  WATCHED_CAMPAIGN: 'Watched Campaigns',
  ACTION_LIST: 'Action List',
};

export const LOGOS: any = {
  // MARKETPLACE: marketplaceLogo,
  // XANDR: xandrLogo,
  // DV360: dv360Logo,
};

export const ACTION_ITEMS = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];

// export const DOMAINS = {
//   BUTELKA_DOMAINS: [
//     process.env.REACT_APP_BUTELKA_DOMAIN,
//     removeLastCharacter(process.env.REACT_APP_BUTELKA_DOMAIN || ''),
//   ],

//   MARKETPLACE_DOMAINS: [
//     process.env.REACT_APP_MARKETPLACE_DOMAIN,
//     removeLastCharacter(process.env.REACT_APP_MARKETPLACE_DOMAIN || ''),
//   ],
// };

export const POST_MESSAGE_IFRAME = {
  TYPE: 'retoken',
  CLEAR_SESSION: 'clear-session',
  RETOKEN: 'retoken',
  TARGET_ORIGIN: process.env.REACT_APP_MARKETPLACE_DOMAIN
};
