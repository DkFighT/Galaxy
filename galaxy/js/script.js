let field = document.getElementById('field');

let win_height = document.documentElement.clientHeight;
let win_width = document.documentElement.clientWidth;

let galaxys = []

field.addEventListener('mouseup', e => {
    let x = e.clientX;
    let y = e.clientY;

    if (galaxys.length + 1 > 10){
        let del_stars = document.querySelectorAll('.star');
        galaxys.splice(0, 10);
        for (let i = 0; i < del_stars.length; i++){
            del_stars[i].remove();
        }
    }

    let galaxy = new Galaxy(getRandom(1, 8), x, y);
    galaxy.create_galaxy();
    galaxys.push(galaxy);
})

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
        let radius = (this.num_ring * this.num_ring * 15 + 24) / 2 + this.#target.size / 2;
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
        field.insertAdjacentHTML(`beforeend`, `<div id="${this.name}" class="star"></div>`);
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
            this.#place.insertAdjacentHTML('afterbegin', `<div class="stars" id="star_${i}" style="height: ${size}px; width: ${size}px; top: ${getRandom(0, win_height)}px; left: ${getRandom(0, win_width)}px;"></div>`);
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

class Galaxy{
    constructor(quantity_planets, x, y){
        this.quantity_planets = quantity_planets;
        this.x = x;
        this.y = y;
    }
    create_galaxy = () => {
        let star = new Star(`Star ${getRandom(1, 10000)}`, getRandom(20, 150), 'star1', this.quantity_planets, this.x, this.y);
        star.set_params();
        for (let i = 0; i < this.quantity_planets; i++){
            let new_planet = new Planet(`Planet ${getRandom(1, 10000)}`, getRandom(10, 41), `type${getRandom(1, 6)}`, star, i + 1, `0.${getRandom(1, 5)}`);
            new_planet.set_params();
            new_planet.move();
        }
    }
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let stars = new Stars(500, field);
stars.create();
stars.setAnimation();