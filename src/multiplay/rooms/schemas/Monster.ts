import { Schema, type } from "@colyseus/schema";

export class Monster extends Schema {

    position: { x: 0, y: 0, z: 0};
    rotation: { x: 0, y: 0, z: 0};

    @type('boolean')
    isAttacking: false;
    
}

