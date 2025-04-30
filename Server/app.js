let express = require('express');
let bodyParse =  require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
const bodyParser = require('body-parser');


/// criar objeto
let app = express();

app.use(cors());

// permite que use verbo HTTP
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, resp, next )=>{
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

///--------------------MONGOOSE------------------

let url = 'mongodb+srv://jramal:Casa123456@dsm.cgxgp0x.mongodb.net/';

mongoose.connect(url)
.then(
    ()=>{console.log('Conectado ao mongoodb');}   
).catch(
    (e)=>{console.log(e)}
)

// criar uma estrutura no documento e colçao

    let User = mongoose.model("Usuario", new mongoose.Schema({name: String, email: String, idade: String}));        

/// pasta raiz
/// get find()
app.get("/", async (req,resp)=>{
    const users = await User.find({})    
    resp.send(users);
});

// inserir
app.post('/add', async(req, resp)=>{
    // pegar os dados 
  let vnome = req.body.name;
  let vemail = req.body.email;
  let vidade = req.body.idade;
  let item = await new User ({name: vnome, email: vemail, idade: vidade});
  // comando do mongodb
  item.save();

  resp.send({status: "adicionado"});
})

// Atualizar PUT
app.put("/update/:id", async (req,resp)=>{
    // pegando o parametro via url
    const id = req.params.id;
    // dado do header
    // array
    const dados = req.body;
    // objeto model
    const u = await User.findByIdAndUpdate(id, dados);
    if(u){
        resp.send({status:'alterado'});
    }else{
        resp.send({status:'erro'});
    }
});

// delete
app.delete("/delete/:id", async(req,resp)=>{
    let id = req.params.id;
    let i = await User.findByIdAndDelete(id);
    if(i){
        resp.send({status:'deletado'})    
    }else{
        resp.send({status:'erro'})
    }
})

// criar o servidor
app.listen(3000,()=>{
    console.log('Executando Servidor');
})