const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 448
canvas.height = 400


/* Variables de nuestro juego */
let counter = 0


/* Variables de la pelota */
const ballRadius = 6;

/* Posición de la pelota */
let x = canvas.width / 2
let y = canvas.height - 30

/* Velocidad de la pelota */
let dx = 2
let dy = -2

/* Variables de la paleta */

const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = (canvas.height - paddleHeight) - 10

function drawBall(){

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#e6a168';
    ctx.fill();
    ctx.closePath();

}
function drawPaddle(){

    ctx.fillStyle = '#09f'
    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight
    )

}

function drawBricks(){}

function collisionDetection(){}

function ballMovement(){
    //rebotes laterales
    if(
        x + dx > canvas.width - ballRadius || //pared derecha
        x + dx < ballRadius //pared izquierda
    ){
        dx = -dx
    }

    //rebote en la pared superior
    if(
        y + dy < ballRadius
    ){
        dy = -dy
    }

    //pelota toca el suelo
    if(y + dy > canvas.height - ballRadius){
        console.log('Game over')
        document.location.reload()
    }

    //mover la pelota
    x += dx
    y += dy
}

function paddleMovement(){}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width,canvas.height)

}


function draw(){
    
    cleanCanvas()

    drawBall()
    drawPaddle()
    drawBricks()
    collisionDetection()
    ballMovement()
    console.log('hola')
    window.requestAnimationFrame(draw)
}

draw()
