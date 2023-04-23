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
        console.log(id);
        this.players.forEach(player => {
            console.log(player.id);
            if(player.id === id) {
                console.log("player found: ", id);
                player.positionX = position.x;
                player.positionY = position.y;
                player.positionZ = position.z;
                player.rotationZ = rotationZ;
            }
        });
    }

    removePlayer(id: string): void {
        this.players.forEach(player => {
            if (player.id === id) {
                this.players.delete(player.id);
            }
        });
    }
}
