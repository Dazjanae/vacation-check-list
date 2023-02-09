const { Console } = require('console');
const express = require('express')
const app = express();
const PORT = 7000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'vacationplannertodo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    db.collection('ToDos').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    }) 
    .catch(error => console.error(error))
})

app.post('/addtask', (request, response) => {
    db.collection('ToDos').insertOne({todotask:request.body.todotask, taskassignee: request.body.taskassignee, taskduedate: request.body.taskduedate})
    .then (result => {
        console.log('Task Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// app.put('/updatetask')


app.delete('/deletetask', (request, response) => {
    db.collection('ToDos').deleteOne({todotask: request.body.todotaskS})
    .then (result => {
        console.log('Task Deleted')
        response.json('Task Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Your server is connected to port ${PORT}`)
})

