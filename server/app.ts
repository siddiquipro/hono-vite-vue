import { readFileSync } from "fs";
import { Hono } from "hono";
import { logger } from "hono/logger";
import path from "path";

const app = new Hono();

app.use(logger());

app.get("/api", (c) => {
  return c.json({ message: "Hello World" });
});

app.get("*", (c) => {
  const filePath = path.join(process.cwd(), "index.html");
  const html = readFileSync(filePath).toString();
  return c.html(html);
});

export default app;
