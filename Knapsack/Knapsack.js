/*
TODO:
    -change values so that the problem has an answer
Enforce a weight limit
    -Make value text red, inform user that they are over limit, suggest they put some stuff back
Tell user that they are  winnar if they find the correct answer
New images
css styling

*/
var populated= false;
var weightLimit= 200;

var valueList = [{'price':110, 'weight':100}, {'price':35, 'weight':25}, {'price':200, 'weight':200} ,{'price':5, 'weight':5}, {'price':130, 'weight':105}, {'price':100, 'weight':70}]

var winningPrice= 265;

var populateValues = (function(div, priceOutput, weightOutput){
    var totalPrice= 0
    var totalWeight= 0
    var children = div.children().children()
    for(var i=0;i<children.length;i++){
        var present = $(children[i]).attr('data-on')
        if (present=='true'){
            var price = $(children[i]).attr('data-price')
            var weight = $(children[i]).attr('data-weight')
            totalPrice+= parseInt(price)
            totalWeight+=parseInt(weight)
            if (!populated){
                $(children[i]).append('$'+price+' '+weight+'lbs');
            }
        }
    }
    populated=true
    priceOutput.text('Total Price: $'+totalPrice)
    weightOutput.text('Weight Left: ' +(weightLimit-totalWeight)+'lbs')
    if (div.hasClass('bag')){
        limitChecker(weightLimit, totalWeight)
        winChecker(totalWeight,totalPrice,weightLimit,winningPrice)
    }
});



var switchSide = (function (item){
    var pos = item.parent().attr('data-pos')
    var loc = item.parent().attr('data-loc')
    console.log(pos, loc)
    if (loc == 'house'){
        var target = '.bag'+pos
        var info = item.parent().text()
        item.parent().attr('data-on', false).empty()
        $(target).append(item).append(info)
        .attr('data-on',true)
        console.log('bag'+$(target).attr('data-on'))
    }
    else if (loc == 'bag'){
        var target = '.house'+pos
        var info = item.parent().text()
        item.parent().attr('data-on', false).empty()
        $(target).append(item).append(info)
        .attr('data-on', true)
        console.log('house'+$(target).attr('data-on'))
    }
    console.log('other'+item.parent().attr('data-on'))
    populateValues($('.house'), $('.housePrice'), $('.houseWeight'))
    populateValues($('.bag'), $('.bagPrice'), $('.bagWeight'))
})


var limitChecker =(function(limit, weight){
    if (weight>limit){
        $('.bagPrice').addClass('overLimit')
        $('.bagWeight').addClass('overLimit')
        $('.warning').removeClass('notVisible')
    }
    else{
        $('.bagPrice').removeClass('overLimit')
        $('.bagWeight').removeClass('overLimit')
        $('.warning').addClass('notVisible')
        
    }
    
})

var winChecker = (function(weight, price, weightLimit, winPrice){
    if ((weight<=weightLimit)&&(price==winPrice)){
        $('.warning').addClass('winner').removeClass('notVisible').text('Congratulations! You win!')
        $('.bagPrice').addClass('winner')
        $('.bagWeight').addClass('winner')
    }
    else{
        $('.bagPrice').removeClass('winner')
        $('.bagWeight').removeClass('winner')
        $('.warning').removeClass('winner').text('Too heavy! Try putting some stuff back.')
    }
})

$(document).ready(function(){  
    populateValues($('.house'), $('.housePrice'), $('.houseWeight'))
    populateValues($('.bag'), $('.bagPrice'),$('.bagWeight'))
})