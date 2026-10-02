// Must match SESSION_COOKIE in apps/web/middleware.ts exactly — if these two
// strings ever drift apart, the frontend's route protection stops working
// even though the backend auth is fine.
export const SESSION_COOKIE = "recallai_session";