import { Schema, type } from "@colyseus/schema";

export class Ball extends Schema {

    @type('number')
    positionX: number;

    @type('number')
    positionY: number;

    @type('number')
    positionZ: number;

    
}
