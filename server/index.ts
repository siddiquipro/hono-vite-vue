import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";
import { join, relative } from "path";
import { readFileSync } from "fs";
import api from "./api.js";

const app = new Hono();

const config = {
  port: Number(process.env.PORT || 3000),
  outDir: "dist",
  indexHtml: "",
};

const getDistPath = () => {
  const dirPath = relative(process.cwd(), import.meta.dirname);
  const relativePath = join(dirPath, config.outDir);
  return relativePath;
};

const getIndexHtml = () => {
  if (config.indexHtml) return config.indexHtml;
  const indexFullPath = join(import.meta.dirname, config.outDir, "index.html");
  config.indexHtml = readFileSync(indexFullPath, "utf8");
  return config.indexHtml;
};

//serve static files
app.use("/*", serveStatic({ root: getDistPath() }));

//serve api
app.route("/", api);

//send index.html for all routes
app.get("/*", async (c) => {
  const filePattern = /\/[^\/]+\.[a-zA-Z0-9]+$/;
  if (!filePattern.test(c.req.url)) return c.html(getIndexHtml());
  throw new HTTPException(404, { message: "Not Found!" });
});

serve({ fetch: app.fetch, port: config.port }, (info) => console.log(`Server running on http://localhost:${info.port} `));
