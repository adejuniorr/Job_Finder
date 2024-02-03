const express       = require('express');
const app           = express();
const db            = require('./db/connection');
const bodyParser    = require('body-parser');

// Open Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false}));


// DB Connection
db.authenticate()
  .then(() => {
    console.log('Conexão com Banco de Dados estabelecida!');
  })
  .catch(err => {
    console.log(`[db.authenticate() ERROR]: ${err}`);
  });
// DB Connection


/* ROUTES */

app.get('/', (req,res) => {
    res.send('Projeto funcionando')    
});

// Job routes
app.use('/jobs', require('./routes/jobs'))