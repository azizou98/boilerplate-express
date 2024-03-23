const bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();


console.log('Hello World')

absolute= __dirname + '/views/index.html';

public_path= __dirname+ '/public';

app.use('/public',express.static(public_path));
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
  console.log(req.method +" "+req.path+" "+"-"+" "+req.ip );
  next();
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // operation
  next();
}, function(req, res) {
  res.json({"time":req.time});
});

app.get('/',function(req, res) {
    res.sendFile(absolute)
  })


app.get('/json',function(req, res) {

  if(process.env.MESSAGE_STYLE=='uppercase')
{
  res.json({"message":"Hello json".toUpperCase()})
}else{
  res.json({"message":"Hello json"})
}
});

app.get('/:word/echo',(req,res)=>{

  res.json({'echo':req.params.word}) // meme lokan ndirha echo :
                                       // temchi bla hado ''
})

app.route('/name').get((req,res)=>{
  res.json(
    {
      name: req.query.first + ' ' + req.query.last 
    }
  )
  next();
 }).post((req,res)=>{
  res.json(
    {
      name: req.body.first + ' ' + req.body.last
    }
  )
 });
































 module.exports = app;
