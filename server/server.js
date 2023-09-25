// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            "title": "Eat out",
            "budget": 25
        },
        {
            "title": "Rent",
            "budget": 275
        },
        {
            "title": "Grocery",
            "budget": 110
        },
        {
            "title": "Utilities",
            "budget": 150
        },
        {
            "title": "Transportation",
            "budget": 100
        },
        {
            "title": "Entertainment",
            "budget": 75
        },
        {
            "title": "Healthcare",
            "budget": 50
        },
        {
            "title": "Education",
            "budget": 200
        },
        {
            "title": "Clothing",
            "budget": 75
        },
        {
            "title": "Savings",
            "budget": 300
        }
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});