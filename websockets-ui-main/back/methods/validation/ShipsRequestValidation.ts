import { games } from "../../database";
import StartGame from "../game/StartGame"
export default function ShipsRequestValidation(data:
    {
        gameId: string,
        ships: Array<{ position: { x: number, y: number }, direction: boolean, length: number, type: "small" | "medium" | "large" | "huge" }>
        indexPlayer: string, /* id of the player in the current game session */
    },
) {

    if (!(data.ships.filter((ship) => ship.type === "huge").length === 1)) {
        throw new Error("Invalid number of ships");
    }

    if (!(data.ships.filter((ship) => ship.type === "large").length === 2)) {
        throw new Error("Invalid number of ships");
    }

    if (!(data.ships.filter((ship) => ship.type === "medium").length === 3)) {
        throw new Error("Invalid number of ships");
    }

    if (!(data.ships.filter((ship) => ship.type === "small").length === 4)) {
        throw new Error("Invalid number of ships");
    }

    let game = games.get(data.gameId);
    if (game) {
        let player = game?.players.get(data.indexPlayer);
        if (game && game.players.size !== 0 && player !== undefined) {
            player.ships = data.ships;
            game.players.set(data.indexPlayer, player);
            if (game && game.players.size !== 0) {
                let players_with_ships = Array.from(game.players.values()).filter((player) => {
                    return player.ships.length !== 0;
                });
                if (players_with_ships.length === 2) {
                    StartGame(game);
                }
            }
        }
    }
}