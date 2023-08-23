const express = require('express'); 
const terms = require('../controller/termsAndCondition');
const termsRouter = express.Router()


//ADMIN
termsRouter.post('/',   terms.addterms);
termsRouter.get('/',   terms.getAllterms);
termsRouter.get('/:id',   terms.gettermsById);
termsRouter.put('/:id', terms.updateterms);
termsRouter.delete('/:id', terms.DeleteTerms);

module.exports = termsRouter;