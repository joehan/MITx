function read_operand(tokenArray) {
    
    var operand = parseInt( tokenArray.shift() );
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
        var valid_operators = ['+', '-','*','/'];
        if ($.inArray(operator, valid_operators) == -1){ //jQuery.inArray is used to check if the operator is valid. If perator is not in the array valid_operators, inArray returns -1.
            
        }
    }
}
    
function calculate(text) {
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens = text.match(pattern);
    return JSON.stringify(tokens);
}
function setup_calc(div) {
    var input =$('<input></input>', {type: "text", size:50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function() {
        output.text(calculate(input.val()));
    });
    $(div).append(input,button,output);
}

$(document).ready(function(){
    $('.calculator').each(function() {
        setup_calc(this);
    });
});