const express = require('express');
const app = express();

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
    res.send("This is the home page.")
})

app.get('/api/people', (req, res) => {
    const simplifiedPeople = people.map(person => {
        const { name } = person;
        return { name }
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