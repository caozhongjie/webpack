import styles from './app.css'
console.log(styles)
const div = document.createElement("div")
div.textContent = 'hello'

div.classList.add(styles.box)
document.body.appendChild(div)