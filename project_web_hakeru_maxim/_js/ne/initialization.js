

var resourceManager;

function initResourceManager(){
	//init resource manager himself
	resourceManager = {image:{},audio:{}};
	
	
	
	//load images
	resourceManager.image["gameTitle"] = document.createElement("img");
	resourceManager.image["gameTitle"].src = "_resources/game_title.png";
	resourceManager.image["imageBackground"] = document.createElement('img');
	resourceManager.image["imageBackground"].src = "_resources/game_background.jpg";
	resourceManager.image["stickman_cell"] = document.createElement('img');
	resourceManager.image["stickman_cell"].src = "_resources/characters/stickman/cell/cell.png";
	
	
	//load audio
	resourceManager.audio["audioBackground"] = document.createElement('audio');
	var sourceTrack = document.createElement("source");
	sourceTrack.src = "_resources/entry_soundtrack1.mp3";
	sourceTrack.type = "audio/mpeg";
	resourceManager.audio["audioBackground"].appendChild(sourceTrack);
	resourceManager.audio["audioCharacterSelect"] = document.createElement('audio');
	sourceTrack = document.createElement("source");
	sourceTrack.src = "_resources/choose_character_music.mp3";
	sourceTrack.type = "audio/mpeg";
	resourceManager.audio["audioCharacterSelect"].appendChild(sourceTrack);
}




var gameCanvasHD;
var HDPanel;
var HDPanelVSCPU;

var gameCanvasAdapted;
var mainPanel;

var focusedPanel;




function initCanvas(){
	gameCanvasHD = document.createElement('canvas');
	gameCanvasHD.width = 1920;
	gameCanvasHD.height = 1080;
	
	gameCanvasAdapted = document.getElementById('renderCanvas');
	gameCanvasAdapted.width = screen.width;
	gameCanvasAdapted.height = screen.height;
	
	
	
	HDPanel = new NEPanel(gameCanvasHD);
	HDPanel.add(new NEImage(600,70,resourceManager.image.gameTitle));
	HDPanel.add(new NELabel(1000,800,"Created by maxterminatorx",44));
	
	
	focusedPanel = HDPanel;
	
	
	mainPanel = new NEAdaptedPanel(gameCanvasAdapted,HDPanel);
	
	
	
	HDPanelVSCPU = new NEPanel(gameCanvasHD);
	
	
	
	
	
	initPanelButtons();
}


var howerCharacterAnimation;

function initAnimations(){
	howerCharacterAnimation = new animation("_resources/animations/hower_character",24,0,0)
}



function initPanelButtons(){
	
	initAnimations();
	
	
	storyModeBtn = new NEButton(500,500,200,30,"story mode");
	storyModeBtn.onClick = enterStoryMode;
	HDPanel.add(storyModeBtn);
	
	vsCPUBtn = new NEButton(500,580,200,30,"vs CPU");
	vsCPUBtn.onClick = enterVsCPU;
	HDPanel.add(vsCPUBtn);
	
	onlineGameBtn = new NEButton(500,660,200,30,"Online Game");
	onlineGameBtn.onClick = enterOnlineGame;
	HDPanel.add(onlineGameBtn);
	
	exitGameBtn = new NEButton(500,740,200,30,"Exit Game");
	exitGameBtn.onClick = exitGame;
	HDPanel.add(exitGameBtn);
	
	var charTable = [];
	
	
	HDPanelVSCPU.add({x:HDPanelVSCPU.canvas.width/2-250,y:HDPanelVSCPU.canvas.height/2-250,paint:function(ctx){
		ctx.fillStyle = "black";
		ctx.fillRect(this.x-15,this.y-15,530,530);
	},isOn:function(){return false;}});
	
	for(var i=0;i<5;i++){
		charTable[i]=[];
		for(var j=0;j<5;j++){
			charTable[i][j] = new NECharCell(j*100+HDPanelVSCPU.canvas.width/2-250,
			i*100+HDPanelVSCPU.canvas.height/2-250,100,100);
			charTable[i][j].onClick = function(){
				howerCharacterAnimation.x = this.x-15,
				howerCharacterAnimation.y = this.y-15;
				this.character.setSelected();
			};
			HDPanelVSCPU.add(charTable[i][j]);
		}
	}
	
	howerCharacterAnimation.x = charTable[0][0].x-15,
	howerCharacterAnimation.y = charTable[0][0].y-15;
	HDPanelVSCPU.add(howerCharacterAnimation);
	
	
	charTable[0][0].charAttr = {img:resourceManager.image["stickman_cell"]};
	charTable[0][0].character = new NECharacter("_resources/characters/stickman");
}






//init panel functions


//init buttons functions

function enterStoryMode(){
	
}
function enterVsCPU(){
	console.log("maxim123");
	focusedPanel.nextScene(HDPanelVSCPU);
	resourceManager.audio["audioBackground"].pause();
	setTimeout(function(){
		resourceManager.audio["audioCharacterSelect"].play();
	},500);
}
function enterOnlineGame(){
	
}
function exitGame(){
	
}
function fullscreen(canvas,callback){


	if(canvas.webkitRequestFullScreen) {
		canvas.webkitRequestFullScreen();
    }
    else {
		canvas.mozRequestFullScreen();
    }
	canvas.width = screen.width;
	canvas.height = screen.height;
	canvas.style.display="block";
	resourceManager.audio["audioBackground"].play();
	if(callback)
		callback();
}




