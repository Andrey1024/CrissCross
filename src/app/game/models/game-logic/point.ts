import { Point } from '../point.model';

export class PointImpl implements Point {
    constructor(public x: number, public y: number) { }

    static equal(a: Point, b: Point): boolean {
        return a.x == b.x && a.y == b.y;
    }

    static add(a: Point, b: Point): PointImpl {
        return new PointImpl(a.x + b.x, a.y + b.y);
    }

    static sub(a: Point, b: Point): PointImpl {
        return new PointImpl(a.x - b.x, a.y - b.y);
    }

    static isNeighbors(a: Point, b: Point): boolean {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) < 1.9;
    }

    static getNearby(point: Point, rad: number): Point[] {
        let result = [];
        for (let i = point.x - rad; i <= point.x + rad; i++) {
            for (let j = point.y - rad; j <= point.y + rad; j++) {
                result.push(new PointImpl(i, j));
            }
        }

        return result;
    }
}