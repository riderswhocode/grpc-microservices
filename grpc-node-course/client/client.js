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

function main(){
    // callSum()
    // callGreetManyTimes()
    callPrimeNumber()
}

main()