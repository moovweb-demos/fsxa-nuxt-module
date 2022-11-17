import { Module } from "@nuxt/types";
import { LogLevel } from "fsxa-api";
/**
 * @member apiAccessControl - Settings for API access control (EXPERIMENTAL)
 * @member apiAccessControl.client - Optional path to file that exports {@link ClientAccessControlConfig ClientAccessControlConfig} (EXPERIMENTAL)
 * @member apiAccessControl.server - Optional path to file that exports {@link ServerAccessControlConfig ServerAccessControlConfig} (EXPERIMENTAL)
 * @member fsTppVersion DEPRECATED: use `FSXA_SNAP_URL` instead {@link https://github.com/e-Spirit/fsxa-pattern-library/#snap-url}
 */
export interface FSXAModuleOptions {
  components?: {
    sections?: string;
    layouts?: string;
    richtext?: string;
    appLayout?: string;
    page404?: string;
    loader?: string;
    devModeInfo?: string;
  };
  maxReferenceDepth?: number;
  logLevel?: LogLevel;
  defaultLocale: string;
  devMode?: boolean;
  useErrorBoundaryWrapper?: boolean;
  customRoutes?: string;
  fsTppVersion?: string;
  enableEventStream?: boolean;
  apiAccessControl?: {
    server?: string;
    client?: string;
  };
}
declare const FSXAModule: Module<FSXAModuleOptions>;
export default FSXAModule;
export declare const meta: any;
