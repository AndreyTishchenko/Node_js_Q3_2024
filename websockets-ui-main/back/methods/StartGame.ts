import Game from '../classes/Game';
import fillMatrix from './fillMatrix'
export default function StartGame(game: Game) {
    let players = game.players;
    let players_array = Array.from(players.entries());
    const randomIndex = Math.floor(Math.random() * players_array.length);
    const [randomKey, randomValue] = players_array[randomIndex];
    players.forEach((player) => {
        fillMatrix(player);
        player.ws_connection?.send(JSON.stringify({
            type: "start_game",
            data:JSON.stringify(
            {
                ships: player.ships,
                currentPlayerIndex: player.gameId,
            }),
            id: 0,
        }));
    })
    players.forEach( (player) => {
        player.ws_connection?.send(JSON.stringify({
            type: "turn",
            data:JSON.stringify(
                {
                    currentPlayer: randomValue.gameId, /* id of the player in the current game session */
                }),
            id: 0,
        }));
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

