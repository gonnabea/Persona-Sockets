import { Schema, type } from "@colyseus/schema";

// 축구 점수 스키마
export class SoccerScore extends Schema {
    // id
    @type("string")
    id: string;

    // 첫번째 팀의 스코어
    @type("number")
    team1: number;

    // 두번째 팀의 스코어
    @type("number")
    team2: number;
}
