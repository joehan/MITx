// expression that's being built up.  Always the same as the output display.
var expression = "122+255";
$(document).ready(function(){
    $('.numbutton').bind("click", function(event){
        expression+=$(event.target).text()
        $('#output').text(expression)
    });
    $('#equals').bind("click", function(){
        expression=calculate(expression)
        $('#output').text(expression)
    });
});

function read_operand(tokenArray) {
    var operand = tokenArray.shift();
    if (operand == '(') {
        operand = evaluate(tokenArray)
    }
    operand = parseInt(operand)
    if (isNaN(operand)){
        throw 'Number expected';
    }
    else {
        return operand;
    }
}
function evaluate(tokenArray) {
    if (tokenArray.length<1) {
        throw 'Missing operand';
    }
    var value = read_operand(tokenArray);
    while (tokenArray.length>=1) {
        var operator = tokenArray.shift();
        var valid_operators = ['+', '-','*','/',')','(','\u00f7','\u00D7','\u2212'];
        if ($.inArray(operator, valid_operators) == -1){ //jQuery.inArray is used to check if the operator is valid. If perator is not in the array valid_operators, inArray returns -1.
            throw 'Invalid operator';
        }
        if (operator == ')') {
            return value;
        }
        var tempOperand = read_operand(tokenArray);
        //The following section is porbably not the best way to do this- it seems repetitive. I should replace this at some point.
        if (operator == "+") {
            value =  value + tempOperand;
        }
        if ((operator == "-")||(operator=='\u2212')) {
            value =  value - tempOperand;
        }
        if ((operator == "*")||(operator=='\u00D7')) {
            value =  value * tempOperand;
        }
        if ((operator == "/") || (operator == '\u00f7')) {
            value = value / tempOperand;
        }
    }
    return value
}    
function calculate(text) {
    var pattern = /\d+|\+|\-|\*|\/|\(|\)|\u00F7|\u00D7|\u2212/g;
    var tokens = text.match(pattern);
    var value = evaluate(tokens);
    if (tokens.length>0){
        throw 'Ill formed expression';
    }
    else {
        return value;
    }
}

