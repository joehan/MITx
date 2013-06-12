function test_clear(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.clearRect(0,0,JQcanvas.width(),JQcanvas.height());//x,y,w,h
    
}
function test_line() {
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(150,150);
    ctx.lineWidth = 10
    ctx.strokeStyle= 'red';
    ctx.lineCap= 'round';
    ctx.stroke();
}
function test_box() {
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(150,50);
    ctx.lineTo(150,150);
    ctx.lineTo(50,150);
    ctx.lineTo(50,50);
    ctx.lineCap='round';
    ctx.lineWidth=5;
    ctx.strokeStyle= 'red';
    ctx.lineJoin='round';
    ctx.fillStyle='#45379f';
    ctx.stroke();
    ctx.fill();
}
function test_rect(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle='red';
    ctx.fillRect(25,25,75,75);
    ctx.fillStyle='blue';
    ctx.fillRect(50,50,75,75);
}
function test_smiley(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(100,100,75,0,2*Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle='black';
    ctx.lineWidth=10;
    ctx.fill();
    ctx.stroke;
    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.arc(70,70,10,0,2*Math.PI);
    ctx.arc(130,70,10,0,2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100,130,30,Math.PI,2*Math.PI);
    ctx.stroke();
}
function test_text(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle='#000000'
    ctx.font='20px Helvetica'
    ctx.textAlign ='center';
    ctx.textBaseline='middle'
    ctx.fillText('Middle',100,100)
    
}

function test_mouse(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    var bg_image = $('<canvas></canvas>')[0];
    bg_image.width=200
    bg_image.height=200
    var bctx = bg_image.getContext('2d')
    bctx.fillStyle='#326949'
    bctx.fillRect(0,0,200,200)
    ctx.drawImage(bg_image,0,0)
    JQcanvas.on('mousemove',function(event){
        var mx = event.pageX;
        var my = event.pageY;
        var offset= JQcanvas.offset();
        mx= Math.round(mx-offset.left);
        my= Math.round(my-offset.top);    
        ctx.beginPath();
        ctx.moveTo(mx-10,my);
        ctx.lineTo(mx+10,my);
        ctx.moveTo(mx,my-10);
        ctx.lineTo(mx,my+10);
        ctx.strokeStyle='black';
        ctx.lineWidth=2; 
        ctx.drawImage(bg_image,0,0)
        ctx.stroke();
        
    });
}