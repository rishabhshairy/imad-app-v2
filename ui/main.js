console.log('Loaded!');
var img = document.getElementById('new');
var marginLeft=0;
function moveright(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft +'px';
}
img.onclick=function() {
    
    var interval=setInterval(moveright,100);
};
