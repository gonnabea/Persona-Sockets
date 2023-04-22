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

        this.onMessage("move", (client, message) => {
            console.log(client.sessionId, message);
            this.state.setPlayerPosition({
                x: message.positionX,
                y: message.positionY,
                z: message.positionZ,
            }, message.rotationZ, client.id);
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };
            this.broadcast("move", msgWithSender);
        });

        // 유저 접속 시 
        this.onMessage("join", (client, message) => {
            this.broadcast(message);
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
