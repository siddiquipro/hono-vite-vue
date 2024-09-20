import { Hono } from "hono";

const api = new Hono();

api.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

api.get("/home", (c) => {
  return c.json({ message: "Hello Home Page Again" });
});

api.get("/about", (c) => {
  return c.json({ message: "Hello About Page" });
});

api.get("/*", (c) => {
  c.status(404);
  return c.json({ message: "Not Found" });
});

export default api;
