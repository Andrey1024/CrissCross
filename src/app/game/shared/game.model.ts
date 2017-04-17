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

export class Line {
    points: Point[] = [];

    get direction(): Point {
        return this.length > 1 ?
            Point.sub(this.points[1], this.points[0]) :
            new Point(0, 0);
    }

    get length() {
        return this.points.length;
    }

    constructor(first: Point) {
        this.points.push(first);
    }

    addPoint(point: Point): boolean {
        if (this.length == 1) {
            if (Point.isNeighbors(point, this.points[0])) {
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
}

export class CrissCoss {
    moves: Point[] = [];

    __winLine = null;

    get winLine() {
        return this.__winLine;
    }

    get crisses() {
        return this.moves.filter((v, i) => i % 2);
    }

    get crosses() {
        return this.moves.filter((v, i) => !(i % 2));
    }

    private neighbors(point: Point): Point[] {
        return this.lastPlayer == 0 ?
            this.crosses.filter(p => !Point.equal(point, p) && Point.isNeighbors(point, p)) :
            this.crisses.filter(p => !Point.equal(point, p) && Point.isNeighbors(point, p));
    }

    get lastPlayer(): number {
        return (this.moves.length - 1) % 2;
    }

    private lines: Line[][] = [[], []];

    constructor(public dimX: number, public dimY: number) { }

    private isEmpty(pos: Point): boolean {
        return !this.moves.find(v => v.x == pos.x && v.y == pos.y);
    }
    
    addMove(point: Point) {
        if (this.winLine) return;
        if (this.isEmpty(point)) {
            this.moves.push(point);
        }
        let added = this.lines[this.lastPlayer].filter(line => line.addPoint(point));
        this.__winLine = added.find(line => line.length == 5);
        if (this.winLine) return;
        this.neighbors(point).forEach(p => {
            if (added.every(line => !line.contains(p))) {
                let newLine = new Line(point);
                newLine.addPoint(p);
                this.lines[this.lastPlayer].push(newLine);
            }
        });
    }
}