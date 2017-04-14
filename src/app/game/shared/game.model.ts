export class Point {
    constructor(public x: number, public y: number) {}
}

export class CrissCoss {
    moves: Point[] = [];
    
    constructor(public dimX: number, public dimY: number) {}
}