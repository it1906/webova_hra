const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
let skoreText = document.getElementById("skoree");
let apple = document.getElementById("apple");
let kosik = document.getElementById("kosik");
let dramatic = new Audio('sound/drama.mp3');
let funny = new Audio('sound/fun.mp3');
let jabkoSpeed = 3;

class Jabka {
    static FILL_COLOR = "black";

    constructor(x, y, radius = 15, speed = 4) {
        this.z = Math.floor(Math.random() * (canvas.width));
        this.y = -10;
        this.img = new Image();
        this.img.src = 'img/apple.png';
    }
    move() {
        this.y += jabkoSpeed
    }

    obnov() {
        this.z = Math.floor(Math.random() * (canvas.width));
        this.y = -10;
    }

    draw() {
        ctx.drawImage(this.img, this.z, this.y);
    }
}

let kosicek = {
    y: canvas.height - 50,
    z: canvas.width / 2,



    move: function (i) {
        if (i === 1) {
            this.z -= 25;
        }
        else if (i === 2) {
            this.z += 25;
        }
    },


    paint: function () {
        ctx.drawImage(kosik, this.z, this.y);
    }
}

let audio = {
    hudba: "",

    vyber: function () {
        if (audio.hudba === "drama") {
            funny.pause();
            dramatic.play();
        }
        else if (audio.hudba === "fun") {
            funny.play();
            dramatic.pause();
        }
    },
    pause: function () {
        dramatic.pause();
        funny.pause();
    }
};
document.getElementById("startmusic").addEventListener('click', function () {
    audio.hudba = document.getElementById('fun').checked ? 'fun' : 'drama';
});

function animate() {
    requestAnimationFrame(animate);
    hra.paint();
}

document.body.addEventListener('keydown', function (event) {
    event.preventDefault();
    switch (window.event.keyCode) {
        case 37:
            {
                kosicek.move(1);
                break;
            }
        case 39:
            {
                kosicek.move(2);
                break;
            }
    }
});
let hra = {
    jablka: [],
    skore: 0,
    paint: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        kosicek.paint();
        this.jablka.forEach(function (obj, index) {
            obj.move();
            obj.draw();
            if (obj.y > canvas.height - 100) {
                if (obj.z + 25 > kosicek.z - 25 && obj.z + 25 < kosicek.z + 75) {
                    hra.skore++;
                    skoreText.innerHTML = hra.skore;
                    obj.obnov();
                }
            }
            if (obj.y > canvas.height + 25) {
                obj.obnov();
            }
        })
    }
}
animate();
hra.jablka.push(new Jabka());
setTimeout(function () { hra.jablka.push(new Jabka()); }, 5000);