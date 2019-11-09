//Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//You can use CoffeeScript in this file: http://coffeescript.org/
//x = event.which || event.keyCode;
var running =false;
var pastTime=$.now();
var millsecs=0,secs=0,mins=0,h1=$(".stopwatch-body > h1"),t;
$(document).keypress(function(e){
  let currentTime = $.now();
  if(e.keyCode==32&&!running){
    pastTime=currentTime;
    running=true;
  }else if(e.keyCode==32){
    setTimeout(t);
  }

});
$(document).keyup(function(e){
  if(e.keyCode==32){
    let currentTime = $.now();
    if(currentTime-pastTime>=100){
         stopwatch();
    }else{
        running=false;
    }

  }
});
function stopwatch() {
    t = setTimeout(add, 1);
}
function add(){
  millsecs++;
  if(millsecs>=1000){
    millsecs=0;
    secs++;
    if(secs>=60){
      secs=0;
      mins++;
    }
  }
  let str=(mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (millsecs > 9 ? millsecs : "0" + millsecs);
  $("h1").last().html(str);
  stopwatch();
}
