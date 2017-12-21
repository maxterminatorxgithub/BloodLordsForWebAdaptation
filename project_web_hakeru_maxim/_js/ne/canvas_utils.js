

function NEPanel(canvas , background = null , bindPanel = null){
	this.canvas = canvas;
	this.canvas.onclick = function(){
		
	};
	this.ctx = canvas.getContext("2d");
	this.properties = [];
	this.background = background;
	this.alpha = 0;
	this.newProps = null;
	
	this.add = function(property){
		this.properties.push(property);
	};
	this.remove = function(property){
		for(var i=0;i<this.properties.length;i++)
			if(this.properties[i] === property)
				this.properties.splice(i,i+1);
	};
	
	this.onClick = function(x,y){
		for(var property of this.properties)
			if(property.isOn(x,y)){
				if(property.onClick)
					property.onClick();
				return;
			}
	};
	
	this.paint=function(){
		
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0,0,1920,1080);
		
		if(this.background !== null)
			this.ctx.drawImage(this.background,0,0);
		for(property of this.properties)
			property.paint(this.ctx);
		
		
		
		if(this.newProps){
		
		
			this.ctx.fillStyle = 'rgba(255,255,255,'+this.alpha+')';
			this.ctx.fillRect(0,0,1920,1080);
			this.alpha+=0.02;
			if(this.alpha>1){
				this.alpha = 0;
				this.properties = this.newProps;
				this.newProps = null;
			}
			
		}
		
	};
	
	this.nextScene = function(anotherNEPanel){
		this.newProps = anotherNEPanel.properties;
	}
	
	
}


function NEAdaptedPanel(canvas,bindPanel){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.bindPanel = bindPanel;
	
	this.canvas.NEPanel = this;
	
	this.onClick = function(x,y){
		console.log("activated!!");
		this.bindPanel.onClick(x,y);
	};
	
	this.canvas.onclick = function(evt){
		
		if(evt)
			event=evt;
		
		if(this.NEPanel.onClick){
			this.NEPanel.onClick(event.clientX/this.width*
			                     this.NEPanel.bindPanel.canvas.width,
								 event.clientY/this.height*
								 this.NEPanel.bindPanel.canvas.height);
		}
	};
	
	this.paint = function(){
		this.bindPanel.paint();
		this.ctx.drawImage(this.bindPanel.canvas,0,0,1920,1080,0,0,this.canvas.width,this.canvas.height);
	};
}

function NEButton(x=0,y=0,width=0,height=0,text=""){
	this.x=x,
	this.y=y,
	this.width=width,
	this.height=height,
	this.text=text,
	this.fontFamily = "Ariel",
	this.fontSize = "30px",
	this.onClick = null,
	
	this.styleSettings = {
		background: "red",
		foreground: "white"
	},
	
	
	this.isOn = function(x,y){
		return ((x >= this.x) && (x <= (this.x+this.width))) &&
		((y>=this.y) && (y <= (this.y+this.height))) ? true : false;
	},
	
	
	this.setStyleSettings = function(settings){
		this.styleSettings = settings;
	},
	
	
	this.paint = function(ctx){
		
		ctx.fillStyle = this.styleSettings.background;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		
		ctx.fillStyle = this.styleSettings.foreground;
		ctx.font = this.fontSize+" "+this.fontFamily;
		ctx.fillText(this.text,this.x+10,this.y+22);
	};
	
}

function NEImage(x,y,image){
	this.x=x,this.y=y,this.image = image;
	this.paint = function(ctx){
		ctx.drawImage(this.image,this.x,this.y);
	};
	this.isOn=function(){
		return false;
	};
}

function NELabel(x,y,text,size){
	this.x=x,this.y=y,this.text = text,this.size = size;
	this.paint = function(ctx){
		ctx.fillStyle = "cyan";
		ctx.font = this.size+"px fantasy";
		ctx.fillText(this.text,this.x,this.y);
	};
	this.isOn=function(){
		return false;
	};
}


function NECharCell(x=0,y=0,width = 100,height=100,character=null){
	
	this.x = x,
	this.y=y,
	this.width = width,
	this.height=height;
	this.character = character;
	
	this.paint = function(ctx){
		ctx.fillStyle = "black";
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.fillStyle = "white";
		ctx.fillRect(this.x+5,this.y+5,this.width-10,this.height-10);
		if(this.charAttr){
			ctx.drawImage(this.charAttr.img,this.x,this.y);
		}
		if(this.character)
			this.character.paintSelection(ctx,0,0);
	};
	
	this.isOn = function(x,y){
		return x>this.x && x<(this.x+this.width) &&
			   y>this.y && y<(this.y+this.height)
	};
	
	this.charAttr = null;
	
}

