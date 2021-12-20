function getPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('promise数据')
        }, 100)
        
    })
}




async function hello() {
    let a = 'es6定义'
    const res = await getPromise()
    console.log("进来了111111！!")
    console.log(a)
    console.log(res)
}




export default hello;