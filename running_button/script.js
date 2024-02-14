import { Coord, Dimension, Bound, Pointer } from './modules/engine.js'

const FPS = 1000 / 60;

class HtmlElement {
    #element;

    get element() {
        return this.#element;
    }

    constructor(element) {
        this.#element = element;
    }
}

class Runner extends HtmlElement {
    #bound;
    #isMoving;

    get bound() {
        return this.#bound;
    }

    constructor(element, bound) {
        super(element);

        this.#bound = bound;

        this.#isMoving = false;
    }

    update(container) {
        const pointer = container.pointer;

        const minimumDistancePixels = 400;
        
        const distance = Math.sqrt(Math.pow(pointer.coord.x - this.#bound.center.x, 2) + Math.pow(pointer.coord.y - this.#bound.center.y, 2));
        const speed = 1000;
        
        if (distance < minimumDistancePixels) {
            const sin = (this.#bound.center.y - pointer.coord.y) / distance;
            const cos = (this.#bound.center.x - pointer.coord.x) / distance;

            let x = this.#bound.coord.x + cos * speed * FPS / 1000;
            let y = this.#bound.coord.y + sin * speed * FPS / 1000;

            if(x < 0)
                x = 0;
            if(x + this.#bound.dimension.width > container.bound.coord.x + container.bound.dimension.width)
                x = container.bound.coord.x + container.bound.dimension.width - this.#bound.dimension.width;
            if(y < 0)
                y = 0;
            if(y + this.#bound.dimension.height > container.bound.coord.y + container.bound.dimension.height)
                y = container.bound.coord.y + container.bound.dimension.height - this.#bound.dimension.height;

            this.#bound.coord = new Coord(x, y);

            this.draw();
        }
    }

    draw() {
        this.element.style.left = `${this.#bound.coord.x}px`;
        this.element.style.top = `${this.#bound.coord.y}px`;
    }
}

class Container extends HtmlElement {
    #bound;
    #pointer;
    #runners;

    get bound() {
        return this.#bound;
    }

    set bound(value) {
        this.#bound = value;
    }

    get pointer() {
        return this.#pointer;
    }

    constructor(element, bound) {
        super(element);

        this.#bound = bound;
        this.#pointer = new Pointer(new Coord(0, 0));
        this.#runners = [];

        this.#registerEvents();
    }

    handleMouseMove(e) {
        this.#pointer.coord.x = e.clientX;
        this.#pointer.coord.y = e.clientY;
    }

    addRunner(runner) {
        this.#runners.push(runner);
    }

    generateRandomPoint() {
        return new Coord(
            Math.floor(Math.random() * this.#bound.dimension.width) + this.#bound.coord.x,
            Math.floor(Math.random() * this.#bound.dimension.height) + this.#bound.coord.y,
        );
    }

    update() {
        this.#runners.forEach((runner) => { runner?.update(this); });
    }

    #registerEvents() {
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
}

function start() {
    const interactables = document.getElementsByClassName('interactable');

    const containers = [];

    for (const interactable of interactables) {
        const { x, y, width, height } = interactable.getBoundingClientRect();
        const bound = new Bound(new Coord(x, y), new Dimension(width, height));

        const container = new Container(interactable, bound);

        const fugitives = interactable.getElementsByClassName('fugitive');
        for (const fugitive of fugitives) {
            const { x, y, width, height } = fugitive.getBoundingClientRect();

            const runner = new Runner(fugitive, new Bound(container.generateRandomPoint(), new Dimension(width, height)));
            container.addRunner(runner);
        }
        
        containers.push(container);
    }

    setInterval(() => {
        containers.forEach((container) => {
            container.update();
        });
    }, 1000 / 60);
}

window.onload = start;