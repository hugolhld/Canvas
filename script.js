const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.width = 800
$canvas.height = 600

/* //Gariniture
context.beginPath()
context.moveTo(200, 200)
context.arc(200, 200, 100,0, Math.PI * 0.3, false) */


/* context.moveTo(200, 200)
context.lineTo(50, 50)
context.lineTo(50, 300) */
//context.closePath()


/* context.fillStyle = '#ff000055'
context.shadowOffsetX = 5
context.shadowOffsetY = 10
context.shadowBlur = 50
context.shadowColor = 'blue' */

/* context.lineWidth = 20
context.lineJoin = 'round'
context.lineCap = 'square'
context.stroke() */

/* context.fillStyle = 'orange'
context.fill()

//la croute
context.beginPath()
context.arc(200, 200, 100, 0, Math.PI * 0.3, false)

context.lineWidth = 12
context.lineCap = 'round'
context.strokeStyle = '#f1bd90'
context.stroke() */

//Faire un trou dans carré
/* context.fillRect(50, 50, 200, 100)
context.clearRect(50, 50, 50, 50) */

/* const text = 'lorem ipsum helloe '

context.fillText(text, 200, 200) */

//const image = document.createElement('img')

//Image
/* const image = new Image() // --> BEaucoup mieux

image.addEventListener('load', () =>{
    context.drawImage(image, 50, 50)
})

image.src = 'https://picsum.photos/400/300'
 */

 //Dessiner courbe de bézier

/* context.beginPath()
context.moveTo(50, 50)
context.bezierCurveTo(
    300,100,
    100,300,
    300, 300
)

context.stroke()

context.beginPath()
context.moveTo(50, 50)
context.quadraticCurveTo(
    300,100,
    300, 300
)

context.stroke() */

//Transparence

/* context.globalAlpha = 0.5
context.fillStyle = '#ff0000'
context.fillRect(50, 50, 200, 200)

context.fillStyle = '#00ff00'
context.fillRect(100, 100, 200, 200)

context.fillStyle = '#0000ff'
context.fillRect(150, 150, 200, 200)

 */

/* context.globalCompositeOperation = 'lighter'

context.fillStyle = '#ff0000'
context.fillRect(50, 50, 200, 200)

context.fillStyle = '#00ff00'
context.fillRect(100, 100, 200, 200)

context.fillStyle = '#0000ff'
context.fillRect(150, 150, 200, 200) */



/* 
context.beginPath()
context.moveTo(200, 200)
context.arc(200, 200, 100,0, Math.PI * 0.3, false) 


 context.moveTo(200, 200)
context.lineTo(50, 50)
context.lineTo(50, 300) 
context.closePath() */


/* const tick = () =>
{
    window.requestAnimationFrame(tick)

    context.clearRect(0, 0, $canvas.width, $canvas.height)

    ball.x += 5
    ball.y = -Math.abs(Math.sin(Date.now()*0.005)) *100 + 200

    if(ball.x > $canvas.width + ball.radius){
        ball.x = -ball.radius
    }

    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    context.fill()
}



tick() */

/* context.fillRect(200, 100, 25, 100)

context.fillStyle = 'grey'
context.fillRect(225, 100, 25, 100)

const ball = {x: 200, y: 200, radius: 10}
const ball2 = {x: 250, y: 200, radius: 10}


context.fillStyle = 'black'
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
context.arc(ball2.x, ball2.y, ball2.radius, 0, Math.PI * 2)

context.fill()

context.beginPath()
context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2) */

const ball = {x: 0, y: 0}
const ball2 = {x: 0, y: 0}
const mouse = { x: 0, y: 0}

window.addEventListener('mousemove', (event) => 
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

const loop = () =>
{
    window.requestAnimationFrame(loop)

    ball.x += ((mouse.x - ball.x)/3) *0.1
    ball2.x += ((mouse.x - ball.x)) *0.1
    ball.y += ((mouse.y - ball.y) / 3) *0.1
    ball2.y += (mouse.y - ball.y) * 0.09
    console.log(ball2)
    context.globalAlpha = 0.2
    context.fillStyle = '#fff'
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    context.beginPath()
    context.arc(ball.x, ball.y, 50, 0, Math.PI * 2)
    context.lineTo(ball.y, ball2.y)
    context.fillStyle = 'blue'
    //context.moveTo(ball.x, ball.y)
    /* context.globalAlpha = 1
    context.lineWidth   = 20
    context.lineCap     = 'round'  // round | butt | square
    context.lineJoin    = 'round'  // bevel | round | mitter
    context.strokeStyle = 'orange' */
    context.fill()
}

loop()

/* const boucle = () =>
{
    window.requestAnimationFrame(boucle)

    context.beginPath()
    context.moveTo(200, 200)
    context.lineTo(50, 300)
    context.lineWidth   = 20
    context.lineCap     = 'round'  // round | butt | square
    context.lineJoin    = 'round'  // bevel | round | mitter
    context.strokeStyle = 'orange'
    context.stroke()
}

boucle()
 */
