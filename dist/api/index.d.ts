import { Request, Response, NextFunction } from "express";
import { FSXARemoteApi } from "fsxa-api";
import { ServerMiddleware } from "@nuxt/types";
export interface MiddlewareContext {
  fsxaAPI: FSXARemoteApi;
}
export declare type CustomRouteHandler = (
  context: MiddlewareContext,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
export interface CustomRoute {
  route: string;
  handler: CustomRouteHandler;
}
export interface MiddlewareOptions {
  customRoutes?: CustomRoute[];
}
declare const createMiddleware: (
  options: MiddlewareOptions,
  api: FSXARemoteApi,
) => ServerMiddleware;
export default createMiddleware;
export declare const meta: any;
