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
            
            const position = {
                x: message.positionX,
                y: message.positionY,
                z: message.positionZ,
            };
            const rotationZ = message.rotationZ;
            this.state.setPlayerPosition(position, rotationZ, client.sessionId);
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };
            this.broadcast("move", msgWithSender);
        });

        this.onMessage("ballMove", (client, message) => {

            const position = {
                x: message.positionX,
                y: message.positionY,
                z: message.positionZ,
            };
            const rotation = {
                x: message.rotationX,
                y: message.rotationY,
                z: message.rotationZ,
            };
            this.state.setBallStatus(position, rotation, client.sessionId);
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };
            this.broadcast("ballMove", msgWithSender);
        });

        // 새로운 유저 접속 시 
        this.onMessage("join", (client, message) => {
            this.broadcast(message);
        });
    }

    onJoin(client: Client, payload: any) {
        console.log(payload);
        this.broadcast("join", payload.user);
        
        client.send("getSessionId", client.sessionId);
        this.state.createPlayer(client.sessionId, payload.user.username, payload.user.character, payload.user.email);
    }

    onLeave(client: Client) {
        this.broadcast("chat", `${client.sessionId} has left`);
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose MainRoom");
    }
}
