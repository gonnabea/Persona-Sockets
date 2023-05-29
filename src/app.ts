import express from "express";
import logger from "morgan";
import * as path from "path";
import { Server as ColyseusServer, LobbyRoom } from "colyseus";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes/index";
import { createServer } from "http";
import { MainRoom } from "./multiplay/rooms/MainRoom";
import cors from "cors";

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 5001);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use(cors());


app.use(errorNotFoundHandler);
app.use(errorHandler);

// colyseus game server
const gameServer = new ColyseusServer({
    server: createServer(app),
});

gameServer.listen(parseInt(process.env.PORT) || 5002).then(data => {
    console.log(data);
});

gameServer.define("main", MainRoom);
