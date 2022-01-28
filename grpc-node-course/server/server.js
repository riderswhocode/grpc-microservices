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

function longGreet(call, callback) {
    call.on("data", request => {
        
        var full_name = request.getGreeting().getFirstName() + ' ' + request.getGreeting().getLastName()

        console.log(`Hello ${full_name}`)

    })

    call.on("error", error => {
        console.log(error)
    })

    call.on("end", () => {

        let response = new greets.LongGreetResponse()
        response.setResult('Long Greet client Streaming...')

        callback(null, response)
    })

}

function computeAverage(call, callback) {

    let sum = 0
    let count = 0

    call.on("data", request => {

        sum+= request.getNumber()
        console.log('Received number: ' + request.getNumber())
        count+=1
    })

    call.on("error", error => {
        console.error(error)
    })

    call.on("end", () => {

        let average = sum / count
        console.log(sum)
        console.log(count)
        
        let response = new calc.ComputeAverageResponse()
        response.setAverage(average)

        callback(null, response)
    })
}
async function sleep(interval) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), interval)
    })
}

async function greetEveryone(call, callback) {
    


    call.on("data", response => {
        
        let full_name = response.getGreet().getFirstName() + ' ' + response.getGreet().getLastName()

        console.log(`Hello ${full_name}`)
    })

    call.on("error", error => {
        console.error(error)
    })

   call.on("end", () => {
       console.log("The end of Streaming")
   })

   for (let i = 1; i <= 10; i++) {
    //    let greeting = new greets.Greeting()
    //    greeting.setFirstName("Jose")
    //    greeting.setLastName("Rizal")

       let request = new greets.GreetEveryoneResponse()
       request.setResult("Jose Rizal")

       call.write(request)
       await sleep(1000)
   }

   call.end()

}

function main() {
    const server = new grpc.Server()
    server.addService(service.GreetServiceService, { 
        greet: greet, 
        greetManyTimes: greetManyTimes, 
        longGreet: longGreet,
        greetEveryone: greetEveryone
     })
 
    // server.addService(calcService.CalculatorServiceService, { 
    //     sum: sum, 
    //     primeNumberDecomposition: primeNumberDecomposition,
    //     computeAverage: computeAverage })
    server.bind("localhost:50051", grpc.ServerCredentials.createInsecure())
    
    server.start()

    console.log(`Server Running on localhost:50051`)
}
    
main()