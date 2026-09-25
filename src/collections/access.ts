import type { Access } from "payload";

// Any logged-in admin user. Public writes go through server actions that call
// the Local API (which bypasses access control), never through the REST API.
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user);
