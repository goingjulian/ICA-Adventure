let game = {};

const NOTHING_FOUND_STRING = "nothing";

let player = {
    location: 'town',
    items: []
};

let map = {
    forest: {
        description: 'a forest',
        // items: ['mushroom'],
        items: [],
        exits: ['town']
    },
    town: {
        description: 'a town',
        // items: ['coin','sword','axe'],
        items: ['coin'],
        exits: ['forest', 'mountain']
    },
    mountain: {
        description: 'a mountain range',
        items: [],
        exits: ['town']
    } 
};
console.log(map);

const originalValuesMap = Object.create(map);
const originalValuesPlayer = Object.create(player);

game.userWon = () => {
    for(let property in map) {
        if(map[property].items.length > 0) { return false; }
    }
    return true;
}

game.reset = () => {
    map = Object.create(originalValuesMap);
    player = Object.create(originalValuesPlayer);

    console.log(player);
}

//INVENTORY

/**
 * Returns the items the player is carrying.
 * @returns {Array} 
 */
game.getInventory = () => {    
    return [...player.items];
};

//GOTO

/**
 * Checks if there is a connection between the player current location 
 * and the location represented by the given locationName and moves the 
 * player to that location.
 * Otherwise it changes nothing.
 * 
 * @param {String} locationName - The name of the location the player wants to move to.
 * @returns {String} - The location the player is in after executing this function
 */

/**
 * !!!!!! FEEDBACK PLEASE !!!!!!!!!
 * I'm using Object.assign to essentially copy the variable in order to prevent edits to the original. 
 * Is this the right thing to do?
 */

game.goToLocation = locationName => {
    if(locationName in map && 
        locationName != player.location && 
        map[player.location].exits.includes(locationName)) {

        player.location = locationName;
    }

    return Object.assign(map[player.location].description);
};

//TAKE

/**
 * Checks if the item with the given itemName is in the list of 
 * items of the player's current location and transfers it to the player.
 * Otherwise it changes nothing.
 * 
 * @param {String} itemName - The name of the item.
 * @returns {String} - The name of the item that was taken. If nothing was taken, it returns 
 * the string 'nothing'
 */
game.takeItem = (itemName) => {
    const locationItems = map[player.location].items;

    if(locationItems.includes(itemName)) {
        locationItems.splice(locationItems.indexOf(itemName), 1);
        player.items.push(itemName);

        return itemName;
    } else { return NOTHING_FOUND_STRING }
};

//LOOK

//Returns a copy of the data
/**
 * Returns the list of items at the player's current location.
 * @returns {Array} 
 */
game.getItems = () => {
   return [...map[player.location].items];
}

//WHERE

/**
 * Returns an object containing the description and the 
 * exits of the players current location on the map.
 * @returns {Object}
 */
game.getLocationInformation = () => {
    return {description, exits} = map[player.location];
};

// module.exports = game;
