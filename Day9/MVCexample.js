var counter = (function () {
    
    
    function EventHandler(){
        var handlers = {}
        function on(event_string, callback){
            var cblist= handlers[event_string];
            if (cblist===undefined){
                cblist=[];
                handlers[event_string]=cblist;
            }
            cblist.push(callback)
        }
        function trigger(event_string, data){
            var cblist = handlers[event_string]
            if (cblist!==undefined){
                for(var i=0;i<cblist.length;i++){
                    cblist[i](data)}
            }
        }
        return {on:on, trigger:trigger}
        
    }
    
    function Model(){
        var eventHandler = EventHandler();
        var count = 0;
        function plusOne(){
            count += 1
            console.log('boop')
            eventHandler.trigger('update', count)
        }
        
        function reset(){
            count=0
            eventHandler.trigger('update', count)
        }
        
        function getCount(){
            console.log('boop')
            return count;
            
        }
        
        return{plusOne: plusOne, reset:reset, getCount:getCount, on:eventHandler.on};
    }
    
    function Controller(model){
        function increment(){
            console.log('Controller');
            model.plusOne()
            
        }
        
        return {increment:increment};
        //increment fn:cause value to increment
    }
    
    function View(div, model, controller){
        
        var display = $('<div class="count">The current value is <span>'+model.getCount()+'</span></div>')  
        $(div).append(display)
        var counterValue = display.find('span')
        function update(cval){
            counterValue.text(cval)
        }
        model.on('update',update)
        return{update:update};
    }
    
    function setup(div){
        var model= Model()
        var controller= Controller(model);
        var view=View(div, model, controller)
        
        var button=$('<button>Increment</button>')
        div.append(button)
        button.on('click', controller.increment())
    }
    
    return{setup:setup};
}())

$(document).ready(function(){
    $('.counter').each(function(){
        counter.setup($(this));
    });
});