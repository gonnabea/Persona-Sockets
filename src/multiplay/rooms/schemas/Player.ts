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

    // 캐릭터 종류 (ex. Amy, Mutant 등)
    @type('string')
    character: string;

    @type('string')
    email: string;


}

