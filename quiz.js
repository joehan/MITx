Parse.initialize("juAtaRefP6h38DGNrixK5VSeUajQtBhmvpAB8E4T", "9Tl65yTOEWHZyPuGfD103Qe8yU2RmfmX5fUVm8F0")
//var TestObject = Parse.Object.extend("TestObject");
//var testObject = new TestObject();
//testObject.save({foo: "bar"}, {
//  success: function(object) {
//    alert("yay! it worked");
//  }
//});

var quiz = (function(){
    
   
    var exports = {}
    var useLocal= true;
    if (useLocal)   {
        if (localStorage.cQI==undefined){
            var score = 0//student's current score
            var currentQuestionIndex = 0; // student's current question
        }
        else {
            var score = localStorage.score
            var currentQuestionIndex = localStorage.qCI
        }
    }
    
    if(!useLocal){
        
        var progress = Parse.Object.extend("progress");
        
        var query = new Parse.Query(progress)
        if (query.find().length == 0){
            var myProg = new progress
            myProg.set("score", 0).set("cQI", 0)
        }
        else{
            var myProg = query.find()[0]
        }
    }
    
    var questions = [{'questionText': 'Sam thinks y = 2x goes to _____ as x goes from 1 to 10', options:['increses', 'decreases', '+ then -', '- then +'], 'solnIndex':0},
                    {'questionText': 'Jack thinks y = -2x goes to _____ as x goes from 1 to 10', options:['increses', 'decreases', '+ then -', '- then +'], 'solnIndex':1}];//contains questionText, solutions, options
    
    var answers= [];//Student's input answers
    var question = questions[currentQuestionIndex]
    
    var checkAnswer = (function(ans){
//        console.log('checked');
//        var helpMe = question.solnIndex
//        var checker =  helpMe == ans
//        return checker
        var req = $.ajax({
            url:"http://localhost:8080/",
            data: {id : 10, 'answer':ans, 'cQI':currentQuestionIndex}}).done(function(msg){
            console.log(msg);
            return(msg)
        });
        return req;
    });
        
    //Compares student's answer to correct answer
    
    
    var getAnswers = (function(){
        var answer= $('input[name="option' + currentQuestionIndex + '"]:checked').val();
        bool = checkAnswer(answer);
        if (bool){
            incrementScore();
            console.log(score);
            
        }
        questionDone(checkAnswer(answer))
        
    })
    
    var questionDone = (function(bool) {
        $('.checkAnswer').off('click').text("Next Question").on("click", displayQuestion)
        currentQuestionIndex += 1;
        localStorage.cQI = currentQuestionIndex
        localStorage.score = score
        
        if (bool) {
            $('.quiz').append('Correct! Score:'+score);
        }
        else {
            $('.quiz').append('Wrong ): Score:'+score);
        }
      
        
        
    });
    
    var displayQuestion = (function(){
        if (currentQuestionIndex<questions.length){
            console.log('Question displayed')
            $('.quiz').empty()
            question = questions[currentQuestionIndex]
            var questionText = $("<div class = 'questiontext'>" + (currentQuestionIndex+1)+ ':'+ questions[currentQuestionIndex].questionText +"</div>")
            var options = $('<div></div>')
            for (var i=0;i<questions[currentQuestionIndex].options.length;i++){
                var option = $('<div>', {class:'option'})
                var radio= $("<input>",{type: "radio",
                                        name: "option" + currentQuestionIndex,
                                        value: i});
                option.append(radio , questions[currentQuestionIndex].options[i])
                options.append(option)
            }
            var checkAnswerButton = $('<button>', {class:'checkAnswer',
                                                    text:'Check Answer'})
            $('.quiz').append(questionText)
            $('.quiz').append(options)
            $('.quiz').append(checkAnswerButton)
            $('.checkAnswer').on('click' , getAnswers)
        }
        //if there are questions left, display the next question.
        else{
            $('.quiz').empty().append("Quize Finshed! Final Score:" + localStorage.score + "/" + questions.length)
            var tryAgain = $('<button>', {class:"tryAgain",
                                          text:"Try Again"
                                         })
            $('.quiz').append(tryAgain)
            tryAgain.on('click', (function(){
                localStorage.clear()
                $('.quiz').empty().append("Refresh and you're ready to go!")
                
            }));
        }
    });//Builds html to display the question
    
    var incrementScore = (function(){
        score++;
    });//Adds to score
    
    var setup = (function(){
        displayQuestion();
        
    });//Called at runtime
    
    exports.setup = setup
    return exports
})();


$(document).ready(function(){
    quiz.setup()
    
    
});