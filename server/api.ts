import { Hono } from "hono";
import { logger } from "hono/logger";

const api = new Hono().basePath("/api");

api.use(logger());

api.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

api.get("/home", (c) => {
  return c.json({ message: "Hello Home" });
});

api.get("/about", (c) => {
  return c.json({ message: "Hello About" });
});

export default api;
