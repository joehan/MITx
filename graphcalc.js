function setup_calc(div) {
    var background = $("<div class='background'></div>");
    var graph_window = $("<canvas class='graph_window'></canvas>");
    var func_textbox = $("<input id='func' width='30' />");
    var min_textbox = $("<input id='min' width='15' />");
    var max_textbox = $("<input id='max' width='15' />");
    var plot_button = $("<button id='plot_button'></button> ");
    
    $(div).append(background);
    background.append(graph_window)
        .append($("<div id='line1'></div>"))
        .append($("<div id = 'line2'></div>"))
        .append($("<div id = 'line3'></div>"));
    $('#line1').append('f(x)')
        .append(func_textbox);
    $('#line2').append('min x')
        .append(min_textbox) 
        .append('max x')
        .append(max_textbox);
    $('#line3').append(plot_button);
    
    var graph_coords=function(coords){
        var JQcanvas = graph_window;
        var DOMcanvas = JQcanvas[0];
        var ctx = DOMcanvas.getContext('2d');
        
        var offset= 0;
        ctx.beginPath();
        ctx.moveTo(coords[0][0],coords[0][1]);
        for (var i=1;i<coords.length;i++){
             ctx.lineTo(i[0],i[1]);  
        }
    }
    var plot=function(){
        var equation = func_textbox.val();
        var min = parseInt(min_textbox.val());
        var max = parseInt(max_textbox.val());
        var points = generate_points(equation, min, max, .1);
        graph_coords(points)
        
    };
    plot_button.bind('click', plot);
}



$(document).ready(function(){
    $.each($('.graphcalc'), function(idx, elem) {
        setup_calc($(elem));
    });
    $('head').append('<link href="graphcalc.css" rel = "stylesheet"/>')
});    
    });
    $('head').append('<link href="graphcalc.css" rel = "stylesheet"/>')
});    
 
 
 
<<<<<<<<< saved version
function generate_points(f_x, min_x, max_x,step )
=========

>>>>>>>>> local version{
    var coords = []
    try{
    var tree = calculator.parse(f_x);
    for (x=min_x; x <max_x; x+=step){
        
        coords.push([x,calculator.evaluate(tree, {x:x})]);
    }
    }
    catch(e){
        console.log('Error in expression')
    }
    return coords;
}

