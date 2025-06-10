export default function CheckWinning(matrix:Array<Array<number>>) {
    return !matrix.some(row => row.includes(1));
}