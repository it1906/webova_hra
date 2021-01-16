const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

let apple = document.getElementById("apple");
let kosik = document.getElementById("kosik");
let drama = new Audio("sound/drama.mp3");
let fun = new Audio("sound/fun.mp3");
let jabkoSpeed = 3;

let player = {
    x: canvas.width/2,
    y: 20,
    keys:[],

    move: function(){
        if(this.keys["ArrowRight"]){
            this.x +=50;
            console.log("prava");
        }
        if(this.keys['ArrowLeft']){
            this.x -=50;
        }
    },

    paint: function(){
        ctx.drawImage(kosik, this.x, this.y);
    },
}
let game = {

}