const express = require('express');
const app = express();
const port = 3000;


app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`)
});

app.get('/roll/:number', (req, res) => {
    const numberParam = req.params.number
    const number = Number(numberParam)

    if (isNaN(number) || number < 0) {
        return res.send('Choose another number.')
    }
    const roll = Math.floor(Math.random() * (number + 1))
    res.send(`You rolled a ${roll}.`)
});



const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const indexParam = req.params.index
    const index = Number(indexParam)

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send('This item is not yet in stock. Check back soon!')
    }
    const item = collectibles[index]
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`)
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes

    if (req.query['min-price']) {
        const minPrice = Number(req.query['min-price'])
        if (!isNaN(minPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
        }
    };

    if (req.query['max-price']) {
        const maxPrice = Number(req.query['max-price'])
        if (!isNaN(maxPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
        }
    };

    if (req.query['type']) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query['type'])
    };

    res.json(filteredShoes)
});
