import { PointImpl } from './point';
import { Line } from '../line.model'

export class LineImpl implements Line {
    points: PointImpl[] = [];

    get direction(): PointImpl {
        return this.length > 1 ?
            PointImpl.sub(this.points[1], this.points[0]) :
            new PointImpl(0, 0);
    }

    get directionString() {
        let direction = this.direction;
        return `${direction.x},${direction.y}`;
    }

    get length() {
        return this.points.length;
    }

    constructor(first?: PointImpl) {
        this.points.push(first);
    }

    addPoint(point: PointImpl): boolean {
        if (this.length == 1) {
            if (PointImpl.equal(point, this.first)) {
                return false;
            } else if (PointImpl.isNeighbors(point, this.points[0])) {
                this.points.push(point);
                this.normalize();
                return true;
            } else {
                return false;
            }
        } else if (PointImpl.equal(PointImpl.sub(this.first, point), this.direction)) {
            this.points.unshift(point);
            return true;
        } else if (PointImpl.equal(PointImpl.sub(point, this.last), this.direction)) {
            this.points.push(point);
            return true;
        } else {
            return false;
        }
    }

    private normalize() {
        let dir = this.direction;
        if (PointImpl.equal(dir, new PointImpl(-1, 1)) || dir.x + dir.y < 0) {
            this.points.reverse();
        }
    }

    contains(point: PointImpl): boolean {
        return this.points.findIndex(p => PointImpl.equal(point, p)) !== -1;
    }

    get first(): PointImpl {
        return this.points[0];
    }

    get last(): PointImpl {
        return this.points[this.length - 1];
    }

    static merge(...line: LineImpl[]): LineImpl {
        let sum = line[0].points.concat(...line[1].points).sort((a, b) => a.y - b.y).sort((a, b) => a.x - b.x);
        let retLine = new LineImpl(sum[0]);
        sum.slice(1).forEach(point => retLine.addPoint(point));
        return retLine;
    }
}