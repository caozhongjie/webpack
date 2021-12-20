import hello from "./hello";
import imgSrc from './assets/001.jpg'
import imgSvg from './assets/user.svg'
import Txt from './assets/hello.txt'
import './index.css'
import './index.less'

hello()

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

const imgS = document.createElement('img')
imgS.src = imgSvg
document.body.appendChild(imgS)

const box = document.createElement('div')
box.textContent = Txt
document.body.appendChild(box)
document.body.classList.add('hello')