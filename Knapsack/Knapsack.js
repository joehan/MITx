/*
TODO:
    -change values so that the problem has an answer
Enforce a weight limit
    -Make value text red, inform user that they are over limit, suggest they put some stuff back
Tell user that they are  winnar if they find the correct answer
New images
css styling

*/
var populated= false;//When this is false(the first time populate values is run), populateValues will produce the price and wieght tags underneath each item. It is then set to true, so that there are multiple labels on each item.
var weightLimit= 200;//The constraint on the weight.

var valueList = [{'price':110, 'weight':100}, {'price':35, 'weight':25}, {'price':200, 'weight':200} ,{'price':5, 'weight':5}, {'price':130, 'weight':105}, {'price':100, 'weight':70}]//Contains the prices and weights of each item, going left to right, first then second row. Changing them here will change the computed values and the displayed value.

var winningPrice= 265;//The win condition. 


//populateValues is used to produce the text displaying price and weight underneath each item, and to calculate and display the total weight. It also call helper functions to check if the bag is over the limit and if the problem is solved
var populateValues = (function(div, priceOutput, weightOutput){
    var totalPrice= 0
    var totalWeight= 0
    var children = div.children().children()
    for(var i=0;i<children.length;i++){
        var present = $(children[i]).attr('data-on')
        if (present=='true'){
            var price = valueList[i].price
            var weight = valueList[i].weight
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


//switchSide is used to move the contents of 1 placeholder div to the corresponding one on the opposite side. This calls populateValues in order to update the total price and weight left under each box displayed underneath each box
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
    populateValues($('.bag'), $('.bagPrice'), $('.bagWeight'))
})

//limitChecker checks if the inputted weight is less than the inputted limit. It is used with totalWeight and weightLimit. Depending on the results, it adds and removes classes to modify CSS and change the color and visibility of text.
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