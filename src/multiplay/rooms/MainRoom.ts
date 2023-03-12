import { Client, Room } from "colyseus";
import { Player } from "./schemas/Player";
import { RoomState } from "./schemas/RoomState";

export class MainRoom extends Room<RoomState> {
    maxClients = 10;
    
    
    onCreate(client: Client) {
        this.setState(new RoomState());

        this.onMessage("chat", (client, data) => {
            console.log(client);
            console.log(data);
            this.broadcast(data);
        });
    }

    onJoin(client: Client) {
        this.state.createPlayer(client.sessionId, client.id);
    }

    onLeave(client: Client) {
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose MainRoom");
      }

    

}
