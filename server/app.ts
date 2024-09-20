import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "fs/promises";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { join, relative } from "path";
import api from "./api.js";

const app = new Hono();

const config = {
  indexHtml: "",
  publicPath: join(process.cwd(), "dist"),
};

//serve static files
app.use("*", serveStatic({ root: relative(process.cwd(), config.publicPath) }));

// log non static requests
app.use(logger());

app.route("/api", api);

//send index.html for all routes
app.get("/*", async (c) => {
  if (config.indexHtml) return c.html(config.indexHtml);

  try {
    const indexPath = join(config.publicPath, "index.html");
    config.indexHtml = await readFile(indexPath, "utf8");
    return c.html(config.indexHtml);
  } catch (error) {
    console.log(error);
    return c.text("Not Found", 404);
  }
});

export default app;
