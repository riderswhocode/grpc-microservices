const grpc = require('grpc')

const greets = require('../server/greet_pb')
const services = require('../server/greet_grpc_pb')

const calc = require('../server/sum_pb')
const calcService = require('../server/sum_grpc_pb')

const blog = require('../server/blog_pb')
const blogService = require('../server/blog_grpc_pb')

const fs = require('fs')

let credentials = grpc.credentials.createSsl(
    fs.readFileSync('../certs/ca.crt'),
    fs.readFileSync('../certs/client.key'),
    fs.readFileSync('../certs/client.crt')
)

let unsafeCreds = grpc.credentials.createInsecure()

function rpcDeadline(rpcType) {
    timeAllowed = 5000

    switch(rpcType) {
        case 1: 
            timeAllowed = 100
            break
        case 2:
            timeAllowed = 7000
            break
        default:
            console.log('Invalid RPC Type: Using default timeout')
    }

    return new Date(Date.now() + timeAllowed)
}

function callCreateBlog(){
    let client = new blogService.BlogsClient(
        'localhost:50051',
        credentials
    )
    
    let blogs = new blog.Blog()
    blogs.setAuthor("Jade III")
    blogs.setTitle("The Training Begins Vol 3")
    blogs.setContent("I don't know what to say or do Vol 3")

    let blogRequest = new blog.CreateBlogRequest()
    blogRequest.setBlog(blogs)

    client.createblog(blogRequest, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            console.log("Received create blog response, ", response.toString())
        }
    })
    
}

function callReadBlog(){
    let client = new blogService.BlogsClient(
        'localhost:50051',
        credentials
    )

    let readBlogRequest = new blog.ReadBlogRequest()

    readBlogRequest.setBlogId(10)

    client.readBlog(readBlogRequest, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            response.array.map(val => {
                console.log("Here's the blog details")
                console.log("Blog ID: ", val[0])
                console.log("Author: ", val[1])
                console.log("Title: ", val[2])
                console.log("Content: ", val[3])
            })
            
        }
    })
}

function callDeleteBlog(){
    let client = new blogService.BlogsClient(
        'localhost:50051',
        credentials
    )

    let deleteBlogReq = new blog.DeleteBlogRequest()
    deleteBlogReq.setId(10)

    client.deleteBlog(deleteBlogReq, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            console.log(response.toString())
        }
    })
}

function callUpdateBlog(){
    let client = new blogService.BlogsClient(
        'localhost:50051',
        credentials
    )

    let updateBlogReq = new blog.UpdateBlogRequest()
    let newBlog = new blog.Blog()

    newBlog.setId(11)
    newBlog.setAuthor("James")
    newBlog.setTitle("The Journey to the Center of the Earth")
    newBlog.setContent("This is a content")

    updateBlogReq.setBlog(newBlog)

    client.updateBlog(updateBlogReq, (err, response) => {
        if (err) {
            console.error(err)
        }
        if (response) {
            console.log(response)
        }

        console.log("This is the for client: ", updateBlogReq.array)
    })
}

function callListBlog(){
    let client = new blogService.BlogsClient(
        'localhost:50051',
        credentials
    )
    let emptyBlogRequest = new blog.ListBlogRequest()

    let call = client.listBlog(emptyBlogRequest, () => {})
    
    call.on("data", (response) => {
        console.log('Blogs Received from server:' + response.getBlog().toString())
    })

    call.on("status", (status) => {
        console.log(status)
    })

    call.on("error", (error) => {
        console.error(error.details)
    })

    call.on("end", e => console.log("END STREAMING BLOG DATA"))
}

function callGreeting() {
    let client = new services.GreetServiceClient(
            'localhost:50051',
            credentials
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

function callSquareRoot(){

    let deadline = rpcDeadline(1)

    let client = new calcService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    let request = new calc.SquareRootRequest()
    request.setNumber(25)
    
    client.squareRoot(request, {deadline: deadline}, (err, response) => {
        if (err) {
            console.error(err.message)
        }
        if (response) {
            console.log(`The Square Root of ${request.getNumber()} is ${response.getResult()}`)
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
            console.error(err.details)
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

async function callFindMaximum(){
    
    let client = new calcService.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )
    
    let request = new calc.FindMaximumRequest()
    let call = client.findMaximum(request, (err, response) => {})

    call.on("data", response => {
        console.log("Got new Maximum Value from the Server: " + response.getNumber())
    })

    call.on("error", err => {
        console.error(err)
    })

    call.on("end", () => {
        console.log("End of Client Streaming")
    })

    let data = [3,5,7,1,20,17,25]
    for (let i = 0; i < data.length; i++) {
        let request = new calc.FindMaximumRequest()
        console.log("Sending number: " + data[i])
        request.setNumber(data[i])
        call.write(request)

        await sleep(1000)
    }

    call.end()
}

//DEADLINES



function main(){
    // callGreeting()
    // callSum()
    // callGreetManyTimes()
    // callPrimeNumber()
    // callLongGreet()
    // callComputeAverage()
    // callGreetEveryone()
    // callFindMaximum()
    // callSquareRoot()
    // callListBlog()
    // callCreateBlog()
    // callReadBlog()
    // callUpdateBlog()
    callDeleteBlog()
}

main()