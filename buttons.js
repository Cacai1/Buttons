
let ButtonTimer = {
  time: 0,
  timeOver: 10,
};

function mouseIsOver(x,y,w,h){
  return(mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h);
}

let Button = function(){
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.word = "";
};
// all colors that are used for the buttons must be hex colors
Button.prototype.display = function(color2,color1){
    if (mouseIsOver(this.x,this.y,this.w,this.h)){
        fill(color1);
    }
    else {
        fill(color2);
    }
    noStroke();
    rect(this.x,this.y,this.w,this.h,10);
    //stroke(0,0,0);
    stroke(255,255,255);
    //fill(0,0,0);
    fill(255,255,255);
    let x = this.x+(this.w/2)-(this.word*5)/2;
    let displayText = "";
    textSize(12);
    if (this.hasOwnProperty("textInBox")){
        if (this.textInBox != ""){
            displayText = this.textInBox;
        }
        else {
            displayText = this.word;
        }
    }
    else {
        displayText = this.word;
    }
    text(displayText,this.x+(this.w/2)-(displayText.length*6.5)/2,this.y+(this.h/2));

}
Button.prototype.press = function(funct,...args){
    if (mouseIsOver(this.x,this.y,this.w,this.h) && ButtonTimer.time > ButtonTimer.timeOver){
        console.log(ButtonTimer.time);
        if (mouseIsPressed == true){
            console.log(ButtonTimer.time);
            funct(...args);
            ButtonTimer.time = 0;
            
        }
    }
}
Button.prototype.reset = function(x,y,w,h,word){
    if (x != this.x || y != this.y || w != this.w || h != this.h || word != this.word){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.word = word;
    }
}

let TextBox = function(){
    //Button.call(this,x,y,w,h,word);
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.word = "";
    this.isTyping = false;
    this.textInBox = "";
    this.canType = true;
};
TextBox.prototype = Object.create(Button.prototype);
TextBox.prototype.constructor = TextBox;

TextBox.prototype.press = function(){
    if (mouseIsOver(this.x,this.y,this.w,this.h),ButtonTimer.time > ButtonTimer.timeOver){

        if (mouseIsPressed){
            ButtonTimer.time = 0;

            this.isTyping = true;
        }
    }
    if (mouseIsPressed && mouseIsOver(this.x,this.y,this.w,this.h) == false){
        this.isTyping = false;
    }

    if (this.canType && this.isTyping && keyIsPressed){
        this.canType = false;
        if (key != "Backspace"){
        this.textInBox+=key.toUpperCase();
        }
        else{
            let altT = "";
            for (let i = 0; i < this.textInBox.length-1; i++){
                altT += this.textInBox[i];
            }

            this.textInBox = altT;
        }
    }

    if (!keyIsPressed){
    this.canType = true;
    }
    /*
    if (this.textInBox !== "" && this.isTyping == false){
        this.word = this.textInBox;
        this.textInBox = "";
    }
    */

    //text(this.textInBox,this.x,this.y);

}

let Buttons = [
    // howScreen
    new Button(),
    // randomWordScreen
    new Button(),
    // customWordScreen
    new Button(),
    // options/pause/play/start
    new Button(),
    // random texbox/take data
    new TextBox(),
    new TextBox(),
];

// input how many functions that you are running
// put the function name
// input how many arguments there will be
// repeat for the number of functions allowed
function UnlimitedFunctions(numOfFunct,...args){
    let Iargs = 0;
    for (let i = 0; i < numOfFunct; i++){
        funct = args[Iargs];
        console.log(funct);
        let numOfArgs = int(args[Iargs+1]);
        let inputs = [];
        console.log(numOfArgs+" num of args");
        if (numOfArgs == 1){
            inputs.push(args[Iargs+2]);
            console.log(inputs+" inputs");
        }
        else {
            for (let j = Iargs+2; j < Iargs+2+numOfArgs; j++){
                console.log(numOfArgs+" num of args");
                console.log(args[Iargs+j]+" adding to inputs");
                console.log(Iargs+j+" index of what is being added");
                console.log(Iargs+" Iargs");
                console.log(j+" j");
                inputs.push(args[Iargs+j]);
            }
        }
        
        //console.log(numOfArgs+" num of args");
        //console.log(inputs+" inputs");

        console.log(Iargs+" Iargs");
        funct(inputs);
        
        Iargs += numOfArgs+2;
        console.log(Iargs+" new Iargs");
    }
}


function switchScreen(switchto){
  if (Array.isArray(switchto)){
    screen = switchto[0];
  }
  else {
  screen = switchto;
  }
}
