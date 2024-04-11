const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

morgan.token('body', (req) => JSON.stringify(req.body));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else (
        response.status(404).end()
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    let randomId;
    do {
        randomId = Math.floor(Math.random() * 1000) + 1;
    } while (persons.some(person => person.id === randomId));

    return randomId;
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        });
    }

    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return response.status(409).json({
            error: "Name already exists in phonebook"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);

    response.status(201).json(person);
});

app.get('/info', (request, response) => {
    const currentTime = new Date();
    const info = `Phonebook has info for ${persons.length} people.<br>${currentTime.toString()}`;
    response.send(info);
});

app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
