const grpc = require('grpc')

const greets = require('../server/greet_pb')
const services = require('../server/greet_grpc_pb')

const calc = require('../server/sum_pb')
const calcService = require('../server/sum_grpc_pb')

function callGreeting() {
    let client = new services.GreetServiceClient(
            'localhost:50051',
            grpc.credentials.createInsecure()
        )

        let request = new greets.GreetRequest()

        let greetings = new greets.Greeting()

        greetings.setFirstName("Jade")
        greetings.setLastName("Doe")

        request.setGreeting(greetings)

        client.greet(request, (err, response) => {
            if (err) {
                console.log("There is an ERROR", err)
            }
            if (response) {
                console.log("Greeting Resposne", response.getResult())
            }
        })
}

function callSum() {
    let client = new calcService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let sumRequest = new calc.SumRequest()
    
    sumRequest.setVal1(10)
    sumRequest.setVal2(10)

    client.sum(sumRequest, (err, response) => {
        if (err) {
            console.log("There is an ERROR", err)
        }
        if (response) {
            console.log(sumRequest.getVal1() + " + " + sumRequest.getVal2() + " = " +  response.getResult())
        }
    })
}

function callGreetManyTimes(){ 
    let client = new services.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let request = new greets.GreetManyTimesRequest()

    let greetings = new greets.Greeting()
    greetings.setFirstName('Jade')
    greetings.setLastName('Doe')
    
    request.setGreeting(greetings)

    let call = client.greetManyTimes(request, () => {})
    call.on("data", (response) => {
        console.log(`Received from server:`, response.getResult())
    })

    call.on("status", (status) => {
        console.log(status)
    })

    call.on("error", (error) => {
        console.error(error.details)
    })

    call.on("end", e => console.log("END RECEIVING DATA"))

}

function callPrimeNumber(){
    let client = new calcService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let primeNumberDecompositionRequest =  new calc.PrimeNumberDecompositionRequest()

    primeNumberDecompositionRequest.setNumber(1150)

    let call = client.primeNumberDecomposition(primeNumberDecompositionRequest, () => {})

    call.on("data", (response) => {
        console.log(`Received from server:`, response.getPrimeFactor())
    })

    call.on("status", (status) => {
        console.log(status.details)
    })

    call.on("error", (error) => {
        console.error(error.details)
    })

    call.on("end", e => console.log("END RECEIVING DATA"))

}

function callLongGreet(){
    let client = new services.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let request = new greets.LongGreetRequest()

    let call = client.longGreet(request, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            console.log("Server Response: ", response.getResult())
        }
    })

    let count = 0, intervalId = setInterval(function() {
        
        console.log("Sending Message " + count)
        let request = new greets.LongGreetRequest()
        let greeting = new greets.Greeting()
        greeting.setFirstName("Jose")
        greeting.setLastName("Rizal")

        request.setGreeting(greeting)

        let requestTwo = new greets.LongGreetRequest()
        let greetingTwo = new greets.Greeting()
        greetingTwo.setFirstName("Apolinario")
        greetingTwo.setLastName("Mabini")

        requestTwo.setGreeting(greetingTwo)

        call.write(request)
        call.write(requestTwo)

        if (++count > 5) {
            clearInterval(intervalId)
            call.end()
        }
    }, 1000)

}

function callComputeAverage(){
    let client = new calcService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let request = new calc.ComputeAverageRequest()

    let call = client.computeAverage(request, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            console.log("The Average is: ", response.getAverage())
        }
    })
    for (let i = 1; i <= 1000; i++) {
        let request = new calc.ComputeAverageRequest()
        request.setNumber(i)
        call.write(request)
    }

    call.end()
}

async function sleep(interval) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), interval)
    })
}

async function callGreetEveryone(){
    let client = new services.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )
    
    let request = new greets.GreetEveryoneRequest()

    let call = client.greetEveryone(request, (err, response) => {
        console.log("Server Response: " + response)
    })

    call.on("data", response => {
        console.log("Hello " + response.getResult())
    })

    call.on("error", err => {
        console.error(err)
    })

    call.on("end", () => {
        console.log("END OF BIDIRECTIONAL STREAMING")
    })

    for (let i = 1; i <= 10; i++) {
        let greeting = new greets.Greeting()
        greeting.setFirstName("Jose")
        greeting.setLastName(i.toString())

        let request = new greets.GreetEveryoneRequest()

        request.setGreet(greeting)

        call.write(request)

        await sleep(1500)
    }

    call.end()
}

function main(){
    // callSum()
    // callGreetManyTimes()
    // callPrimeNumber()
    // callLongGreet()
    // callComputeAverage()
    callGreetEveryone()
}

main()