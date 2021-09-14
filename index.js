'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
    if (s.length % 2 !== 0) return "NO";
    let stack = []
    let res = 'NO'
    for( let i = 0; i < s.length; i++){
        if( stack.length === 0 || isOpeningBracket(s[i])){
            stack.push(s[i])
        } else {
            if(matchesClosing(stack[stack.length - 1], s[i])){
                stack.pop()
            }
        }
    }
    
    if(stack.length === 0) res = 'YES'
    
    return res
    
}

function matchesClosing(openingChar, closingChar){
    const tempPair = openingChar + closingChar
    if( tempPair === '[]' || 
    tempPair === '()' ||
    tempPair === '{}' ) {
        return true
    }
    
    return false
}

function isOpeningBracket(char){
    if( char === '[' || 
    char === '(' ||
    char === '{' ) {
        return true
    }
    return false
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
