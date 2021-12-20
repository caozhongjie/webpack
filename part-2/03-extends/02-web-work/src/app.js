const worker = new Worker(new URL('./work.js', import.meta.url))

worker.postMessage({
    question: '问题'
})


worker.onmessage = (message) => {
    console.log(message)
}