import { Schema, type } from "@colyseus/schema";

export class Ball extends Schema {

    @type('string')
    id: string;

    @type('number')
    positionX: number;

    @type('number')
    positionY: number;

    @type('number')
    positionZ: number;

    @type('number')
    rotationX: number;

    @type('number')
    rotationY: number;

    @type('number')
    rotationZ: number;

    
}
