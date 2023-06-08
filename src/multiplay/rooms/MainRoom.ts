import { Client, Room } from "colyseus";
import { Player } from "./schemas/Player";
import { RoomState } from "./schemas/RoomState";

export class MainRoom extends Room<RoomState> {
    maxClients = 4;

    onCreate(client: Client) {
        this.setState(new RoomState());

        this.onMessage("chat", (client, message) => {
            this.broadcast("chat", `(${client.sessionId}) ${message}`);
        });

        this.state.createBall("soccer_ball_1");
        

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

           
        

            const velocity = {
                angularVelocity: message.angularVelocity,
                velocity: message.velocity,
            };
            this.state.setBallStatus(position, rotation, message.ballId);
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
        
        this.broadcast("join", payload.user);
        console.log(this.clients);
        console.log(this.clients[0].userData);
        
        this.clients[0].userData = { isOwner: true };     
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
