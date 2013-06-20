var switchSide = (function (item){
        var pos = item.parent().attr('data-pos')
        var loc = item.parent().attr('data-loc')
        console.log(pos, loc)
        var target = '.bag'+pos
            if (loc = 'house'){
            item.parent().empty()
            $(target).append(item)
            
        }
})
$(document).ready(
    $('.item').each(function(){
        console.Log('click')
    })
)