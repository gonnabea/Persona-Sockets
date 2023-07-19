import { Client, Room } from "colyseus";
import { Player } from "./schemas/Player";
import { RoomState } from "./schemas/RoomState";

export class MainRoom extends Room<RoomState> {
    maxClients = 4;

    onCreate(client: Client) {
        this.setState(new RoomState());

        console.log(this.presence);

        this.onMessage("chat", (client, message) => {
            const user = this.state.players.get(client.sessionId);

            this.broadcast("chat", { ...user, chatMessage: message });
        });

        this.state.createBall("soccer_ball_1");

        this.onMessage("move", (client, message) => {
            const position = {
                x: message.positionX,
                y: message.positionY,
                z: message.positionZ,
            };
            const rotationZ = message.rotationZ;
            this.state.setPlayerPosition(position, rotationZ, client.sessionId);
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };
            this.broadcast("move", msgWithSender, { except: client });
        });

        this.onMessage("ballMove", (client, message) => {
            const linearVelocity = message.velocity;
            const angularVelocity = message.angularVelocity;

            this.state.setBallStatus(
                linearVelocity,
                angularVelocity,
                message.ballId,
            );
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };
            this.broadcast("ballMove", msgWithSender, { except: client });
        });

        this.onMessage("ballSync", (client, message) => {
            const position = message.position;

            this.state.setBallSync(position, message.ballId);
            const msgWithSender = {
                clientId: client.sessionId,
                message,
            };

            this.broadcast("ballSync", msgWithSender, { except: client });
        });

        // 새로운 유저 접속 시
        this.onMessage("join", (client, message) => {
            this.broadcast(message);
        });

        // 축구 점수측정 후 다른 클라이언트에 전달
        this.state.createScorrerScore("soccer_score_1");
        this.onMessage("soccerScore", (client, message) => {
            /*
                {
                    soccerScoreId: "string",
                    team: "team1" | "team2", // 스코어 지정할때만 (증가)
                    type: "increase" | "reset", // 만약 리셋이면 팀이름 안넘겨도됨.
                } 
             */

            // 축구 스코어 id가 있는지 확인 후 실행
            if (message.soccerScoreId) {
                // 점수 1점 추가
                if (message.team && message.type === "increase") {
                    this.state.increaseSoccerScore(
                        message.team,
                        message.soccerScoreId,
                    );
                }

                // 점수 초기화
                if (message.type === "reset") {
                    this.state.resetSoccerScore(message.soccerScoreId);
                }
            }

            const msgWithHeader = {
                clientId: client.sessionId,
                message: this.state.soccerScores.get(message.soccerScoreId),
            };

            this.broadcast("soccerScore", msgWithHeader);
        });
    }

    onJoin(client: Client, payload: any) {
        this.broadcast("join", payload.user);
        console.log(this.clients);
        console.log(this.clients[0].userData);

        this.clients[0].userData = {
            isOwner: true,
        };
        client.send("getSessionId", client.sessionId);
        this.state.createPlayer(
            client.sessionId,
            payload.user.username,
            payload.user.character,
            payload.user.email,
        );
    }

    onLeave(client: Client) {
        const userState = this.state.players.get(client.sessionId);

        this.broadcast("leave", userState);
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose MainRoom");
    }
}
