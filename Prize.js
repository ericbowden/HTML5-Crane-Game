function Prize(id,css, crane) {
    var top = css['top'];
    var left = css['left'];
	hspd = 15;
	vspd = 5;
	var state = 'resting';
	var error;

	var rand = Math.floor(Math.random()*10);
	var rand2 = Math.floor(Math.random()*8);
	var item = ['item.2618.png','item.3122.png','item.6358.png',
		'aurum.png','item.7857.png','item.7868.png','item.7843.png','item.7842.png',
	
	];
	css['background'] = 'url(images/'+item[rand2]+') no-repeat center';
	var pic = $('<div></div>').attr({'id':'prize'+id,class:'prize-ball'}).css(css);
	var ball = $('<div></div>').css({height: 60,'background':'url(images/prizeorbs.png) no-repeat -4px -'+62*rand+'px'});
	$(pic).append(ball);
	$('#game').append(pic);

	//console.log(crane);
	this.GetState = function() {return state};
	
	var CheckBoundaries = function () {
		
		if(left < 52)
			left = 52;
		else if(left > 812)
			left = 812;	
		
		if(top < 30)
			top = 30;
		else if(top > 347 && state !='won' && state !='hidden') {
			top = 347;	
			state = 'resting';
		} else if(top > 500 && state =='won') {
			top=500;
		}
	};
	
	var CheckGrabbed = function() {
		 
		var tmp = Math.floor(Math.random()*100);
		//console.log(tmp,error);
		if(tmp>error) {
			setTimeout(function(){state='falling';},1000+error*10);			
			//console.log('error',1000+error*10);
		 } 
		 
		state = 'is grabbed';
	};
	
	var IsGrabbed = function() {
		top = crane.GetTop()+65;
		
		if(top > 347) 
			top = 347;	
			
		left = crane.GetLeft()+23;
		if(left <= 53) {
			left = 53;
			state = 'won';
		} 
	};
	
	this.Update = function () {
		//console.log(left);
		//if(keys[37]) //leftleft -= hspd;
			
		//if(keys[39]) //rightleft += hspd;
	
		if(crane.GetState() == 'down' && state=='resting') {
			var offset = Math.abs(left - crane.GetLeft()-23);
			error = this.GetError(offset);
			//error = Math.floor(100 - 2.5*Math.pow(offset,1.3));
			//if(id=='0')
			//	console.log(error);
				
			if(error > 0) {				
				state = 'being grabbed';
				$('#debug-errorpx').html(Math.abs(offset)+'px');
				$('#debug-errordrop').html(error+'%');//debugging
			}
		}
		
		if(crane.GetState() == 'up' && state=='being grabbed')
			CheckGrabbed();
		
		if((crane.GetState() == 'drop' || crane.GetState() == 'up') && state=='is grabbed')
			IsGrabbed();
		
		if(state=='falling'||state=='won')
			top += vspd;
			
		//if(id=='0')
			//console.log(state);
		
		if(state=='won' && top > 460) {
			$('#prize'+id).css({visibility:'hidden'});
			state='hidden';
		}
		
		CheckBoundaries();
	};
	
	this.Repaint = function () {
        $('#prize'+id).css({'top':top, 'left':left});
		//$('#'+id+' #crane-handle-top').css({height: handleHeight});
    };
	
}

Prize.prototype.GetError = function(offset) {return Math.floor(160/(.1*offset+1)-60);};
//Prize.prototype.GetError = function(offset) {return Math.floor(100 - 2.5*Math.pow(offset,1.3));};
//Prize.prototype.GetError = function(offset) {return Math.floor(100 - Math.pow(offset,2)/3);};