import { Schema, type } from "@colyseus/schema";

export class Chat extends Schema {

    @type('string')
    createdAt: "";

    @type('string')
    username: "";

    @type('string')
    msg: null;

    
    
}

