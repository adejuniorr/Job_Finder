const express       = require('express');
const expressHdbs   = require('express-handlebars');
const app           = express();
const path          = require('path');
const db            = require('./db/connection');
const bodyParser    = require('body-parser');
const Job           = require('./models/Job');

// Open Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});
//END - Open Server


// Body Parser
app.use(bodyParser.urlencoded({ extended: false}));
// END - Body Parser


// Handlebars
app.set('views', path.join(__dirname, 'views')); // Application layouts location
app.engine('handlebars', expressHdbs.engine({ defaultLayout: 'main' })); // Main layout
app.set('view engine', 'handlebars'); // Settin handlebars as library/framework to render the layouts
//END - Handlebars

// Static files folder
app.use(express.static(path.join(__dirname, 'public')));
// END - Static files folder

// DB Connection
db.authenticate()
  .then(() => {
    console.log('Conexão com Banco de Dados estabelecida!');
  })
  .catch(err => {
    console.log(`[db.authenticate() ERROR]: ${err}`);
  });
// END - DB Connection


// Routes
app.get('/', (req,res) => {

  /**
   * To load all jobs we'll use the findAll() sequelizes
   * method, passing an object that contains a propertie
   * called 'order' that determines the order of the 
   * elements that will be returned
   */
  Job.findAll({
    order: [
      ['createdAt', 'DESC'] // returns (IN A PROMISE) all items based on the decrescent order of the 'createdAt' default attribute
    ]
  })
  .then(jobs => {

    res.render('index', {jobs}) // Render index.handlebars 

  });
});

/* Jobs routes */
app.use('/jobs', require('./routes/jobs'))

// END - Routes