const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

const btnPlay = document.querySelector('.form__play')
const pauseBtn = document.querySelector('.pause__game')
const pauseImg = document.querySelector('.pause__game img')
const mainContainer = document.querySelector('.main__container')
const menuPause = document.querySelector('.menu__pause')
const tabPause = ['img/pause.svg', 'img/close.svg']
const playBtn = document.querySelector('.form__play')


$canvas.width = window.innerWidth
$canvas.height = window.innerHeight


let ball
let ballsBot = []
let botAnim = []
let randomXYR = {x: 0, y:0, r:32}
let randomColor
let mouseMap = {x: 0, y: 0}
let counter = 1
let oldPosition = {x: 0, y: 0}
let nicknameDiv  = document.querySelector('.submit').innerHTML
let btnSettings = document.querySelectorAll('.settings__btn')
let menuSettings = document.querySelectorAll('.menu__settings_main')
let windwoLoadCounter = 0
let indexPause = 0

// On load le jeu se lance et la page de "connection" aussi

window.addEventListener('load', () =>
{
    if(windwoLoadCounter == 0)
    {
        drawGame()

        mainContainer.classList.toggle('active__container')
        $canvas.classList.toggle('canvas__paused')
        windwoLoadCounter +=1
    }
})


playBtn.addEventListener('click', () =>
{
    nicknameDiv  = document.querySelector('.submit').value
    ball.nickname = nicknameDiv
    
    mainContainer.classList.toggle('active__container')
    $canvas.classList.toggle('canvas__paused')
})

//Boutton pour activer le menu pause

pauseBtn.addEventListener('click', () =>
{
    const container = menuPause.children[0]
    menuPause.classList.toggle('active__container')
    container.classList.toggle('active__container')

    $canvas.classList.toggle('canvas__paused')

    indexPause += 1
    
    if(indexPause > 1)
    {
        indexPause = 0
    }
    pauseImg.src = tabPause[indexPause]
})

for(let i = 0; i < btnSettings.length; i++)
{
    btnSettings[i].addEventListener('click', () =>
    {
        menuSettings[i].classList.toggle('settings__open')
        menuSettings[i].classList.toggle('settings__closed')
    })
}

//Function pour crée autant de balles que souahitez ainsi que pas mal de mécanismes

 function Ball(x,y,r,c,m, nickname, borderBall)
 {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.m = m
    this.mouse = {x: 0, y: 0}
    this.speedX = 5
    this.speedY = 5
    this.botXL = true
    this.nickname  = nickname
    this.borderBall = borderBall
    this.oldPosition = {x: 0, y: 0}
    this.center = 90
    this.border = 50
    this.colorValue = Math.random() * 360


    //Coord de la souris
    this.mouseEvent = function()
    {
        window.addEventListener('mousemove', (event) => 
            {
                this.mouse.x = event.clientX
                this.mouse.y = event.clientY
            })
    }

    //Couleur aléatoire
    if(this.c == randomColor)
    {
        this.c = `hsl(${this.colorValue}deg, 100%, ${this.center}%)`
        this.cBorder= `hsl(${this.colorValue}deg, 100%, ${this.border}%)`
    }

    this.mouseEvent()
   

    //Les coord se mettent a jour que sa soit des bots ou non
    this.ballUpdate = function()
    {
        
        const drawCanvas = () =>
        {
                if(this.m == true)
                {
                    $canvas.addEventListener('mousemove', (event) => 
                    {
                        this.mouse.x = event.clientX
                        this.mouse.y = event.clientY
                    })
                        this.x += ((this.mouse.x - this.x)/3) *0.1
                        this.y += ((this.mouse.y - this.y) / 3) *0.1
                }else
                {
                    if(this.mouse.x + ($canvas.width / 3) > $canvas.width || this.mouse.x + ($canvas.width / 3) < $canvas.width )
                    {       
                        this.x -= (this.mouse.x - this.oldPosition.x)
                        this.oldPosition.x = this.mouse.x
                    }
                    if(this.mouse.y + ($canvas.width / 3) > $canvas.width || this.mouse.y + ($canvas.width / 3) < $canvas.width )
                    {       
                        this.y -= (this.mouse.y - this.oldPosition.y)
                        this.oldPosition.y = this.mouse.y
                    }
                }
            this.drawBall()            
        }
        drawCanvas()
    }

    //Dessin de la balle avec ses bordures
    this.drawBall = function() 
    {
        if(this.borderBall == true)
        {
            context.beginPath()
            context.fillStyle =  this.cBorder
            context.arc(this.x, this.y, this.r *1.1, 0, Math.PI *2)
            context.fill()
        }
        context.beginPath()
        context.fillStyle =this.c
        context.arc(this.x, this.y, this.r, 0, Math.PI *2)


        context.fill()

        if(this.nickname != undefined || this.m == true)
        {
            context.font = '25px Helvetica'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillStyle = '#2e2e2e'
            context.fillText(this.nickname, this.x, this.y)
            context.fillText(Math.round(this.r), this.x, this.y * 1.15)
        }
    }

    //Pour detecter que les balles sont proches
    this.collision = function(ball, ball2, radius)
    {

        this.ball = ball
        this.ball2 = ball2
        this.radius = radius
        this.radius = false

        this.circle1 = {radius: this.ball.r, x: $canvas.width/2+this.ball.x, y: $canvas.height/2+this.ball.y}
        this.circle2 = {radius: this.ball2.r, x: $canvas.width/2+this.ball2.x, y: $canvas.height/2+this.ball2.y}
        
        this.dx = this.circle1.x - this.circle2.x
        this.dy = this.circle1.y - this.circle2.y
        
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy)

        if(this.radius = true)
        {
            if(this.distance < (this.circle1.radius + this.circle2.radius) - (this.circle2.radius / 2))
            {
                if(this.circle1.radius > this.circle2.radius)
                {
                    this.sum = Math.PI * this.circle1.radius * this.circle1.radius + Math.PI * this.circle2.radius * this.circle2.radius

                    this.r = Math.sqrt(this.sum / Math.PI)
                    return true
                }else {
                    return false
                }
            } 
        }
    }
 }





