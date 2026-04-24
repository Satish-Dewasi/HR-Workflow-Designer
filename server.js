import express from "express";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// JSON Server middleware at /api
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*path}", (_, res) =>
  res.sendFile(path.join(__dirname, "dist", "index.html")),
);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
