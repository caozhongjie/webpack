const HomeList = (number) => {
    let str = '<ul>'
    for(let i = 0; i <number; i++) {
        str += `<li>item${i}</li>`
    }
    str += '</ul>'
    return str
}

 export default HomeList