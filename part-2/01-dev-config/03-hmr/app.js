import './style.css'
const btn = document.createElement("button")
btn.textContent = '添加333'
btn.addEventListener('click', () => {
    const div = document.createElement('div')
    div.classList.add('square')
    document.body.appendChild(div)
})
document.body.appendChild(btn)
if(module.hot) {
    console.log(module.hot)
    module.hot.accept('./app.js')
}