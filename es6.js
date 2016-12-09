
/*********************************************************************************************
 **************************** A BRIEF HISTORY OF JAVASCRIPT **********************************
 *********************************************************************************************

    1995

        JavaScript created at Netscape.  Originally named Mocha, then LiveScript, then JavaScript because Java was popular. 

    1995 - 1997

        Netscape takes JavaScript to EMCA, it becomes EMCAScript - JavaScript is an implementation of that.  So are JScript and ActionScript.

    June 1997

        EMCAScript 1 released.

    June 1998

        EMCAScript 2 released.

    Dec 1999

        EMCAScript 3

    2000-2003

        EMCAScript 4 abandoned, jQuery, Prototype, etc. are introduced.  JavaScript undergoes a bit of a renaissance. 

    2003

        ActionScript and JScript implement a lot of ES4 features, but they never make it to the browser.  Oops.

    Feb 2005

        The term AJAX is coined.

    Fall of 2005 

        Work starts on ES4 again, based on everything learned in the last few years

    Fall of 2005

        Two camps emerged: EMCAScript 4 camp, including Adobe, Mozilla, Opera and Google.  EMCAScript 3.1 camp was Microsoft and Yahoo.

    July 2008

        They finally figure it out:
        - EMCAScript 3.1 becomes EMCAScript 5 - an incremental upgrade on ES3.  
        - EMCAScript 4 becomes EMCAScript 6, code named "Harmony" (A name which you may have seen here and there)

    Dec 2009

        EMCAScript 5 is released.  Supported by all browsers except IE8.  Includes:

        - JSON parsing/serialization
        - Array prototype methods (map, forEach)
        - Mehods for listing properties (Object.keys)
        - Allows dangling commas on lists/object definitions
        - Introduces 'strict' mode

    2013

        Original planned release of EMCAScript 6.  Didn't happen.

    2014

        Decided to rename EMCAScript 6 to EMCAScript 2015 because they wanted to have a yearly release schedule.  People still just called it ES6.

    2015

        EMCAScript 6/2015/Harmony/next/wtf officially released.  They decided it was still too ambitious, so some features still didn't make it in.

        This the release we'll look at below!   Browser support is pretty excellent at this point: http://kangax.github.io/compat-table/es6/

    2016

        EMCAScript 7 / EMCAScript 2016 bandied about - releases are intended to be more incremental from now on.


/*********************************************************************************************
 ************************************* REFERENCE *********************************************
 *********************************************************************************************

ES History: http://www.benmvp.com/learning-es6-history-of-ecmascript/
ES6 Features Overview: http://es6-features.org/
ES6 Features Overview from Babel: https://babeljs.io/docs/learn-es2015/
ES6 browser support: http://kangax.github.io/compat-table/es6/
ES6 implementation performance: http://kpdecker.github.io/six-speed/

/*********************************************************************************************
 ************************************* Constants *********************************************
 *********************************************************************************************

const LOOPS = 10;
const assignedOnce = {};
assignedOnce.changed = true; // acceptable to change the contents of the object.
//assignedOnce = {}; // Not acceptable to change the object itself.
console.log(assignedOnce);

/*********************************************************************************************
 ******************************* Octal and binary literals ***********************************
 *********************************************************************************************

const octalDude = 0o11;
console.log("Octal is same? " + (octalDude === 9));

const binaryDude = 0b001001; // Don't need a certain number of bits: 0b00001001 === 0b1001
console.log("Binary is same? " + (binaryDude === 9));

/*********************************************************************************************
 ******************************* Property shorthand for objects ******************************
 *********************************************************************************************

let x = 2;
let y = 4;
let shorty = { x, y };
console.log(shorty); // { x: 2, y: 4 }

/*********************************************************************************************
 ******************************* Computed property names *************************************
 *********************************************************************************************

let compy = { 
    foo: 'bar',
    [ 'hah' + 7 ]: 'magical'
}
console.log(compy.hah7); // magical

/*********************************************************************************************
 ******************************* Block-scoped variables with 'let' ***************************
 *********************************************************************************************

const colors = ['red', 'green', 'blue'];

// First, old school var declarations get hoisted.
for (var i = 0; i < colors.length; i++) {
    var curColor = colors[i];
}

// Ugh.  Definitely not block-scoped.
console.log(i);
console.log(curColor);

// Now let's try that again with 'let'
for (let j = 0; j < colors.length; j++) {
    let color = colors[j];
}

//console.log(j); // Uncaught ReferenceError: j is not defined
//console.log(color); // Uncaught ReferenceError: curColor is not defined

/*********************************************************************************************
 ************************************* Classes ***********************************************
 *********************************************************************************************

class Thingy {
    constructor(type) {
        this.type = type;
    }

    getThingyType() {
        return this.type;
    }

    static iDonCare() {
        return "I'm totally static, dude! And I overwrote that crap!";
    }
}

class Breadbox extends Thingy {
    constructor(type, color, size) {
        super(type);

        this.color = color;
        this.size = size; 
    }

    /*********************************************************************************************
     ******************************** 'this' works as you'd expect! ******************************
     *********************************************************************************************
    
    describe() {
        return "I am a " + this.size + ", " + this.color + " " + this.getThingyType() + ".";
    }

    /*********************************************************************************************
     ******************************** Template literals ******************************************
     ********************************************************************************************
    withTemplateLiteral() {
        return `I am a ${this.size}, ${this.color} ${this.getThingyType()}.`
    }

    withMultiline() {
        return `I am a ${this.size}, 
            ${this.color} ${this.getThingyType()}.  
    So poetic.`;
    }

    /*********************************************************************************************
     ******************************** Static members *********************************************
     *********************************************************************************************
    static iDunCare() {
        return "I'm totally static, dude! And I overwrote that crap!";
    }

    /*********************************************************************************************
     ******************************** Getters and setters ****************************************
     *********************************************************************************************
    get thingyType() {
        return this.type;
    }

    set thingyType(type) {
        this.type = type;
    }
}

console.log(Breadbox.iDunCare());

let bb = new Breadbox("breadbox", "blue", "enormous");
console.log(bb.thingyType);


/*********************************************************************************************
 ******************************** Arrow Functions ********************************************
 *********************************************************************************************

// ARROW FUNCTIONS

const colors = ['red', 'green', 'blue'];

// For reference, an old school anonymous function
colors.forEach(function(color) {
    console.log(color);
});

// Now as an arrow function
colors.forEach((color) => {
    console.log(color);
});

// Now with an arrow function with minimal syntactic gunk
colors.forEach(color => console.log(color));

// Assign me as normal!
let stabby = color => console.log(color);
colors.forEach(stabby);

// Requires parens when no args
let noParamsStabby = () => console.log("woot");

// Note, no 'return' keyword necessary
let objectLiteralStabby = () => ({foo: 'bar'});
console.log(objectLiteralStabby());

/*********************************************************************************************
 ******************************** Binding of 'this' in lambdas *******************************
 *********************************************************************************************

class StationWagon {
    constructor(turnRadius, cargoCapacity) {
        this.turnRadius = turnRadius;
        this.cargoCapacity = cargoCapacity;
    }

    oldSchoolWithSelf() {
        // 'this' is not available in the anonymous function.  People often use 'self' as a way of getting 'this' into scope.
        let self = this;
        let evaluator = function() {
            return `My crappy turn radius is ${self.turnRadius} and I can haul ${self.cargoCapacity} stuff.`;
        }
        return evaluator();
    }

    oldSchoolWithBind() {
        let evaluator = function() {
            return `My crappy turn radius is ${this.turnRadius} and I can haul ${this.cargoCapacity} stuff.`;
        }.bind(this); // We can bind 'this' to the function instead.
        return evaluator();
    }

    withArrowFunction() {
        // In ES6, we can use an arrow function.  'this' is lexical - i.e., from the surroundings.  
        // There are some subtle rules here: https://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/
        let evaluator = () => `My crappy turn radius is ${this.turnRadius} and I can haul ${this.cargoCapacity} stuff.`;
        
        return evaluator();
    }

    // The "arguments" variable also stays in scope.
    argumentsToo(thingy) {
        let evaluator = () => {
            console.log(arguments);
            return thingy;
        }
        return evaluator();
    }
}

/*********************************************************************************************
 ******************************** Method notation in objects *********************************
 *********************************************************************************************

let zeCar = {
    name(aka) {
        return `My car's name is Henry, aka ${aka}`;
    }
}

console.log(zeCar.name("The Bedazzler"));

/*********************************************************************************************
 ******************************** Array and Object destructuring assignment ******************
 *********************************************************************************************

let otherColors = ['purple', 'turquoise', 'teal'];
let [ one, , three, four = 'red', five ] = otherColors; // note the default
console.log(one); // purple
console.log(three); // teal
console.log(four); // red
console.log(five); // undefined

let [ wut, umm ] = [ three, one ];
console.log(wut); // teal
console.log(umm); // purple

let deep = {
    one: 'gah',
    two: 'meh',
    three: {
        four: 'bleh',
        five: 'umm'
    }
}

let { one: theFirst, three: { four: theFourth } } = deep;

console.log(theFirst); // gah
console.log(theFourth); // bleh

/*********************************************************************************************
 ******************************** Function destructuring assignment **************************
 *********************************************************************************************

function destructureMeArray([name, color]) {
    return `My name is ${name} and I'm ${color}`;
}

console.log(destructureMeArray(["Horace", "blue"]));

function destructureMeObject({name: n, color: c}) {
    return `My name is ${n} and I'm ${c}`;
}

console.log(destructureMeObject({name: "Horace", color: "blue" }));

function destructureMeObjectShorthand({name, color}) {
    return `My name is ${name} and I'm ${color}`;
}

let thingy = {name: "Horace", color: "blue" };
console.log(destructureMeObject(thingy));

/*********************************************************************************************
 ******************************** Generator functions ****************************************
 *********************************************************************************************

// Can also make generators as part of classes (just add * before the method definition)
function* awesomeifier(things) {
    for (let i = 0; i < things.length; i++) {
        let thing = things[i];
        yield thing + " is now awesome!";
    }
} 

let people = ['bob', 'jonny', 'frank'];

for (let awesomed of awesomeifier(people)) {
    console.log(awesomed);
}

let awesomedPeople = [...awesomeifier(people)]
console.log(awesomedPeople);

/*********************************************************************************************
 ******************************** Sets *******************************************************
 *********************************************************************************************

let happyColors = new Set();
happyColors.add('yellow');
happyColors.add('orange');
happyColors.add('yellow');

console.log(happyColors.size); // 2
console.log(happyColors.has('orange')); // true
console.log(happyColors.has('black')); // false

for (let aColor of happyColors.values()) { // order they were inserted
    console.log(aColor); 
}

/*********************************************************************************************
 ******************************** Maps *******************************************************
 *********************************************************************************************
let sadHues = new Map();
sadHues.set('purple', 'kinda dark');
sadHues.set('black', 'as my soul');
sadHues.set('purple', 'but really dark');
console.log(sadHues.size); // 2
console.log(sadHues.get('purple')); // really dark
for (let [ color, hue ] of sadHues.entries()) {
    console.log(color + " " + hue);
}

/*********************************************************************************************
 ******************************** Object.assign() ********************************************
 *********************************************************************************************

// Essentially merges objects

let foo1 = {
    one: 'first',
    two: 'second',
}

let foo2 = {
    two: 'other second',
    three: 'other third'
}

let foo = Object.assign(foo1, foo2);

console.log(foo); // { one: 'first', two: 'other second', three: 'other third'}
console.log(foo === foo1); // true, they're the same object.
console.log(foo === foo2); // false, they're not the same object.

// To create a new object:

foo = Object.assign({}, foo1, foo2);
console.log(foo === foo1); // false, they're not the same object.
console.log(foo === foo2); // false, they're not the same object.

let bar1 = {
    one: {
        two: 'second',
        three: 'third'
    },
    four: 'fourth'
}

let bar2 = {
    one: {
        two: 'other second',
        five: 'fifth'
    }
}

let bar = Object.assign({}, bar1, bar2);
console.log(bar); // Does NOT deep merge - key 'one' from bar2 is used

/*********************************************************************************************
 ******************************** Array.find() ***********************************************
 *********************************************************************************************

let numbahs = [1, 2, 3, 4, 5].find(x => x > 3);
console.log(numbahs); // 4

/*********************************************************************************************
 ******************************** String functions *******************************************
 *********************************************************************************************

console.log("Potter".repeat(12));
console.log("Weasley".repeat(2));

console.log("It's a Snape".startsWith("It's")); // true
console.log("It's a Snape".endsWith("Snape")); // true
console.log("It's a Snape".includes(" a ")); // true
console.log("It's a Snape".includes(" a ", 6)); // false (does it include it after index 6?)

/*********************************************************************************************
 ******************************** Promises ***************************************************
 *********************************************************************************************

function waitSomeSeconds(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${timeout} milliseconds are up!`);
        }, timeout);
    });
}

waitSomeSeconds(2000).then((message) => {
    console.log(message);
})

Promise.all([
    waitSomeSeconds(2000),
    waitSomeSeconds(5000)
]).then(allMessages => {
    let [ message1, message2 ] = allMessages;
    console.log(message1 + " and " + message2);
});

/*********************************************************************************************
 ******************************** Reflection *************************************************
 *********************************************************************************************/

let shiny = {
    foo: 'bar',
    buh: 'wut'
}

console.log(Reflect.ownKeys(shiny));

