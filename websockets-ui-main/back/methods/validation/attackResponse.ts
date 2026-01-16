import WebSocketSend from "../ws/WsSend"
import Game from "../../classes/Game";
import Game_User from "../../classes/Game_User";
import CheckWinning from "./CheckWinning"
export default function attackResponse(shooterId: string, shootingPlayer:Game_User, targetPlayer:Game_User, targetField:Array<Array<number>>, x:number, y:number, game:Game) {
    const cell = targetField[y][x];

    if (cell === 2 || cell === 3) {
        return
    }

    if (cell === 0) {
        targetField[y][x] = 2;

        // Отправляем сообщение об атаке всем
        for (const [id, player] of game.players) {
            WebSocketSend(player.ws_connection!, JSON.stringify({
                type: "attack",
                data: JSON.stringify({
                    position: { x: x, y: y },
                    currentPlayer: shooterId,
                    status: "miss",
                }),
                id: 0,
            }));
            // Теперь узнаём ID targetPlayer
            let targetId: string | undefined;
            for (const [id, player] of game.players) {
                if (player === targetPlayer) {
                    targetId = id;
                    break;
                }
            }
        
            // console.log('отправить turn для:', targetId);
            // for (const [key, value] of game.players) {
            //     console.log(`${key}:`, value);
            // }
        
            WebSocketSend(player.ws_connection!, JSON.stringify({
                type: "turn",
                data: JSON.stringify({
                    currentPlayer: targetId,
                }),
                id: 0,
            }));
        }
    }else if(cell == 1){
        targetField[y][x] = 3;
        console.log("Клетка теперь стала 3, а ещё удар был сделан")
        // Отправляем сообщение об атаке всем
        for (const [id, player] of game.players) {
            WebSocketSend(player.ws_connection!, JSON.stringify({
                type: "attack",
                data: JSON.stringify({
                    position: { x: x, y: y },
                    currentPlayer: shooterId,
                    status: "shot",
                }),
                id: 0,
            }));
            // Теперь узнаём ID targetPlayer
            let targetId: string | undefined;
            for (const [id, player] of game.players) {
                if (player === targetPlayer) {
                    targetId = id;
                    break;
                }
            }
        
            // console.log('отправить turn для:', targetId);
            // for (const [key, value] of game.players) {
            //     console.log(`${key}:`, value);
            // }
            console.log(CheckWinning(targetField))
            if (CheckWinning(targetField)){
                console.log("ЗАКАНЧИВАЕМ!!!")
                WebSocketSend(player.ws_connection!,JSON.stringify({
                    type: "finish",
                    data:JSON.stringify(
                        {
                            winPlayer: shooterId, /* id of the player in the current game session */
                        }),
                    id: 0,
                }))
                return
            }
        
            WebSocketSend(player.ws_connection!, JSON.stringify({
                type: "turn",
                data: JSON.stringify({
                    currentPlayer: shooterId,
                }),
                id: 0,
            }));
        }
    }
}