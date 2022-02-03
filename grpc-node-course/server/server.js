const grpc = require('grpc')

const greets = require('./greet_pb')
const service = require('./greet_grpc_pb')

const calc = require('./sum_pb')
const calcService = require('./sum_grpc_pb')

const blog = require('./blog_pb')
const blogService = require('./blog_grpc_pb')

const fs = require('fs')

//Knex Requires
const environment = process.env.ENVIRONMENT || "development"
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

/*
 Implements Greet RPC Method
*/

/* 
    Blog CRUD
*/ 

function listBlog(call, callback) {

    console.log("Received Blog Request")

    knex("blogs").then(data => {
        data.forEach(element => {
            let blogs = new blog.Blog()
            blogs.setId(element.id.toString())
            blogs.setAuthor(element.author)
            blogs.setTitle(element.title)
            blogs.setContent(element.content)

            let blogResponse = new blog.ListBlogResponse()
            blogResponse.setBlog(blogs)

            //Write to Stream
            call.write(blogResponse)

        });

        call.end() //END OF STREAM
    })

}

function createblog(call, callback){

    console.log("Received Create Blog Request")

    let blogs = call.request.getBlog()

    console.log("Inserting A Blog")

    knex("blogs")
    .insert({
        author: blogs.getAuthor(),
        title: blogs.getTitle(),
        content: blogs.getContent()
    }).then(() => {
        let id = blogs.getId().toString()

        var addedBlog = new blog.Blog()

        //Set Blog Response to be return
        addedBlog.setId(id)
        addedBlog.setAuthor(blogs.getAuthor())
        addedBlog.setTitle(blogs.getTitle())
        addedBlog.setContent(blogs.getContent())

        let blogResponse = new blog.CreateBlogResponse()
        blogResponse.setBlog(addedBlog)

        callback(null, blogResponse)
        console.log("Added new Blog with ID: ", blogResponse.toString())
    })
}

function deleteBlog(call, callback){
    console.log("Delete Blog from DB Request")

    let blogId = call.request.getId()

    console.log("Deleting content from this blog with ID: ", blogId)

    knex("blogs")
    .where({id: parseInt(blogId)})
    .del()
    .returning()
    .then(data => {
        if (data) {
            let deleteResponse = new blog.DeleteBlogResponse()
            deleteResponse.setId(blogId)

            console.log(data)

            callback(null, deleteResponse)
        } else {
            return callback({
                code: grpc.status.NOT_FOUND,
                message: "Blog with corresponding ID not found"
            });
        }
    })
}

function readBlog(call, callback) {
    console.log("Received Read Blog Request")

    let blogId = call.request.getBlogId()

    console.log("Browse Blog by ID: ", blogId)

    knex("blogs")
    .where({id: parseInt(blogId)})
    .then(row => {
        if (row.length) {
            console.log(row)
            let readBlog = new blog.Blog()
            row.map(val => {
                readBlog.setId(val.id.toString())
                readBlog.setAuthor(val.author)
                readBlog.setTitle(val.title)
                readBlog.setContent(val.content)

                let blogResponse = new blog.ReadBlogResponse()
                blogResponse.setBlog(readBlog)
    
                callback(null, blogResponse)
    
                console.log("Sending result Blog with ID: ", val.id)
            })
            
        }
        
    })
}

function updateBlog(call, callback) {


    console.log("Received Update Blog Request")

    var blogId = call.request.getBlog().getId()
    
    console.log("Update Blog Information by ID: ", blogId)

    knex("blogs")
    .where({id: parseInt(blogId)})
    .update({
        author: call.request.getBlog().getAuthor(),
        title: call.request.getBlog().getTitle(),
        content: call.request.getBlog().getContent()
    })
    .returning()
    .then(row => {
        if (row) {
            let updateBlog = new blog.Blog()

            updateBlog.setId(blogId)
            updateBlog.setAuthor(row.author)
            updateBlog.setTitle(row.title)
            updateBlog.setContent(row.content)

            let blogResponse = new blog.UpdateBlogResponse()
            blogResponse.setBlog(updateBlog)

            callback(null, blogResponse)
        }
    })

    console.log("END OF OPERATION")

}

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


function findMaximum(call, callback) {
    let currentMaximum = 0
    let currentNumber = 0

    call.on('data', request => {

        currentNumber = request.getNumber()

        if (currentNumber >= currentMaximum){
            currentMaximum = currentNumber

            let response = new calc.FindMaximumResponse()
            response.setNumber(currentMaximum)

            call.write(response)
        }

        console.log('Streamed number: ', request.getNumber())
    })

    call.on('error', err => {
        console.error(err)
    })

    call.on('end', () => {
        let response = new calc.FindMaximumResponse()
        response.setNumber(currentMaximum)

        call.write(response)
        call.end()
        console.log('The end of Server Streaming')
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

function squareRoot(call, callback) {

    let number = call.request.getNumber()

    if (number >= 0) {
        let numberRoot = Math.sqrt(number)
        let response = new calc.SquareRootResponse()

        response.setResult(numberRoot)

        callback(null, response)
    } else {
        //Error Handling
        return callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: `Number cannot be less than 0 --- Number sent: ${number}`
        })
    }
}

function main() {

    let credentials = grpc.ServerCredentials.createSsl(
        fs.readFileSync('../certs/ca.crt'),
        [{
            cert_chain: fs.readFileSync('../certs/server.crt'),
            private_key: fs.readFileSync('../certs/server.key')
        }], true)

    let unsafeCreds = grpc.ServerCredentials.createInsecure()

    const server = new grpc.Server()

    
    server.addService(blogService.BlogsService, {
        listBlog: listBlog,
        createblog: createblog,
        readBlog: readBlog,
        updateBlog: updateBlog,
        deleteBlog: deleteBlog
    });

    // server.addService(service.GreetServiceService, { 
    //     greet: greet, 
    //     greetManyTimes: greetManyTimes, 
    //     longGreet: longGreet,
    //     greetEveryone: greetEveryone
    //  })
 
    // server.addService(calcService.CalculatorServiceService, { 
    //     sum: sum, 
    //     squareRoot: squareRoot,
    //     primeNumberDecomposition: primeNumberDecomposition,
    //     computeAverage: computeAverage,
    //     findMaximum: findMaximum
    // })
    server.bind("localhost:50051", credentials)
    
    server.start()

    console.log(`Server Running on localhost:50051`)
}
    
main()