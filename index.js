const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const pagesRoutes = require('./pages/routes');
const graphqlRoutes = require('./graphql/routes');

const app = express();

const whitelist = [
  'http://localhost:1234',
  'http://fletcherist.github.io',
  'https://fletcherist.github.io'
];
const corsOptions = {
  origin: function (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
  credentials: true
};

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use('/', pagesRoutes)
app.use('/graphql', graphqlRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log('Express app listening on localhost:3000'));
