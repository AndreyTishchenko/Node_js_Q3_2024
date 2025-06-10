import Game from "../../classes/Game";
import crypto from 'crypto';
import {rooms, users, games} from  "../../database"
import WebSocketSend from "../ws/WsSend";
import Game_User from "../../classes/Game_User";
export default function createGame(roomId: string) {
    const room = rooms.get(roomId);
    if (!room) {
        throw new Error(`Room with id ${roomId} not found`);
    }

    const GameUsers = room.users;
    if (!GameUsers || GameUsers.length < 2) {
        throw new Error(`Not enough users in room ${roomId}`);
    }

    const game = new Game(crypto.createHash('md5').update(String(roomId)).digest('hex'));

    for (let i = 0; i < 2; i++) {
        const user = users.get(GameUsers[i].id);
        if (!user) {
            throw new Error(`User with id ${GameUsers[i].id} not found`);
        }
        const playerKey = crypto.createHash('md5').update(String(GameUsers[i].id)).digest('hex');
        let userProperties = {...user};
        game.players.set(playerKey, new Game_User(userProperties.index, userProperties.name, userProperties.ws_connection, userProperties.password, game.idGame));
    }

    game.players.forEach((value, key) => {
        if (value.ws_connection) {
            WebSocketSend(value.ws_connection, JSON.stringify({
                type: "create_game",
                data: JSON.stringify({
                    idGame: game.idGame,
                    idPlayer: key
                }),
                id: 0,
            }))
        }
    });
    
    games.set(game.idGame, game);
    
    /*
        [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
        ]
    */

    return game;
}