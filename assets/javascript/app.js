$(document).ready(function(){
  
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 30,
  timerOn: false,
  timerId : '',
    
  questions: {
    q1: "Osmanlı'da belli bir bölgede belirli bir dönemde vergi toplama hakkının devlet tarafından açık artırma yoluyla bireylere satılması sistemine ne denir?",
    q2: "Sakarya Meydan Muharebesi nerede gerçekleşmiştir?",
    q3: "Mustafa Kemal arkadaşlarıyla hangi gizli cemiyeti kurmuştur?",
    q4: "93 Harbi hangi yıllarda gerçekleşmiştir?",
    q5: "Osmanlı'dan ayrılan en son Balkan devleti hangisidir?",

},
  options: {
    q1: ["Mülteiz", "İltizam", "İntizam"],
    q2: ["Kütahya", "Polatlı", "Sakarya", "Muş"],
    q3: ["Vatan ve Hürriyet", "Hürriyet ve İtilaf", "Kuvay-ı Milliye", "İttihat ve Terakki"],
    q4: ["1890-1893", "1790-1793", "1892-1893", "1877-1878"],
    q5: ["Bulgaristan", "Sırbistan", "Arnavutluk", "Makedonya"],

},
  answers: {
    q1: "İltizam",
    q2: "Polatlı",
    q3: "Vatan ve Hürriyet",
    q4: "1877-1878",
    q5: "Arnavutluk",
 
  },
  startGame: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    clearTimeout(trivia.timerId);
    
    $('#game').show();
    
    $('#results').html('');
    
    $('#timer').text(trivia.timer);
    
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
  nextQuestion : function(){
    
    trivia.timer = 25;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    

    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    

    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  timerRunning : function(){

    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }

    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Doğru Cevap '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }

    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      

      $('#results')
        .html('<h3>Oynadığınız için teşekkürler</h3>'+
        '<p>Doğru: '+ trivia.correct +'</p>'+
        '<p>Yanlış: '+ trivia.incorrect +'</p>'+
        '<p>Cevaplanmamış: '+ trivia.unanswered +'</p>'+
        '<p>Tekrar Oynamak İster Misin</p>');
      
      // hide game sction
      $('#game').hide();
      

      $('#start').show();
    }
    
  },

  guessChecker : function() {
    

    var resultId;
    

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    

    if($(this).text() === currentAnswer){

      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      trivia.result = true;
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#results').html('<h3>Doğru Cevap!</h3>');
    }

    else{

      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      trivia.result = true;
      resultId = setTimeout(trivia.guessResult, 5000);
      $('#results').html('<h3>Bir daha ki sefere şansını dene '+ "Doğru cevap: " + currentAnswer +'</h3>');
    }
    
  },

  guessResult : function(){
    

    trivia.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();
    
    trivia.nextQuestion();
   
  }
}