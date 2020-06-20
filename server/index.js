const chalk = require('chalk');
const path = require('path');
//UTILS & Database
const { readData, writeData } = require('./utils');
const FILE = path.join(__dirname, 'products.json');

//EXPRESS SERVER & PORT
const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

//PATHS & ROUTES
const PUBLIC_PATH = path.join(__dirname, '../client');
const PRIVATE_PATH = path.join(__dirname, '../dist');

app.use(express.static(PUBLIC_PATH));
app.use(express.static(PRIVATE_PATH));

app.get('/api/products', async (req, res, next) => {
  try {
    const products = await readData(FILE);
    res.send(products);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
app.post('/api/products', async (req, res, next) => {
  try {
    const products = await readData(FILE);

    const newProduct = req.body;
    newProduct.id = Math.random() * 10;
    await writeData(FILE, [...products, newProduct]);

    res.send(newProduct);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    const products = await readData(FILE);
    const filteredProducts = products.filter((p) => p.id !== req.params.id * 1);

    await writeData(FILE, filteredProducts);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on PORT ${PORT}`))
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
