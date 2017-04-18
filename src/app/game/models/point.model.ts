export class Point {
    constructor(public x: number, public y: number) { }

    static equal(a: Point, b: Point): boolean {
        return a.x == b.x && a.y == b.y;
    }

    static add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static sub(a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    static isNeighbors(a: Point, b: Point): boolean {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) < 1.9;
    }
}
