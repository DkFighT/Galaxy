let field = document.getElementById('field');

class Planet{
    #planet;
    #target;
    constructor(name, size, type, target, num_ring, speed){
        this.name = name;
        this.size = size;
        this.type = type;
        this.#target = target;
        this.num_ring = num_ring;
        this.speed = speed;
        this.#planet;
    }
    set_params = () => {
        document.getElementById(this.#target.name).insertAdjacentHTML(`beforeend`, `<div id="${this.name}" data-title="${this.name}" class="type"></div>`);
        this.#planet = document.getElementById(this.name);
        this.#planet.style.height = `${this.size}px`;
        this.#planet.style.width = `${this.size}px`;
        this.#planet.classList.add(this.type);
    }
    move = () => {
        let radius = (this.num_ring * this.num_ring * 15) / 2 + this.#target.size / 2 + 10;
        let rotate = 0;
        let alpha = this.speed * Math.PI / 180;
        setInterval(()=>{
            rotate += alpha;
            this.#planet.style.top = `${(this.#target.size / 2) + radius * Math.cos(rotate)}px`;
            this.#planet.style.left = `${(this.#target.size / 2) + radius * Math.sin(rotate)}px`;
            this.#planet.style.transform = `rotate(${rotate * 180 / Math.PI * -1 - 90}deg)`;
        }, this.speed);
    }
}

class Star extends Planet{
    constructor(name, size, type, num_rings, x, y){
        super(name, size, type);
        this.num_rings = num_rings;
        this.x = x;
        this.y = y;
        field.insertAdjacentHTML(`beforeend`, `<div id="${this.name}"></div>`);
    }
    set_params = () => {
        let star = document.getElementById(this.name);
        star.style.height = `${this.size}px`;
        star.style.width = `${this.size}px`;
        star.classList.add(this.type);
        star.style.top = `${this.y}px`;
        star.style.left = `${this.x}px`;

        for (let i = 1; i <= this.num_rings; i++){
            star.insertAdjacentHTML('beforeend', `<div id="ring_${i}" class="ring" style="width: ${i * i * 15 + this.size + 20}px; height: ${i * i * 15 + this.size + 20}px; top: 50%; left: 50%;"></div>`);
        }
    }
}

class Stars{
    #place;
    constructor(count, place){
        this.count = count;
        this.#place = place;
    }
    create = () => {
        for (let i = 0; i < this.count; i++){
            let size = getRandom(1, 3);
            this.#place.insertAdjacentHTML('afterbegin', `<div class="stars" id="star_${i}" style="height: ${size}px; width: ${size}px; top: ${getRandom(0, document.documentElement.clientHeight)}px; left: ${getRandom(0, document.documentElement.clientWidth)}px;"></div>`);
        }
    }
    setAnimation = () => {
        setInterval(()=>{
            let rnd = getRandom(0, 2);
            if (rnd == 1){
                document.getElementById('star_' + getRandom(0, 500)).style.opacity = '.3';
            }
            else{
                document.getElementById('star_' + getRandom(0, 500)).style.opacity = '1';
            }
        }, 1);
    }
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let star1 = new Star('Star 1', 100, 'star1', 7, 500, 400);
star1.set_params();

let planet1 = new Planet('Planet_1', 30, 'type1', star1, 5, 0.1);
planet1.set_params();
planet1.move();

let stars = new Stars(500, field);
stars.create();
stars.setAnimation();