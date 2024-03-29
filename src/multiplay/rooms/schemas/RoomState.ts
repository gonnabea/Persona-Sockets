import { Player } from "./Player";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { Ball } from "./Ball";
import { Chat } from "./Chat";

interface position {
    x: number,
    y: number,
    z: number
}

interface rotation {
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
        newPlayer.id = id;

        this.players.set(id, newPlayer);
        
    }

    createBall(id: string): void {
        const newBall = new Ball();
        newBall.id = id;

        this.balls.set(id, newBall);
    }

 

    setPlayerPosition(position: position, rotationZ: number, id:string): void {
        const player = this.players.get(id);

    
        player.positionX = position.x;
        player.positionY = position.y;
        player.positionZ = position.z;
        player.rotationZ = rotationZ;
       
    }

    setBallStatus(position: position, rotation: rotation, id:string): void {
        const ball = this.balls.get(id);

        ball.id = id;

        ball.positionX = position.x;
        ball.positionY = position.y;
        ball.positionZ = position.z;
        ball.rotationX = rotation.x;
        ball.rotationY = rotation.y;
        ball.rotationZ = rotation.z;
    }

    removePlayer(id: string): void {
  
        this.players.delete(id);
        
    }
}
