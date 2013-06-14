// expression that's being built up.  Always the same as the output display.
var expression = "";
$(document).ready(function(){
    $('.numbutton').bind("click", function(event){
        expression+=$(event.target).text()
        $('#output').text(expression)
    });
    $('.clearbutton').bind("click", function(event){
        expression=""
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
};
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
//var built_in_environment = {
//        pi: Math.PI,
//        e: Math.E,
//    };
//function new_environment() {
//    var env = {};
//    for (var v in built_in_environment) {
//        env[v] = built_in_environment[v];
//    }
//    return env;
//}
//exports.new_environment = new_environment;
//
//// if first token is t, consume it and return true
//function read_token(t, tokens) {
//    if (tokens.length > 0 && tokens[0] == t) {
//        tokens.shift();
//        return true;
//    }
//    return false;
//}
//function parse_expression(tokens) {
//        var expression = parse_term(tokens);
//        while (true) {
//            if (read_token('+', tokens)) {
//                expression = ['+', expression, parse_term(tokens)];
//            }
//            else if (read_token('-', tokens)) {
//                expression = ['-', expression, parse_term(tokens)];
//            }
//            else break;
//        }
//        return expression;
//    }
//
//    function parse_term(tokens) {
//        var term = parse_exp(tokens);
//        while (true) {
//            if (read_token('*', tokens)) {
//                term = ['*', term, parse_exp(tokens)];
//            }
//            else if (read_token('/', tokens)) {
//                term = ['/', term, parse_exp(tokens)];
//            }
//            else break;
//        }
//        return term;
//    }
//
//    function parse_exp(tokens) {
//        var term = parse_unary(tokens);
//        while (true) {
//            if (read_token('^', tokens)) {
//                term = ['^', term, parse_unary(tokens)];
//            }
//            else break;
//        }
//        return term;
//    }
//
//    function parse_unary(tokens) {
//        if (read_token('-', tokens)) {
//            return ['neg', parse_factor(tokens)];
//        }
//        else if (read_token('+', tokens)) {}
//        return parse_factor(tokens);
//    }
//
//
//    function parse_factor(tokens) {
//        if (read_token('(', tokens)) {
//            var exp = parse_expression(tokens);
//            if (read_token(')', tokens)) {
//                return exp;
//            }
//            else throw 'Missing ) in expression';
//        }
//        else if (tokens.length > 0) {
//            var token = tokens.shift();
//            if (token.search(/[a-zA-Z_]\w*/) != -1) {
//                // variable name
//                if (read_token('(', tokens)) {
//                    // a function call, parse the argument(s)
//                    var args = [];
//                    // code assumes at least one argument
//                    while (true) {
//                        args.push(parse_expression(tokens));
//                        if (read_token(',', tokens)) continue;
//                        if (read_token(')', tokens)) break;
//                        throw "Expected comma or close paren in function call";
//                    }
//                    if (!(token in built_in_functions)) throw "Call to unrecognized function: " + token;
//                    return ['call ' + token].concat(args);
//                }
//                // otherwise its just a reference to a variable
//                return token;
//            }
//            // only option left: a number
//            var n = parseFloat(token, 10);
//            if (isNaN(n)) throw 'Expected a number, got ' + String(token);
//            return n;
//        }
//        else throw 'Unexpected end of expression';
//    }
//
//function evaluate(tree, environment) {
//        if (environment === undefined) environment = built_in_environment;
//        if (typeof tree == 'number') return tree;
//        else if (typeof tree == 'string') return environment[tree]; // might be undefined
//        else {
//            // expecting [operator,tree,...]
//            var args = tree.slice(1).map(function(subtree) {
//                return evaluate(subtree, environment);
//            });
//            if (tree[0].search(/^call /) != -1) {
//                // call of built-in function
//                var f = tree[0].slice(5);
//                f = built_in_functions[f];
//                if (f === undefined) throw "Unknown function: " + f;
//                return f.apply(undefined, args);
//            }
//            // otherwise its just an operator
//            else switch (tree[0]) {
//            case 'neg':
//                return -args[0];
//            case '+':
//                return args[0] + args[1];
//            case '-':
//                return args[0] - args[1];
//            case '*':
//                return args[0] * args[1];
//            case '/':
//                return args[0] / args[1];
//            case '^':
//                return Math.pow(args[0],args[1]);   
//            default:
//                throw 'Unrecognized operator ' + tree[0];
//            }
//        }
//    }
//function calculate(expression){
//    var expressionHolder = parse_expression(expression);
//    expression = evaluate(expressionHolder)
//    return expression
//}