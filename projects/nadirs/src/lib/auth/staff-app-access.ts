/** Mirrors server <see cref="StaffAppAccessInfo"/> from GET /api/auth/me. */
export interface StaffAppAccessInfo {
  canUseAdmin: boolean;
  canUsePos: boolean;
  canUseInventory: boolean;
  homeUrl: string;
}

export const MANAGE_LOGIN_URL = '/manage/login';

/** After sign-out or session loss, return to shared staff login. */
export function redirectToManageLogin(): void {
  window.location.assign(MANAGE_LOGIN_URL);
}

/** When the current app is not allowed, send user to their home app. */
export function redirectToStaffHome(access: StaffAppAccessInfo): void {
  window.location.assign(access.homeUrl || MANAGE_LOGIN_URL);
}
