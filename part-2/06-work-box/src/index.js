console.log(1111, FILE_URL)

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW注册成功', registration)
            })
            .catch(registrationError => {
                console.log('SW注册失败', registrationError)
            })
    })
}