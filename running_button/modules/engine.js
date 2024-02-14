export class Coord {
    #x;
    #y;

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Dimension {
    #width;
    #height;

    get width() {
        return this.#width;
    }

    set width(value) {
        this.#width = value;
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        this.#height = value;
    }

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }
}

export class Bound {
    #coord;
    #dimension;

    get coord() {
        return this.#coord;
    }

    set coord(value) {
        this.#coord = value;
    }

    get dimension() {
        return this.#dimension;
    }

    set dimension(value) {
        this.#dimension = value;
    }

    get center() {
        return new Coord(
            this.#dimension.width / 2 + this.#coord.x,
            this.#dimension.height / 2 + this.#coord.y,
        );
    }

    constructor(coord, dimension) {
        this.#coord = coord;
        this.#dimension = dimension;
    }
}

export class Pointer {
    #coord;

    get coord() {
        return this.#coord;
    }

    constructor(coord) {
        this.#coord = coord;
    }
}