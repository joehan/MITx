var sys = require("sys"),  
my_http = require("http");  
my_url = require("url");
my_http.createServer(function(request,response){  
    sys.puts("I got kicked");
    
    var cQI = my_url.parse(request.url, true).query.cQI
    var ans = my_url.parse(request.url, true).query.answer
    var questions = [{'questionText': 'Sam thinks y = 2x goes to _____ as x goes from 1 to 10', options:['increses', 'decreases', '+ then -', '- then +'], 'solnIndex':0},
                    {'questionText': 'Jack thinks y = -2x goes to _____ as x goes from 1 to 10', options:['increses', 'decreases', '+ then -', '- then +'], 'solnIndex':1}];//contains questionText, solutions, options
    
    var question = questions[cQI]
    
   var checkAns = (function(ques, ans){
        return ques.solnIndex == ans
       
   });
    
    
    response.writeHeader(200, {"Content-Type": "text/plain",
                              "Access-Control-Allow-Origin":"*"
                              });  
    response.write(""+checkAns(question, ans));  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");  