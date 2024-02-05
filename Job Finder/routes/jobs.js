const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

/* // testing
router.get('/test', (req,res) => {
    res.send('Jobs Routes working!');
}) */

router.get('/add', (req,res) => {
    res.render('add');
})

// Add Job via POST
router.post('/add', (req,res) => {
    /* Através do body-parser, fazemos o mapeamento dos atributos obtidos 
    pelo corpo da requisição */
    let { title, description, salary, company, email, is_new } = req.body;

    Job.create({ 
        title, 
        description, 
        salary, 
        company, 
        email, 
        is_new 
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log('[Job.create() ERROR]:\n' + err));
});

module.exports = router;