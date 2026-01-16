import Game from '../../classes/Game';
import fillMatrix from './fillMatrix'
import WebSocketSend from '../ws/WsSend';
export default function StartGame(game: Game) {
    let players = game.players;
    let players_array = Array.from(players.entries());
    const randomIndex = Math.floor(Math.random() * players_array.length);
    const [randomKey, randomValue] = players_array[randomIndex];
    randomValue.your_turn = true;
    players.forEach((player) => {
        fillMatrix(player);
        if(player.ws_connection){
            WebSocketSend(player.ws_connection, JSON.stringify({
                type: "start_game",
                data:JSON.stringify(
                {
                    ships: player.ships,
                    currentPlayerIndex: randomKey,
                }),
                id: 0,
            }));
        }
    })
    players.forEach( (player) => {
        if(player.ws_connection){
            WebSocketSend(player.ws_connection, JSON.stringify({
                type: "turn",
                data:JSON.stringify(
                    {
                        currentPlayer: randomKey, /* id of the player in the current game session */
                    }),
                id: 0,
            }));
        }
    })
}

/*
  1,1,1,0,0,0,0,1,0,0,
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,
  1,0,1,1,0,1,0,1,0,1,
  0,0,0,0,0,0,0,1,0,0,
  0,0,0,0,0,0,0,1,0,0,
  0,0,0,0,0,0,0,1,0,0,
  0,0,0,1,1,0,0,0,0,0,
  1,1,0,0,0,0,0,0,0,0,
  0,0,0,1,1,1,0,0,0,0,
*/

