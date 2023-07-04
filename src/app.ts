import express from "express";
import logger from "morgan";
import * as path from "path";
import { Server as ColyseusServer, LobbyRoom } from "colyseus";
import { RedisDriver } from "@colyseus/redis-driver";
import { RedisPresence } from "@colyseus/redis-presence";
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import dotenv from 'dotenv';
// Routes
import { index } from "./routes/index";
import { createServer } from "http";
import { MainRoom } from "./multiplay/rooms/MainRoom";
import cors from "cors";

// Create Express server
export const app = express();

dotenv.config();
console.log('\u001b[31m', Number(process.env.NODE_APP_INSTANCE) + Number(process.env.PORT));

// Express configuration
if(process.env.NODE_APP_INSTANCE !== undefined) {
    app.set("port", Number(process.env.NODE_APP_INSTANCE) + Number(process.env.PORT));
}
else {
    app.set("port", process.env.PORT);

}

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
    presence: new RedisPresence({ name: 'my-game-one'}),
    driver: new RedisDriver(),

});
console.log(process.env);
console.log(process.env.PORT)
console.log(process.env.NODE_ENV)
if(process.env.NODE_APP_INSTANCE) {
    console.log('\u001b[31m', process.env.NODE_APP_INSTANCE);
    console.log('\u001b[31m', Number(process.env.PORT) + 2 + Number(process.env.NODE_APP_INSTANCE));

    gameServer.listen(Number(process.env.PORT) + 2 + Number(process.env.NODE_APP_INSTANCE)).then(data => {
        console.log(data);
    });

}
else {
    gameServer.listen(Number(process.env.PORT) + 2);

}


gameServer.define("main", MainRoom);
