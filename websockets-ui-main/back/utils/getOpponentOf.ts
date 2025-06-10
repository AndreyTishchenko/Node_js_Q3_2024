import Game_User from "../classes/Game_User";
export default function getOpponentOf(map: Map<string, Game_User>, shooterId: string): Game_User | undefined {
  for (const [id, player] of map.entries()) {
    if (id !== shooterId) return player;
  }
}