window.addEventListener('mousemove', (event) =>
{
    mouseMap.x = event.clientX    
    mouseMap.y = event.clientY
})

//Pour setup la partie, la ball, les bots ...

function setupGame()
{
    ball = new Ball(window.innerWidth / 2,window.innerHeight  / 2,32,randomColor, true, nicknameDiv, true)
    oldPosition.x = ball.x
    oldPosition.y = ball.y

    for(let i = 0; i < 500; i++)
    {
        let x = Math.random() * 5000
        let y = Math.random() * 5000

        ballsBot[i] = new Ball(x,y, 16, randomColor, false, undefined)
    }

    for(let i =0; i < 40; i++)
    {
        const botAnimElement = new Ball(Math.random() * 3000, Math.random() * 3000, Math.random() * 50,  randomColor, false, undefined, true)
        botAnim.push(botAnimElement)
    }
}

//Pour que les bots animés puissent avoir une direction à prendre

function randomDirection()
{
    window.requestAnimationFrame(randomDirection)
    const friction = 0.05

    for(const ballSelect of botAnim)
    {
        ballSelect.y += ballSelect.speedY
        ballSelect.x += ballSelect.speedX

        if(ballSelect.y > $canvas.height *2 - ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = $canvas.height *2  - ballSelect.r
        }

        if(ballSelect.y < ballSelect.r)
        {
            ballSelect.speedY *= - (1 - friction)
            ballSelect.y = ballSelect.r
        }

        if(ballSelect.x > $canvas.width *2 - ballSelect.r)
        {
            ballSelect.speedX *= - (1 - friction)
            ballSelect.x = $canvas.width *2 - ballSelect.r
        }

        if(ballSelect.x < ballSelect.r)
        {
            ballSelect.speedX *= - (1 - friction)
            ballSelect.x = ballSelect.r
        }
        ballSelect.drawBall()
    }
}

function resizeMap(w,h)
{
    $canvas.width = w
    $canvas.height = h
}

window.addEventListener("resize", ()=> {
    resizeMap(window.innerWidth, window.innerHeight)
})

const settingsMenu= document.querySelector('.menu__settings_main ')
let mainContainerMenu = document.querySelectorAll('.main__container')
const winMenu = document.querySelector('.menu__win')
let color1 = '#fafafa'
let colorDark= '#2e2e2e'

const test123 = document.querySelector('.menu__settings_main').children

//function pour le mode sombre / jour

function darkMode()
{ 
    function setColor(color, color2)
    {
        for(let i = 0; i < mainContainerMenu.length; i++)
        {
        mainContainerMenu[i].style.color = color2
        mainContainerMenu[i].style.background = color
        mainContainerMenu[i].style.border = `1px solid ${color2}`
        }

        for(const btn of test123)
        {
            btn.style.border = `1px solid ${color2}`
        }

        winMenu.style.color = color2
        winMenu.style.background = color
        winMenu.style.border = `1px solid ${color2}`
    }

    for(let i = 0; i < test123.length; i++)
    {
            test123[i].addEventListener('click', () =>
            {
                console.log(test123[i])
            if(i == 0)
            {
                color1= '#fafafa'
                colorDark = '#2e2e2e'
            }
            if(i == 1)
            {
                color1= '#2E2E2E'
                colorDark = '#fafafa'
            }
            setColor(color1, colorDark)
        })
    }
}

//Tout ce qui est en rapport avec l'arrière plan ainsi que les fonctions pour que les balles se mangent 

