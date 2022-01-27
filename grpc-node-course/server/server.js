const grpc = require('grpc')

const greets = require('./greet_pb')
const service = require('./greet_grpc_pb')

const calc = require('./sum_pb')
const calcService = require('./sum_grpc_pb')

/*
 Implements Greet RPC Method
*/
function greet(call, callback) {
    let greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello " + call.request.getGreeting().getFirstName()
    )

    callback(null, greeting)

}

function sumcalculator(call, callback) {
    let sum_calculator = new sum.Sum();

    sum_calculator.setResult(
        call.request.Addition().getVal1() + call.request.Addition().getVal2()
    )

    callback(null, sum_calculator)
}

function sum(call, callback) {
    let sumResponse = new calc.SumResponse()

    sumResponse.setResult(
        call.request.getVal1() + call.request.getVal2()
    )

    callback(null, sumResponse)
}

function greetManyTimes(call, callback) {
    let first_name = call.request.getGreeting().getFirstName()
    let last_name = call.request.getGreeting().getLastName()

    let count = 0, intervalID = setInterval(function() {
        let greetManyTimesResponse = new greets.GreetManyTimesReponse()
        greetManyTimesResponse.setResult(first_name + " " + last_name)

        //setup streaming
        call.write(greetManyTimesResponse)

        if (++count > 9) {
            clearInterval(intervalID)
            call.end() //
        }   

    }, 1000)

    

}

function primeNumberDecomposition(call, callback) {
    let number = call.request.getNumber()
    let divisor = 2

    while (number > 1) {
        if (number % divisor === 0) {
            let primeNumberDecompositionResponse = new calc.PrimeNumberDecompositionResponse()

            primeNumberDecompositionResponse.setPrimeFactor(divisor)
            number = number / divisor

            call.write(primeNumberDecompositionResponse)
        } else {
            divisor++
            console.log('Divisor has increased to ', divisor);
        }
    }
    call.end()
    
}

function main() {
    const server = new grpc.Server()
    // server.addService(service.GreetServiceService, { greet: greet, greetManyTimes: greetManyTimes })
    // server.addService(sum_service.AdditionServiceService, { sumcalculator: sumcalculator})
    server.addService(calcService.CalculatorServiceService, { sum: sum, primeNumberDecomposition: primeNumberDecomposition })
    server.bind("localhost:50051", grpc.ServerCredentials.createInsecure())
    
    server.start()

    console.log(`Server Running on localhost:50051`)
}
    
main()