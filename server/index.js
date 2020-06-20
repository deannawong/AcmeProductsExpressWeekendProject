const chalk = require('chalk');
const path = require('path');
//UTILS && Database
const { readData, writeData } = require('./utils');
const FILE = path.join(__dirname, 'products.json');

//EXPRESS SERVER
const express = require('express');

const app = express();
app.use(express.json());

PORT = process.env.PORT || 3000;

//ROUTES
const PUBLIC_PATH = path.join(__dirname, '../client');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await readData(FILE);
    res.send(products);
  } catch (e) {
    next(e);
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const products = await readData(FILE);
    const newProduct = { ...req.body, id: Math.random() };
    await writeData(FILE, [...products, newProduct]);
    res.send(newProduct);
  } catch (e) {
    next(e);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    const products = await readData(FILE);
    const filteredProds = products.filter(
      (prod) => prod.id !== req.params.id * 1
    );
    await writeData(FILE, filteredProds);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Application is being served from Port ${PORT}`))
);

//SEEDING INITIAL DATA
const products = [
  {
    id: 1,
    name: 'Foo',
  },
  {
    id: 2,
    name: 'Bar',
  },
];

writeData(FILE, products);
