/*
TODO:
Make value box update on each movement
Make a weight limit
    -change values so that the problem has an answer
Enforce a weight limit
    -Make value text red, inform user that they are over limit, suggest they put some stuff back
Tell user that they are  winnar if they find the correct answer
New images
css styling

*/
var populated= false;


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
    weightOutput.text('Total weight:' +totalWeight+'lbs')
});



var switchSide = (function (item){
    var pos = item.parent().attr('data-pos')
    var loc = item.parent().attr('data-loc')
    console.log(pos, loc)
    if (loc == 'house'){
        var target = '.bag'+pos
        var info = item.parent().text()
        item.parent().empty()
        $(target).append(item).append(info)
        .attr('data-on',true)
        console.log('bag'+$(target).attr('data-on'))
    }
    else if (loc == 'bag'){
        var target = '.house'+pos
        var info = item.parent().text()
        item.parent().empty()
        $(target).append(item).append(info)
        .attr('data-on', true)
        console.log('house'+$(target).attr('data-on'))
    }
    item.parent().attr('data-on',false)
    console.log('other'+item.parent().attr('data-on'))
    populateValues($('.house'), $('.housePrice'), $('.houseWeight'))
    populateValues($('.bag'), $('.bagPrice'), $('.bagWeight'))
})

$(document).ready(function(){  
    populateValues($('.house'), $('.housePrice'), $('.houseWeight'))
})