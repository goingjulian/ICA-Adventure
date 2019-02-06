'use strict';

const HELP_TEXT = 
"Welcome to ICA Adventure, here's how to play this game: \n" +
"You enter commands in the prompt to play the game. \n" + 
"The available commands can be seen in the box in the top-right corner \n" + 
"The objective is to find all items in the game, good luck!";

const PREV_OUTPUT_ELEM_ID = "previousOutput";
const USER_INPUT_ELEM_ID = "userInput";
const USER_INPUT_BOX_ID = "textLine";
const CLEAR_CONSOLE_BUTTON_ID = "clearConsoleButton";
const RESET_BUTTON_ID = "resetButton";

let previousOutput = "";

document.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
        
        const result = onEnter(document.getElementById(USER_INPUT_ELEM_ID).value);

        if(game.userWon()) {
            onClear();
            document.getElementById(PREV_OUTPUT_ELEM_ID).innerText += "You won!";
            document.getElementById(USER_INPUT_BOX_ID).style.visibility = "hidden";
            document.getElementById(CLEAR_CONSOLE_BUTTON_ID).setAttribute("disabled", "true");
            // document.getElementById(RESET_BUTTON_ID).innerHTML = "New game";
        } else {
            document.getElementById(PREV_OUTPUT_ELEM_ID).innerText += result + "\n" + "------------------" + "\n";
        }

        document.getElementById(USER_INPUT_ELEM_ID).value = "";

        window.scrollTo(0,document.body.scrollHeight);
    }
  });

function onReset() {
    // document.getElementById(PREV_OUTPUT_ELEM_ID).innerText = "";
    // document.getElementById(USER_INPUT_ELEM_ID).value = "";
    // game.reset();
    location.reload();
}

function onClear() {
    document.getElementById(PREV_OUTPUT_ELEM_ID).innerText = "";
    document.getElementById(USER_INPUT_ELEM_ID).value = "";
}

function onEnter(line) {
    console.log("Enter pressed");
    const [command, argument] = line.trim().split(' ');
    try {
        const result = execute(command, argument)
        console.log("RESULT = " + result);
        return result;
    }
    catch (error) {
        if (error.code && error.code === COMMAND_ERROR) {
            return error.message;
        } 
        else {
            throw error;
        }
    }
}

function execute(command, argument) {
    let response;
    switch (command) {
        case 'inventory':
        case 'i':
            response = 'you are carrying';
            const inventory = game.getInventory();
            
            if (inventory.length === 0) {
                response += ' no items at al';
            } 
            else {
                response += ' these items:';
                inventory.forEach(item => {
                    response +=`\n- ${item}`;
                });
            }
            return response;
        case 'take':
        case 't':
            if (argument === null || argument === undefined) {
                let err = new Error(`The input '${command}' needs an argument`)
                err.code = COMMAND_ERROR;
                throw err;
            }
            
            const obtainedItem = game.takeItem(argument);
            response = `you've taken ${obtainedItem}`;
            return response;
        case 'where':
        case 'w': 
            response = 'you are in';
            const locationInformation = game.getLocationInformation();
            response += ` ${locationInformation.description}`;

            response += '\nand you can go to these location(s): '
            locationInformation.exits.forEach(exit => {
                response +=`\n- ${exit}`;
            });

            return response;
        case 'look':
        case 'l':
            response = 'you\'ve found';
            const items = game.getItems();
            if (items.length === 0) {
                response += ' no items at al';
            } 
            else {
                response += ' these items:';
                items.forEach(item => {
                    response +=`\n- ${item}`;
                });
            }
            return response;
        case 'goto':
        case 'g':
            if (argument === null || argument === undefined) {
                let err = new Error(`The input '${command}' needs an argument`)
                err.code = COMMAND_ERROR;
                throw err;
            }
            
            const locationDescription = game.goToLocation(argument);
            response = `you are in ${locationDescription}`;
            return response;
        case 'hello':
            return 'Hello human!';
        case 'help':
        return HELP_TEXT;
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            throw err;
    }
}