const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./configs/DBconfig').sequelize;
const cors = require('cors');
const path = require('path');
const grapqlServer = require('./graphql');

dotenv.config();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connect DB successfully!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

require('./routes/index')(app);

(async () => {
  await grapqlServer.start();
  grapqlServer.applyMiddleware({ app });
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `App is listening at port http://localhost:${PORT}${grapqlServer.graphqlPath} `
  );
});
