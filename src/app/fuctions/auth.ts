import { redirectUnauthorizedTo, redirectLoggedInTo, hasCustomClaim,  } from '@angular/fire/auth-guard';


export const adminOnly = () => hasCustomClaim('admin');
export const redirectUnauthorized = () => redirectUnauthorizedTo('/signin');
export const redirectLoggedIn = () => redirectLoggedInTo('/dashboard');
export const belongsTo = (next) => hasCustomClaim(`${next.param.id}`);

