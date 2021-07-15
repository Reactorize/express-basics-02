const express = require('express');
const app = express();

app.use(express.static('public'));

const people = [
    {
        id: 1,
        name: "John",
        age: 45,
        details: "This is a bit more information about John, just to show how one can choose what info is shown on a query."
    },
    {
        id: 2,
        name: "Michael",
        age: 35,
        details: "This is a bit more information about Michael, just to show how one can choose what info is shown on a query."
    },
    {
        id: 3,
        name: "Mark",
        age: 30,
        details: "This is a bit more information about Mark, just to show how one can choose what info is shown on a query."
    },
    {
        id: 4,
        name: "Patrick",
        age: 20,
        details: "This is a bit more information about Patrick, just to show how one can choose what info is shown on a query."
    }
]

app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><p><a href="./api/people">View All People</a><br><a href="./api/query?search=m">First letter 'm'</a><br><a href="./api/query?search=m&limit=1">First letter 'm', limit 1 person</a></p>`)
})

app.get('/api/people', (req, res) => {
    const simplifiedPeople = people.map(person => {
        const { name, age, id } = person;
        return { name, age, id }
    })
    res.json(simplifiedPeople);
})

app.get('/api/people/:personID', (req, res) => {
    const { personID } = req.params;
    const singlePerson = people.find(person => person.id === Number(personID));
    if (!singlePerson) {
        return res.status(404).send('No person with that id seems to be in our database.')
    }
    return res.json(singlePerson);
})

app.get('/api/query', (req, res) => {
    const { search, limit } = req.query;
    let sortedPeople = [...people];
    if (search) {
        sortedPeople = sortedPeople.filter(person => {
            return (person.name).toLowerCase().startsWith(search.toLowerCase());
        })
    }
    if (limit) {
        sortedPeople = sortedPeople.slice(0, Number(limit));
    }
    res.status(200).json(sortedPeople);
})

const port = 4500;
app.listen(port, () => console.log(`Listening to the server on port ${port}...`));