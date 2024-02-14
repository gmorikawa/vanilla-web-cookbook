class Coord {
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

class Pointer {
    #coord;

    get coord() {
        return this.#coord;
    }

    constructor(coord) {
        this.#coord = coord;
    }
}

class Runner {
    #coord;
    #element;

    get element() {
        return this.#element;
    }

    get coord() {
        return this.#coord;
    }

    constructor(element, coord) {
        this.#element = element;
        this.#coord = coord;
    }
}

function run(pointer, runner) {
    const minimumDistancePixels = 200;
    const distance = Math.sqrt(Math.pow(pointer.coord.x - runner.coord.x, 2) + Math.pow(pointer.coord.y - runner.coord.y, 2));

    if(distance < minimumDistancePixels) {
        const sin = (runner.coord.y - pointer.coord.y) / distance;
        const cos = (runner.coord.x - pointer.coord.x) / distance;

        const displacement = 10;

        return new Coord(runner.coord.x + cos * displacement, runner.coord.y + sin * displacement);
    } else {
        return runner.coord;
    }
}

function start() {
    const interactables = document.getElementsByClassName('interactable');
    for (const interactable of interactables) {
        const fugitives = interactable.getElementsByClassName('fugitive');

        for (const fugitive of fugitives) {
            fugitive.style.left = `${250}px`;
            fugitive.style.top = `${250}px`;
        }

        interactable.addEventListener('mousemove', (e) => {
            const fugitives = interactable.getElementsByClassName('fugitive');

            for (const fugitive of fugitives) {
                const { x, y } = fugitive.getBoundingClientRect();
                
                const runner = new Runner(fugitive, new Coord(x, y));
                const pointer = new Pointer(new Coord(e.clientX, e.clientY));

                const newCoords = run(pointer, runner);

                fugitive.style.left = `${newCoords.x}px`;
                fugitive.style.top = `${newCoords.y}px`;
            }
        });

    }
}

window.onload = start;