import express from "express";
import { FSXAApiErrors } from "fsxa-api";
import getExpressRouter from "fsxa-api/dist/lib/integrations/express";
require("cross-fetch/polyfill");
const generateSitemap = async (fsxaAPI, req, res) => {
  const host = [req.protocol, "://", req.headers.host].join("");
  try {
    const response = await fsxaAPI.fetchNavigation({
      locale: req.params.language,
    });
    const locations = Object.keys(response.seoRouteMap);
    res.set("Content-Type", "text/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset>
    ${locations
      .map(
        (location) => `
    <url><loc>${host}${location}</loc></url>
`,
      )
      .join("\n")}
  </urlset>`);
  } catch (err) {
    if (err.message === FSXAApiErrors.NOT_FOUND) {
      res.status(404).json({
        error: err.message,
      });
    }
    if (err.message === FSXAApiErrors.UNKNOWN_ERROR) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
const createMiddleware = (options, api) => {
  const middleware = (req, res, next) => {
    const app = express();
    app.set("trust proxy", true);
    app.use("/fsxa", getExpressRouter({ api }));
    (options.customRoutes || []).forEach((customRoute) => {
      app.use(customRoute.route, (req, res, next) => {
        customRoute.handler({ fsxaAPI: api }, req, res, next);
      });
    });
    app.use("/sitemap/:language", (req, res) => generateSitemap(api, req, res));
    return app(req, res, next);
  };
  return middleware;
};
export default createMiddleware;
// eslint-disable-next-line
export const meta = require("./../../package.json");
