console.log('hello webpack')


console.log('第二行')

class A {
    constructor() {
        this.str = 'hello webpack11111'
    }
    sayHello() {
        console.log(this.str)
    }
}

const a = new A()

a.sayHello()