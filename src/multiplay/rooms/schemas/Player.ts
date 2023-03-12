import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {

    @type('string')
    id: string;

    position: { x: 0, y: 0, z: 0 };
    rotation: { x: 0, y: 0, z: 0 };

    @type('boolean')
    isAttacking: false;

    @type('string')
    username: string;

}

