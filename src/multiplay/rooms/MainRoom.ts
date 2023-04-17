import { Client, Room } from "colyseus";
import { Player } from "./schemas/Player";
import { RoomState } from "./schemas/RoomState";

export class MainRoom extends Room<RoomState> {
    maxClients = 10;

    onCreate(client: Client) {
        this.setState(new RoomState());

        this.onMessage("chat", (client, message) => {
            this.broadcast("chat", `(${client.sessionId}) ${message}`);
        });

        this.onMessage("player", (client, { position, rotation }) => {
            console.log(position, rotation);
            this.broadcast("player", {
                position, rotation,
            });
        });
    }

    onJoin(client: Client) {
        this.broadcast("chat", `${client.sessionId} has joined`);
  
        this.state.createPlayer(client.sessionId, client.id);
    }

    onLeave(client: Client) {
        this.broadcast("chat", `${client.sessionId} has left`);
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose MainRoom");
    }
}