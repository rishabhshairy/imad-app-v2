var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={
    'article-one':{
    title:'Rishabh Shairy Article one',
    heading:'Article one',
    date:'4-feb-2017',
    content:`<img src="ui/WP_20160106_15_41_13_Pro.jpg">
                <p>
                hey guyz this is my new website ........
            </p>
            <p>
                learning server side javascript and linking websites through IMAD
                
            </p>`

    
},
    'article-two':{
    title: 'Rishabh Shairy Article two',
    heading:'Article two',
    date:'05-feb-2017',
    content:`<p>
                hey guyz this is my new website ........
            </p>
            <p>
                learning server side javascript and linking websites through IMAD
                
            </p>
            <p>
                this is second article page guyzz....
            </p>
 `
},
    'article-three':{
    title: 'Rishabh Shairy Article three',
    heading:'Article three',
    date:'1-feb-2017',
    content:`<p>
                hey guyz this is my new website ........
            </p>
            <p>
                learning server side javascript and linking websites through IMAD
                
            </p>
            <p>
                this is module  p4...
                article  page three
                
            </p>
            `
}
};
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
           ${date}
            
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
app.get('/submit-name/:name',function(req,res){
	var name=req.params.name;
	names.push(name);
	res.send(JSON.stringify(names));
});

var counter=0;
app.get('/counter' , function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name/:names',function(req,res){
	var name=req.params.name;
	names.push(name);
	res.send(JSON.stringify(name));
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
    
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
