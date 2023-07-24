import { Schema, type } from "@colyseus/schema";

export class Ball extends Schema {
    @type("string")
    id: string;

    // 속도
    @type("number")
    linearVelocityX: number;

    @type("number")
    linearVelocityY: number;

    @type("number")
    linearVelocityZ: number;

    @type("number")
    angularVelocityX: number;

    @type("number")
    angularVelocityY: number;

    @type("number")
    angularVelocityZ: number;

    // 현재 위치
    @type("number")
    positionX: number;

    @type("number")
    positionY: number;

    @type("number")
    positionZ: number;

    // 마지막으로 공을 찬 유저의 세션 id
    @type("string")
    lastTouchedSessionId: string;
}
