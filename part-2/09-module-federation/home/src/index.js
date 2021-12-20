import HomeList from "./HomeList";
import('nav/Header').then((Header) => {
    console.log(1111)
    const body = document.createElement('div')
    body.appendChild(Header.default())
    document.body.appendChild(body)
    document.body.innerHTML +=  HomeList(5)
})

