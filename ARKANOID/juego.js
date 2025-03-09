
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const $sprite = document.querySelector('#sprite')
const $bricks = document.querySelector('#bricks')


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
let dx = 4
let dy = -4

/* Variables de la paleta */

const PADDLE_SENSITIVITY = 8;

const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = (canvas.height - paddleHeight) - 10

let rightPressed = false
let leftPressed = false


/* Variable de los ladrillos */


const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}


for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [] //inicio con un array vacio
    for (let r = 0; r < brickRowCount; r++){

        // calculo posición del ladrillo en la pantalla
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop

        //asignar un color aleatorio a cada ladrillo
        const random = Math.floor(Math.random() * 8)

        //guardo la información de cada ladrillo
        bricks[c][r] = {
            x: brickX, 
            y:brickY, 
            status:BRICK_STATUS.ACTIVE,
            color:random
        }
    }
}




function drawBall(){

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#e6a168';
    ctx.fill();
    ctx.closePath();

}
function drawPaddle(){

    //ctx.fillStyle = '#09f'
    ctx.drawImage(
        $sprite, //imagen
        29, //clipX coordenada de recorte
        174, //clipYcoordenada de recorte
        paddleWidth,
        paddleHeight,
        paddleX, //coordenada x
        paddleY, //coordenada y
        paddleWidth, //ancho
        paddleHeight // largo del dibujo
    )

}

function drawBricks(){

    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            const currentBrick = bricks[c][r]
            if(currentBrick.status === BRICK_STATUS.DESTROYED)continue;

            const clipX = currentBrick.color * 32

            ctx.drawImage(
                $bricks,
                clipX,
                0,
                brickWidth, // 31
                brickHeight, // 14
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            )
        } 
    }
}

function collisionDetection(){

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r]
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

            const isBallSameXAsBrick =
            x > currentBrick.x &&
            x < currentBrick.x + brickWidth

            const isBallSameYAsBrick =
            y > currentBrick.y &&
            y < currentBrick.y + brickHeight

            if (isBallSameXAsBrick && isBallSameYAsBrick) {
            dy = -dy
            currentBrick.status = BRICK_STATUS.DESTROYED
            }
        }
    }

}

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

    //pelota toca la pala

    const isBallSameXAsPaddle = 
    x > paddleX &&
    x < paddleX + paddleWidth 

    const isBallTouchingPaddle = 
    y + dy > paddleY 

    if( isBallSameXAsPaddle && isBallTouchingPaddle ){
        dy = -dy //cambia la direccion de la pelota
    }

    else if( //pelota toca el suelo
        y + dy > canvas.height - ballRadius
    ){
        console.log('Game over')
        document.location.reload()
    }

    //mover la pelota
    x += dx
    y += dy
}

function paddleMovement(){

if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += PADDLE_SENSITIVITY
}else if(leftPressed && paddleX > 0){
    paddleX -= PADDLE_SENSITIVITY
}

}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width,canvas.height)

}

function initEvents(){
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

}

function keyDownHandler(event){
    const { key } = event
    if(  key === 'Right' || key === 'ArrowRight'){
        rightPressed = true
    }else if( key ==='left' || key === 'ArrowLeft'){
        leftPressed = true
    }
}

function keyUpHandler(event){
    const { key } = event
    if(  key === 'Right' || key === 'ArrowRight'){
        rightPressed = false
    }else if( key ==='left' || key === 'ArrowLeft'){
        leftPressed = false
    }
}



function draw(){
    
    cleanCanvas()

    drawBall()
    drawPaddle()
    drawBricks()

    collisionDetection()
    ballMovement()
    paddleMovement()

    console.log('hola')
    window.requestAnimationFrame(draw)
}

draw()
initEvents()
