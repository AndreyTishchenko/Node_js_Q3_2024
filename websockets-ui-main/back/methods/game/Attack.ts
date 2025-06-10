import { games } from "../../database";
import getOpponentOf from "../../utils/getOpponentOf";
import WebSocketSend from "../ws/WsSend";
import attackResponse from "../validation/attackResponse"
interface attackData {
    gameId: number | string;
    x: number;
    y: number;
    indexPlayer: number | string;
}

export default function attackHandler(data: attackData) {
    const game = games.get(String(data.gameId));
    if (!game) throw new Error("Game not found");

    const shooterId = String(data.indexPlayer);
    const shootingPlayer = game.players.get(shooterId);
    const targetPlayer = getOpponentOf(game.players, shooterId);
    if (!shootingPlayer || !targetPlayer) throw new Error("Invalid players");

    const targetField = targetPlayer.matrix;
    attackResponse(shooterId, shootingPlayer, targetPlayer, targetField, data.x, data.y, game)
}
