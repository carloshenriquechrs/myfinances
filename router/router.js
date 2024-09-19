const express = require('express');
const router = express.Router();
const categoria = require('../controller/categoria');
const financia = require('../controller/financia');

// Categorias

router.post('/criar/categoria', categoria.create);
router.get('/listar/categoria/:page',categoria.findAll);
router.put('/atualizar/categoria/:id',categoria.update);

// Financias

router.post('/criar/financia', financia.create);
router.get('/listar/financia/:page', financia.findAll);
router.get('/pesquisar/financia/categoria_id/:id', financia.findById);
router.get('/listar/financia/dataInicial/:dataInicial/dataFinal/:dataFinal/page/:page', financia.findAllDate);
router.put('/atualizar/financia/:id', financia.update);
router.delete('/deletar/financia/:id', financia.delete);


module.exports = router;