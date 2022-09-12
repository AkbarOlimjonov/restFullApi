const express = require('express')
const app = express()
const port = 3000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const users = [
    { name: 'Tom', age: 50, id: 1 },
    { name: 'Harry', age: 10, id: 2 },
    { name: 'Elizabeth II', age: 96, id: 3 },
]


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/users',(req,res) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    res.status(200).send(user)
})


app.post('/users/add', (req, res) => {
    console.log(req.body);
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(user)
    res.status(201).send('User created')
})

app.delete('/users/:id', (req, res) => {
   
    const user = users.find(val => val.id === +req.params.id)
   
    users.splice(user,1);
   
    return res.send('User deleted');
});

app.put('/users/:id', (req, res) => {
   
    const user = users.find(val => val.id === +req.params.id)
   
    user.name = req.body.name
   
    return res.send('User update');
});

app.listen(port, () => {
  console.log(`Server ${port}`)
})