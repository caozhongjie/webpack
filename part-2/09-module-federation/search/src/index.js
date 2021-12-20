import('nav/Header').then((Header) => {
    document.body.appendChild(Header.default())
})

import('home/HomeList').then((HomeList) => {
    document.body.innerHTML += HomeList.default(3)
})