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

        this.onMessage("move", (client, { position, rotation }) => {
            this.broadcast("move", {
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
