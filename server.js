var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user:'rishabhshairy',
    databas:'rishabhshairy',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


function createTemplate(data){
var title = data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmlTemplate=`
<!doctype html>
<html>
    <head> 
    <title>
        ${title}
        
    </title>
    <meta name="viewport" content="width-device-width, initialscale=1"/>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="abc">
        
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
         <div> 
            ${heading}
         </div>
        </h3>
        <div>
           ${date.toDateString()}
            
        </div>
        <div>
           ${content}
            
            
        </div>
    </div>
    </body>
        
</html>




`;

    return htmlTemplate;
}

var names=[];
app.get('/submit-name',function(req,res){
	var name=req.query.name;
	
	names.push(name);
	res.send(JSON.stringify(names));
});


var counter=0;
app.get('/counter' , function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //how do we create hash?
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,"this is a random string");
   res.send(hashedString);
   
    
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a request
    //return a response
    pool.query('SELECT * FROM info',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});


app.get('/article/:articleName',function(req,res){
    var articleName = req.params.articleName;
    pool.query("SELECT * FROM article WHERE title= $1",[req.params.articleName] ,function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(404).send(err.toString());
           }
           else{
               var articleData=result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
        
    });
    
    
    
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/WP_20160106_15_41_13_Pro.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'WP_20160106_15_41_13_Pro.jpg'));
});

var names=[];
app.get('/submit-name/:names',function(req,res){
	var name=req.params.name;
	names.push(name);
	res.send(JSON.stringify(names));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
