import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { importMap } from "./importMap";
import "@payloadcms/next/css";

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return RootLayout({ config, importMap, children, serverFunction });
}
