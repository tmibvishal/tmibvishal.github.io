const server = require('express');
const app = server();
const bodyParser = require('body-parser');

let todolist = [];
//parse application/x-www-form-utlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/",server.static("public"));
app.post('/add',function(req,res){
    console.log(req.body);
    todolist.push(req.body['name']);
    res.send(req.body['name']);
});
app.post('/delete',function(req,res){
    console.log(req.body['number']);
    todolist.splice(req.body['number'],1);
    console.log(todolist);
    res.send("done");
});
app.get('/givetodo',function(req,res){
    res.send(todolist);
});
app.post('/update',function(req,res){
    //todolist.push(req.query['name']);
    console.log(req.body);
    todolist[req.body['number']]=req.body['name'];
    console.log(todolist);
    res.send(req.body['name']);
});
app.post('/makePost',function(req,res){
    console.log(req.body)
    res.send(req.body);
    //res.sendStatus(200);
});


app.listen("5000",function(){
    console.log("server is listening")
});