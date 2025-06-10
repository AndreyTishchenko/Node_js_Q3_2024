import Game from "./classes/Game";
import Room from "./classes/Room";
import User from "./classes/User";

let users = new Map<string, User>(); // format of storage [ id: User]
let rooms = new Map<string, Room>(); // format of storage [ roomId: Room]
let games = new Map<string, Game>(); // format of storage [ gameId: Game]
let winners = new Map<string, {name: string, wins: number}>(); // format of storage [ gameId: winnerId]
winners.set("0", {name: "Misha", wins: 2});
winners.set("1", {name: "Kolya", wins: 0});
winners.set("2", {name: "Petya", wins: 9});
winners.set("3", {name: "Egor", wins: 10});
export { users, rooms, games, winners };