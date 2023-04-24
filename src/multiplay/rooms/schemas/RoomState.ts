import { Player } from "./Player";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { Ball } from "./Ball";
import { Chat } from "./Chat";

interface position {
    x: number,
    y: number,
    z: number
}

export class RoomState extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    @type({ map: Ball })
    balls = new MapSchema<Ball>();

    @type({ map: Chat })
    chats = new MapSchema<Chat>();

    createPlayer(id: string, username: string): void {
        const newPlayer = new Player();
        newPlayer.username = username;

        this.players.set(id, newPlayer);
    }

 

    setPlayerPosition(position: position, rotationZ: number, id:string): void {
        const player = this.players.get(id);

        player.id = id;
        player.positionX = position.x;
        player.positionY = position.y;
        player.positionZ = position.z;
        player.rotationZ = rotationZ;
       
    }

    removePlayer(id: string): void {
  
        this.players.delete(id);
        
    }
}
