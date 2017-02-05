var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={
    `article-one':{
    title: 'Rishabh Shairy Article one',
    heading:'Article one',
    date:'4-feb-2017',
    content:`<p>
                hey guyz this is my new website ........
            </p>
            <p>
                learning server side javascript and linking websites through IMAD
                
            </p>`

    
},
    `article-two'':{
    title: 'Rishabh Shairy Article two',
    heading:'Article two',
    date:'05-feb-2017',
    content:` <p>
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
    `article-three':{title: 'Rishabh Shairy Article three',
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
function createTemp(data){
var title=data.title;
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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    res.send(createTemp(articles[articleName]));
    var articleName=req.params.articleName;
});

app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/cube.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cube.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
