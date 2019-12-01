//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
$(document).ready(function() {

  var keyDown = false,
      dnf = false,
      plus2 = false,
      timeDelay=1000,
      pastTime=0,
      millisecs=0,secs=0,mins=0,
      h1 = $("#timeVal"),
      delBtn = $(".delBtn"),
      t, dnfBtn = $(".dnfBtn"),
      plus2Btn = $(".plus2Btn"),
      saveBtn = $(".saveBtn");
  $(document).keypress(function(e) {
      if(keyDown){
        return;
      }
    if(e.keyCode ===32){
      pastTime=$.now();
      keyDown=true;
      setTimeout(changeColour,timeDelay);
    }
  });
  $(document).keyup(function(e) {
      if (e.keyCode === 32) {
          keyDown=false;
          $("body").css("background-color","#D8D4D4");
          if($.now()-pastTime>=timeDelay){
            if((millisecs+secs+mins)>0){
              save();
              return;
            }
           startStopwatch();
          }else{
            clearTimeout(t);
            showBtns();
          }
      }
  });
  function startStopwatch(){
   t = setTimeout(add,10)
  }
  function add() {
        millisecs++;
        if (millisecs >= 100) {
            millisecs = 0;
            secs++;
            if (secs >= 60) {
                secs = 0;
                mins++;
            }
        }
        let str = (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (millisecs > 9 ? millisecs : "0" + millisecs);

        h1.html(str);
        startStopwatch();
    }
  function changeColour(){
    if(keyDown&&$.now()-pastTime>=timeDelay){
      $("body").css("background-color","#00ff00");
    }
  }
  function resetClock() {
      millisecs = 0;
      secs  = 0;
      mins=0;
      h1.html("00:00:00");
      running = false;
      stopped = true;
      keyDown = false;
      if(delBtn.is(":visible")){
        hideBtns();
      }

  }
  function showBtns() {
      delBtn.css("visibility","true");
      plus2Btn.show();
      dnfBtn.show();
      saveBtn.show();
  }
  function save() {
        if (plus) {
          secs+=2;
        }
        if (dnf) {

        }
        resetClock();
    }

});
