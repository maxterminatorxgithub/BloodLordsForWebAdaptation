

const border = document.createElement("img");
border.src = "_resources/card_tamplate.png";

const DEMONIC_CARD_TYPE = {text:"demonCard",background:document.createElement("img")};
const GOD_CARD_TYPE     = {text:"godCard",background:document.createElement("img")};
const MERGED_CARD_TYPE  = {text:"mergedCard",background:document.createElement("img")};

DEMONIC_CARD_TYPE.background.src = "_resources/demon_card_background.png";
GOD_CARD_TYPE.background.src = "_resources/god_card_background.png";
MERGED_CARD_TYPE.background.src = "_resources/merged_card_background.png";


function Card(cardType,player){
	
	this.player       = player;
	this.label        = cardType.label;
	this.cardImg      = cardType.cardImg;
	
	this.cardType     = cardType.cardType;
	this.attack       = cardType.attack;
	this.superAttack  = cardType.superAttack;
	
	this.hp           = cardType.maxHp;
	this.maxHp        = cardType.maxHp;
	this.sp           = Math.floor(cardType.maxSp/2);
	this.maxSp        = cardType.maxSp;
	this.level        = cardType.level;
	this.cardIsAlive  = true;
	this.mergeWithCard= function(card){
		
	};
	this.drawCard =function(x,y,ctx){
		ctx.beginPath();
		ctx.drawImage(this.cardType.background,x,y);
		ctx.beginPath();
		ctx.drawImage(this.cardImg,x,y+150);
		ctx.beginPath();
		ctx.drawImage(border,x,y);
	};
}

//type of cards

function attack(opponent){
	if(opponent.hp <= this.dmg){
		this.cardState = false;
		this.hp = 0;
		return;
	}
	opponent.hp -= this.dmg;
}

function superAttack(opponent){
	if(opponent.hp <= this.superDmg){
		this.cardState = false;
		this.hp = 0;
		return;
	}
	opponent.hp -= this.superDmg;
}

function CardType(label,cardType,level,hp,sp,dmg,superDmg,cardImg){
	this.label       = label;
	this.cardType    = cardType;
	this.level       = level;
	this.maxHp       = hp;
	this.maxSp       = sp;
	this.dmg         = dmg;
	this.superDmg    = superDmg;
	this.attack      = attack;
	this.superAttack = superAttack;
	(this.cardImg  = document.createElement('img')).src = cardImg;
}




//demon card type init

var demon           = new CardType("Demon",DEMONIC_CARD_TYPE,1, 100,  50, 17, 30);

var demonGuard      = new CardType("Demon Guard",DEMONIC_CARD_TYPE,2, 150,  80, 25, 45);

var hellGirl        = new CardType("Hell Girl",DEMONIC_CARD_TYPE,3, 180, 150, 35, 70);

var devilCentipade  = new CardType("Devil Centipade",DEMONIC_CARD_TYPE,4, 270, 200, 50, 95);

var hellKnight      = new CardType("Hell Knight",DEMONIC_CARD_TYPE,5, 350, 250, 80,115);

var hellKing        = new CardType("Hell King",DEMONIC_CARD_TYPE,6, 420, 300,100,150);

var demonLord       = new CardType("Demon Lord",DEMONIC_CARD_TYPE,7, 500, 400,160,200);

var hellEmpress     = new CardType("Hell Empress",DEMONIC_CARD_TYPE,8, 800, 700,210,300);

var hellMind        = new CardType("Hell Mind",DEMONIC_CARD_TYPE,9,1000,1000,300,600);



//god card type init

var spirit          = new CardType("Spirit",GOD_CARD_TYPE    ,1,  80,  80, 15, 45);

var halfSaint       = new CardType("Half Saint",GOD_CARD_TYPE    ,2, 130, 100, 22, 55);

var saint           = new CardType("Saint",GOD_CARD_TYPE    ,3, 160, 180, 30, 85);

var archAngel       = new CardType("Arch Angel",GOD_CARD_TYPE    ,4, 255, 230, 45,104);

var spiritGod       = new CardType("Spirit God",GOD_CARD_TYPE    ,5, 320, 300, 65,140);

var heavenLord      = new CardType("Heaven Lord",GOD_CARD_TYPE    ,6, 400, 330, 90,170);

var ancestorGod     = new CardType("Ancestor God",GOD_CARD_TYPE    ,7, 450, 500,130,270);