function setCanvasBg() 
{
    window.requestAnimationFrame(setCanvasBg)
    context.beginPath()
    context.fillStyle = color1
    context.fillRect(0, 0, $canvas.width, $canvas.height)
    context.fill()

    drawGrid()
    ball.ballUpdate()

    for(let i = 0; i < ballsBot.length; i++)
    {

        ballsBot[i].drawBall()
        ballsBot[i].ballUpdate()

        if(ball.collision(ball, ballsBot[i], true))
        {
            ballsBot.splice(i, 1)
        }
    }

    for(let i =  0; i <= botAnim.length - 1; i++)
    {
        for(let j =  0; j <= ballsBot.length - 1; j++)
        {
            if(botAnim[i].collision(botAnim[i], ballsBot[j]))
            {
                ballsBot.splice(j, 1)
            }
        }
    }

    for(let i =  0; i <= botAnim.length - 1; i++)
    {
        if(ball.collision(ball, botAnim[i]))
        {
            botAnim.splice(i, 1)
        }
    }    
    for(let i =  0; i <= botAnim.length - 1; i++)
    {
        if(botAnim[i].collision(botAnim[i], ball))
        {
            if(botAnim[i].r > ball.r)
            {
               lose()
            }
        }
    }    

    if(botAnim.length == 0)
    {
        win()
    }
    
}

//Si on gagne
function win()
{
    const  winDiv = document.querySelector('.menu__win')
    winDiv.classList.add('active__container')
    $canvas.classList.toggle('canvas__paused')
}

//Si on perds
function lose()
{
    const  winDiv = document.querySelector('.menu__win')
    winDiv.children[0].innerText = 'Vous vous êtes fait manger par plus gros que vous, dommage ...'
    winDiv.classList.add('active__container')
    $canvas.classList.toggle('canvas__paused')
}

//Tracer les grilles
function drawGrid()
{

   const blockWidth = 50
   context.beginPath()
   context.fillStyle = colorDark
   context.lineWidth = .5

   for(let i = blockWidth; i < $canvas.height; i += blockWidth)
   {
       context.moveTo(0, i)
       context.lineTo($canvas.width, i)
   }

   for(let j = blockWidth; j < $canvas.width; j += blockWidth)
   {
       context.moveTo(j, 0)
       context.lineTo(j, $canvas.height)
   }

   context.stroke()
}


function drawGame()
{
    setupGame()
    setCanvasBg()
    
    randomDirection()
    darkMode()
    
    pauseBtn.style.display = 'block'
}

//drawGame()

/* 
const textWin = 'Vous avez éliminé tout les joueurs, YOU WIN'
const textLose = 'Vous avez été éliminé, soyez plus fort !, YOU LOSE'
const textReplay = 'REJOUER'

context.beginPath()

context.fillStyle = 'black'
context.fillRect(($canvas.width / 2) - 202.5, ($canvas.height / 2 )- 77.5, 405, 155)

context.fillStyle = '#fafafa'
context.fillRect(($canvas.width / 2) - 200, ($canvas.height / 2 )- 75, 400, 150)


context.font = '17px Helvetica'
context.textAlign = 'center'
context.textBaseline = 'middle'
context.fillStyle = 'black'
context.fillText(textWin,($canvas.width / 2) , ($canvas.height / 2)  )

context.fillStyle = '#27ae60'
//context.rotate(45 * Math.PI / 180)
context.arc(($canvas.width / 2) -100, ($canvas.height / 2) + 75, 35, 0.5 * Math.PI, 1.5 *Math.PI, false)
context.arc(($canvas.width / 2) + 100, ($canvas.height / 2) + 75, 35, 1.5 * Math.PI, 0.5 *Math.PI, false)
context.fill()

context.fillStyle = '#fafafa'
context.font = 'bold 20px Helvetica'
context.fillText(textReplay,($canvas.width / 2) , ($canvas.height / 2) + 75 )

//let mouseMap = {x: 0, y:0}

window.addEventListener('mousemove', (e) =>
{
    mouseMap.x += e.clientX 
    mouseMap.y += e.clientY 
    //console.log(mouseMap)

    if(mouseMap.x > ($canvas.width / 2) - 100 && mouseMap.x < ($canvas.width / 2) + 100 && mouseMap.y < ($canvas.height / 2)  + 150 && mouseMap.y > ($canvas.height / 2)  + 75)
    {
        console.log('ok')
    }
})

context.beginPath()
context.fillStyle =  'cyan'
context.fillRect(($canvas.width / 2) - 100, ($canvas.height / 2)  + 75,(($canvas.width / 2) + 100) - (($canvas.width / 2) - 100), (($canvas.height / 2)  + 150) - ($canvas.height / 2)  + 75)
context.fill()





console.log(context.measureText(textWin).width) */
