var crane = new Crane('crane');
var keys = [];
var prizes = [];

window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 30);
    };
})();

function animate(){

	crane.Update();
	
	for(var i = 0; i< prizes.length; i++)
		prizes[i].Update();
	
	for(var i = 0; i< prizes.length; i++)
		prizes[i].Repaint();
		
	crane.Repaint();
	
	requestAnimFrame(function(){
		animate();
	});
}



$(document).keydown(function(e){
	var key = (e.keyCode ? e.keyCode : e.which);
	//console.log(key);
	if(!keys[key])
		keys[key] = true;
		
	if($.inArray(key,[
		37,39, //left right
		//38,40, //up down
		32 //space
	]) != -1) {
		e.preventDefault();	
	}
});

$(document).keyup(function(e){
	var key = (e.keyCode ? e.keyCode : e.which);
	if(keys[key])
		keys[key] = false;
});

//stops when browser loses focus
$(window).blur(function() {
    //keys.length = 0;
	keys = []; //clears array
});

$(document).ready(function(){ //main function
	
	for(var i = 0; i< 5; i++)
		prizes[i] = new Prize(i,{top: 347,left: 400+i*100-Math.ceil(Math.random()*50)},crane);
	
	//crane.Repaint();
	animate();
});