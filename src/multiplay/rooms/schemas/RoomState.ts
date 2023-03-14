import { Player } from "./Player";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { Ball } from "./Ball";
import { Chat } from "./Chat";

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

    removePlayer(id: string): void {
        this.players.forEach(player => {
            if (player.id === id) {
                this.players.delete(player.id);
            }
        });
    }
}
