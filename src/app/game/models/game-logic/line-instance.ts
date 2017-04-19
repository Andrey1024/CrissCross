import { Point } from './point-instance';

export class Line {
    points: Point[] = [];

    get direction(): Point {
        return this.length > 1 ?
            Point.sub(this.points[1], this.points[0]) :
            new Point(0, 0);
    }

    get directionString() {
        let direction = this.direction;
        return `${direction.x},${direction.y}`;
    }

    get length() {
        return this.points.length;
    }

    constructor(first: Point) {
        this.points.push(first);
    }

    addPoint(point: Point): boolean {
        if (this.length == 1) {
            if (Point.equal(point, this.first)) {
                return false;
            } else if (Point.isNeighbors(point, this.points[0])) {
                this.points.push(point);
                this.normalize();
                return true;
            } else {
                return false;
            }
        } else if (Point.equal(Point.sub(this.first, point), this.direction)) {
            this.points.unshift(point);
            return true;
        } else if (Point.equal(Point.sub(point, this.last), this.direction)) {
            this.points.push(point);
            return true;
        } else {
            return false;
        }
    }

    normalize() {
        let dir = this.direction;
        if (Point.equal(dir, new Point(-1, 1)) || dir.x + dir.y < 0) {
            this.points.reverse();
        }
    }

    contains(point: Point): boolean {
        return this.points.findIndex(p => Point.equal(point, p)) !== -1;
    }

    get first(): Point {
        return this.points[0];
    }

    get last(): Point {
        return this.points[this.length - 1];
    }

    static merge(...line: Line[]): Line {
        let sum = line[0].points.concat(...line[1].points).sort((a, b) => a.y - b.y).sort((a, b) => a.x - b.x);
        let retLine = new Line(sum[0]);
        sum.slice(1).forEach(point => retLine.addPoint(point));
        return retLine;
    }
}