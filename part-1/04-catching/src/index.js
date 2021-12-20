import hello from "./hello";
import imgSrc from './assets/001.jpg'
import imgSvg from './assets/user.svg'
import Txt from './assets/hello.txt'
import './index.css'
import './index.less'
import _ from 'lodash'
import './async.module'
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
console.log(_.join(['index', 'module', 'loaded'], ' '))

const button = document.createElement('button')
button.textContent = '点击执行加载文件'
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math.js').then(({add, minus}) => {
        console.log(add(4,5))
    })
})
document.body.appendChild(button)