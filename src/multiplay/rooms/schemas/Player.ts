import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {

    @type('string')
    id: string;

    @type('number')
    positionX: number;

    @type('number')
    positionY: number;

    @type('number')
    positionZ: number;

    @type('number')
    rotationZ: number;

    @type('boolean')
    isAttacking: false;

    @type('string')
    username: string;

}