var eliteGod        = new CardType("Elite God",GOD_CARD_TYPE    ,8, 700, 850,180,450);

var heavenMind      = new CardType("Heaven Mind",GOD_CARD_TYPE    ,9,1000,1000,300,600);



//merged card type init

var zerg          = new CardType("Zerg",MERGED_CARD_TYPE , 1,          demon.maxHp,     spirit.maxSp,          demon.dmg,     spirit.superDmg);

var deathScorpion       = new CardType("Death Scorpion",MERGED_CARD_TYPE , 2,     demonGuard.maxHp,  halfSaint.maxSp,     demonGuard.dmg,  halfSaint.superDmg);

var hollow           = new CardType("Hollow",MERGED_CARD_TYPE , 3,       hellGirl.maxHp,      saint.maxSp,       hellGirl.dmg,      saint.superDmg);

var ultralisk       = new CardType("Ultralisk",MERGED_CARD_TYPE , 4, devilCentipade.maxHp,  archAngel.maxSp, devilCentipade.dmg,  archAngel.superDmg);

var deathKnight      = new CardType("Death Knight",MERGED_CARD_TYPE , 5,     hellKnight.maxHp,  spiritGod.maxSp,     hellKnight.dmg,  spiritGod.superDmg);

var meduza      = new CardType("Meduza",MERGED_CARD_TYPE , 6,       hellKing.maxHp, heavenLord.maxSp,       hellKing.dmg, heavenLord.superDmg);

var overlord     = new CardType("Overlord",MERGED_CARD_TYPE , 7,      demonLord.maxHp,ancestorGod.maxSp,      demonLord.dmg,ancestorGod.superDmg);

var heavenlyPoisonGirl = new CardType("Heavenly Poison Girl",MERGED_CARD_TYPE , 8,    hellEmpress.maxHp,   eliteGod.maxSp,    hellEmpress.dmg,   eliteGod.superDmg);

var darkMind        = new CardType("Dark Mind",MERGED_CARD_TYPE , 9,                 1500,             1500,                500,                 750);

var aliceDemonGod   = new CardType("Alice the Demon God",MERGED_CARD_TYPE ,10,2000,2000,700,1000,"_resources/card_characters/alice_the_demon_god.png");




//collection card type array


var cardTypeCollection = [];

cardTypeCollection.push(demon);
cardTypeCollection.push(demonGuard);
cardTypeCollection.push(hellGirl);
cardTypeCollection.push(devilCentipade);
cardTypeCollection.push(hellKnight);
cardTypeCollection.push(hellKing);
cardTypeCollection.push(demonLord);
cardTypeCollection.push(hellEmpress);
cardTypeCollection.push(hellMind);
cardTypeCollection.push(spirit);
cardTypeCollection.push(halfSaint);
cardTypeCollection.push(saint);
cardTypeCollection.push(archAngel);
cardTypeCollection.push(spiritGod);
cardTypeCollection.push(heavenLord);
cardTypeCollection.push(ancestorGod);
cardTypeCollection.push(eliteGod);
cardTypeCollection.push(heavenMind);
cardTypeCollection.push(zerg);
cardTypeCollection.push(deathScorpion);
cardTypeCollection.push(hollow);
cardTypeCollection.push(ultralisk);
cardTypeCollection.push(deathKnight);
cardTypeCollection.push(meduza);
cardTypeCollection.push(overlord);
cardTypeCollection.push(heavenlyPoisonGirl);
cardTypeCollection.push(darkMind);
cardTypeCollection.push(aliceDemonGod);





var MAX_CARDS_IN_HAND = 10;

function Player(hp){
	this.hp =hp;
	this.rounds = 0;
	this.cardsInHand = [];
	this.makeRound = function(){
		if(this.rounds>0)
			this.rounds--;
	};
	this.takeCard=function(card){
		if(cardsInHand.length >= MAX_CARDS_IN_HAND)
			return;
		this.cardsInHand.push(card);
	};
	this.hasRounds=function(){
		return this.rounds>0?true:false;
	};
	this.hasCards=function(){
		return cardsInHand.length>0?true:false;
	};
	this.summonCardToDesk=function(index,desk,row,col){
		desk[row,col] = cardsInHand[index];
		cardsInHand.splice(index,1);
	};
	this.addRounds=function(rounds){
		this.rounds+=rounds;
	};
	this.marge=function(subjectCard,operandCard){
		subjectCard.mergeWithCard(operandCard);
	};
}


