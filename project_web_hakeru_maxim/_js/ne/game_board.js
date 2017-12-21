

function animation(sourceFolder,scenesNum,x,y){
	this.scenes = [];
	this.scenesNum = scenesNum;
	this.onScene = 0;
	this.x=x,this.y=y;
	
	for(var i=0;i<scenesNum;i++){
		var imgScene = document.createElement("img");
		imgScene.src = sourceFolder+'/'+(i+1)+'.png';
		this.scenes.push(imgScene);
	}
	
	this.next = function(){
		if(this.onScene == this.scenesNum-1){
			this.onScene = 0;
			return;
		}
		this.onScene++;
	};
	this.paint=function(ctx){
		ctx.drawImage(this.scenes[this.onScene],this.x,this.y);
	};
	
	this.isOn=function(){
		return false;
	};
}



function NECharacter(sourceFolder){
	
	/**
	states keys:
	1 .stand
	2 .weapon-stand
	3 .run
	4 .weapon-walk
	5 .back
	6 .weapon-back
	7 .guard
	8 .weapon-guard
	9 .attack
	10.weapon-attack
	
	*/
	this.states = {};
	
	this.normalImage = new Image();
	this.normalImage.src = sourceFolder+"/normal.png";
	this.superImage = new Image();
	this.superImage.src = sourceFolder+"/demon.png";
	
	
	this.currentState = "stand";
	
	this.setStateAnimation=function(key,animationObj){
		this.states[key] = animationObj;
	};
	
	this.changeStateTo=function(key){
		this.currentState = key;
		this.states[key].onScene = 0;
	};
	
	this.step = function(){
		this.states[this.currentState].next();
	}
	
	this.paint=function(ctx,x,y){
		ctx.drawImage(this.states[this.currentState],x,y);
	};
	
	this.paintSelection=function(ctx,x,y){
		ctx.drawImage(this.normalImage,0,0,864,1080,-this.intAni*this.intAni*0.85+300,y+200+this.intAni*5,450,600);
		
		if(this.intAni > 0)
			this.intAni--;
	};
	
	
	this.setSelected = function(){
		this.intAni = 20;
	}
	
	
	
	
	
	
}



