$(function(){
  let scrolls = null;
  let windowHeight = $(window).height()*1.5;
  console.log(windowHeight)
  $('#comback').click(function(){
    $(document).scrollTop(0) ;
  });
  window.onscroll = function(){
     scrolls = $(document).scrollTop();
     if(scrolls >=windowHeight){
      $('#comback').show()
     }else {
      $('#comback').hide()
     }
  }
});
