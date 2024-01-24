import  path from "path";
import {fileURLToPath} from 'url';
import express from "express";
import connectToDB from "./utils/connectToDB.js";
// import {connect} from './utils/connectToDB.js'
import config from "./utils/config.js";
import authRouter from './routes/authRouter.js'
import userRouter from "./routes/userRouter.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors";
import inventoryRouter from "./routes/inventoryRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = config.MONGODB_URI;
const app = express();

connectToDB(MONGODB_URI);

// connect(config.MONGODB_URI)

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :body"));

// Serve static files for the entire application
app.use(express.static(path.join(__dirname, 'dist')));

// Your existing routes
// app.use("/users", userRouter);
// app.use("/inventory", inventoryRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/inventory", inventoryRouter);


// New route for InventoryPage
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.get("/dashboard", (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.get("/inventory", (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.get("/orders", (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

// 404 HANDLER
app.use('*', (req, res, next) => {
  res.status(404).send()
})

// ERROR HANDLING
app.use(function (err, req, res, next) {
  const message = err.raw?.message || err.message || err.sqlMessage || null
  const status = err?.status || err?.authResponse?.status() || 500

  console.error(err)
  log.create(message, err, req)

  return res.status(status).send({ message: message })
})

app.use(unknownEndpoint);
// app.use(errorHandler);

export default app;
