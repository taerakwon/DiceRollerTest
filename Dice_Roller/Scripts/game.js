/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage; //Same intellisense as Stage
var stats;
var assets; // Asset object is referencing to LoadQueue
var manifest = [
    { id: "diceOne", src: "assets/images/dice_one.png" },
    { id: "diceTwo", src: "assets/images/dice_two.png" },
    { id: "diceThree", src: "assets/images/dice_three.png" },
    { id: "diceFour", src: "assets/images/dice_four.png" },
    { id: "diceFive", src: "assets/images/dice_five.png" },
    { id: "diceSix", src: "assets/images/dice_six.png" },
    { id: "rollDice", src: "assets/images/roll.png" },
];
// Manifest is all items that is being load.  It is an array of objects.
// Game Variables
var helloLabel; // create a reference
var pinkButton;
var dice_first;
var dice_second;
var rollButton;
var firstDiceLabel;
var secondDiceLabel;
var dice_combination = [" ", " "];
var dice_shape = [" ", " "];
// Reason for declaring variable at top is to hoist 
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this); // on method is event handler.  On complete, go to init function
    // Event handler is triggered when assets are completely loaded.
    assets.loadManifest(manifest); // loadManifest method loads the manifest
    // Setup statistics object
    setupStats();
}
// Callback function that initializes game objects.
function init() {
    stage = new createjs.Stage(canvas); // Reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate for the game
    // Ticker is a static class (do not need to instantiate in class)
    createjs.Ticker.on("tick", gameLoop); // on is event listener
    // Triggerred every 60 milli seconds.
    main(); // Calling main game function
}
// Functino to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // Set to FPS (1 for ms)
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '335px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}
// Callback function that creates out Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin Measuring
    stage.update();
    stats.end(); // Ends Measuring
}
function randomCalculation() {
    var outCome = [0, 0];
    for (var spin = 0; spin < 2; spin++) {
        outCome[spin] = Math.floor((Math.random() * 6) + 1);
        switch (outCome[spin]) {
            case outCome[spin] = 1:
                dice_combination[spin] = "1";
                dice_shape[spin] = "diceOne";
                break;
            case outCome[spin] = 2:
                dice_combination[spin] = "2";
                dice_shape[spin] = "diceTwo";
                break;
            case outCome[spin] = 3:
                dice_combination[spin] = "3";
                dice_shape[spin] = "diceThree";
                break;
            case outCome[spin] = 4:
                dice_combination[spin] = "4";
                dice_shape[spin] = "diceFour";
                break;
            case outCome[spin] = 5:
                dice_combination[spin] = "5";
                dice_shape[spin] = "diceFive";
                break;
            case outCome[spin] = 6:
                dice_combination[spin] = "6";
                dice_shape[spin] = "diceSix";
                break;
        }
    }
    main();
    return dice_combination, dice_shape;
}
// Callback function responding to when roll button has been clicked
function rollButtonClicked(event) {
    randomCalculation();
}
// Callback functions that change the Alpha transparency of the button
// Mouseover event
function rollButtonOver() {
    rollButton.alpha = 0.8;
}
// Mouseout event
function rollButtonOut() {
    rollButton.alpha = 1.0;
}
function clearMethod() {
    stage.removeAllChildren();
}
// Our Main Game Function
function main() {
    clearMethod();
    rollButton = new createjs.Bitmap(assets.getResult("rollDice"));
    rollButton.x = 90;
    rollButton.y = 270;
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);
    rollButton.on("mouseover", rollButtonOver);
    rollButton.on("mouseout", rollButtonOut);
    // First Dice Label
    firstDiceLabel = new createjs.Text(dice_combination[0]);
    firstDiceLabel.x = 110;
    firstDiceLabel.y = 200;
    firstDiceLabel.font;
    stage.addChild(firstDiceLabel);
    // Second Dice Label
    secondDiceLabel = new createjs.Text(dice_combination[1]);
    secondDiceLabel.x = 210;
    secondDiceLabel.y = 200;
    stage.addChild(secondDiceLabel);
    // First Dice Image
    dice_first = new createjs.Bitmap(assets.getResult(dice_shape[0]));
    dice_first.x = 70;
    dice_first.y = 100;
    stage.addChild(dice_first);
    // Second Dice Image
    dice_second = new createjs.Bitmap(assets.getResult(dice_shape[1]));
    dice_second.x = 170;
    dice_second.y = 100;
    stage.addChild(dice_second);
}
//# sourceMappingURL=game.js.map