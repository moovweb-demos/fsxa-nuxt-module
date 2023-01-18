import { FSXAModuleOptions as _FSXAModuleOptions } from "./module";
import {
  CustomRoute,
  CustomRouteHandler,
  MiddlewareOptions,
  MiddlewareContext,
} from "./api";
import { RemoteApiFilterOptions } from "fsxa-api";
import { Store } from "vuex";
export declare type FSXACustomRoute = CustomRoute;
export declare type FSXACustomRouteHandler = CustomRouteHandler;
export declare type FSXAMiddlewareOptions = MiddlewareOptions;
export declare type FSXAMiddlewareContext = MiddlewareContext;
export declare type FSXAModuleOptions = _FSXAModuleOptions;
/**
 * Client-specific access control configurations.
 *
 * @experimental
 */
export declare type ClientAccessControlConfig<ClientContexType> = {
  clientContextProvider: ClientAccessControlContextProvider<ClientContexType>;
};
export declare type ClientAccessControlContextProvider<ContextType> = (
  contextProviderParams: ClientContextProviderParams,
) => ContextType;
export interface ClientContextProviderParams {
  store: Store<any>;
}
/**
 * Server-specific access control configurations.
 *
 * @experimental
 */
export declare type ServerAccessControlConfig<ClientContextType> =
  RemoteApiFilterOptions<ClientContextType>;
