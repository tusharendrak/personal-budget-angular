// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 125
        },
        {
            title: 'Rent',
            budget: 500
        },
        {
            title: 'Grocery',
            budget: 250
        },
    ]
};

const mlFrameworks = [
  {
    name: 'TensorFlow',
    stars: 150000,
    released: '2015',
  },
  {
    name: 'scikit-learn',
    stars: 70000,
    released: '2007',
  },
  {
    name: 'Keras',
    stars: 50000,
    released: '2015',
  },
  {
    name: 'XGBoost',
    stars: 30000,
    released: '2014',
  },  {
    name: 'PyTorch',
    stars: 90000,
    released: '2016',
  },
];


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/mlFrameworks', (req, res) => {
    res.json(mlFrameworks);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});