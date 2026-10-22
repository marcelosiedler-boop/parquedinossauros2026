import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))



import Especie from './models/Especie.js'
import Dinossauro from './models/Dinossauro.js'

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

app.get('/dinossauro/add', (req, res) => {
    res.render("dinossauro/add");
})

app.get('/dinossauro', async (req, res) => {
    const dinossauros = await Dinossauro.find()
    res.render("dinossauro/lst", {dinossauros});
})

app.get('/especie',  async (req, res) => {
 //listar espécies
 const especies = await Especie.find()
 res.render("especie/lst", {especies});

})


app.post('/especie',  async (req, res) => {
 const pesquisa = req.body.pesquisa 
 //listar espécies
 const especies = await Especie.find(
    {nome: new RegExp(pesquisa, 'i') }
 )
 res.render("especie/lst", {especies});

})

app.get('/especie/del/:id',  async (req, res) => {

 const id = req.params.id
 await Especie.findByIdAndDelete(id)
 
 const especies = await Especie.find()
 res.render("especie/lst", {especies});

 //res.redirect("/especie/lst")
})

app.get('/especie/edt/:id',  async (req, res) => {

 const id = req.params.id
  //traz a especie com o id especificado
 const especie = await Especie.findById(id)
  res.render("especie/edt", {especie});

 //res.redirect("/especie/lst")
})
//GRAVAÇÃO da alteração no mongo
app.post('/especie/edt/:id',  async (req, res) => {

 const {id,nome,periodo} = req.body
  //traz a especie com o id especificado
  await Especie.findByIdAndUpdate(id, {nome,periodo})

  const especies = await Especie.find()
 res.render("especie/lst", {especies});

 //res.redirect("/especie/lst")
})

app.get('/especie/add',  (req, res) => {

  res.render("especie/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/especie/add',  async (req, res) => {
  const {nome,periodo} = req.body
  await Especie.create({nome, periodo})
  res.render("especie/add");
})
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});