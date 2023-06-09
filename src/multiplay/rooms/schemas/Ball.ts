import { Schema, type } from "@colyseus/schema";

export class Ball extends Schema {

    @type('string')
    id: string;

    @type('number')
    linearVelocityX: number;

    @type('number')
    linearVelocityY: number;

    @type('number')
    linearVelocityZ: number;

    @type('number')
    angularVelocityX: number;

    @type('number')
    angularVelocityY: number;

    @type('number')
    angularVelocityZ: number;

    @type('number')
    positionX: number;

    @type('number')
    positionY: number;

    @type('number')
    positionZ: number;

    
}
