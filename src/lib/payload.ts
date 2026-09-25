import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

// Local API client for Server Components and server actions.
export const getPayloadClient = () => getPayload({ config });
