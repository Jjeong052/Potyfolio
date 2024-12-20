$(document).ready(function(){
  
  let typingExecuted = false; // 타이핑 애니메이션 실행 여부를 저장하는 변수
  let typingInProgress = false; // 타이핑 중인지 여부를 추적하는 변수

  var page = $('.fullpage').fullpage({

    anchors: ['cover','index','profile','webdesign1','webdesign2','webdesign3','uxui','video','video-play','grapic','cafe24','contact'],

    navigation: true,
    navigationTooltips: ['cover','index','profile','webdesign1','webdesign2','webdesign3', 'uxui','video', 'video-play','grapic','cafe24','contact'],
    navigationPosition: 'right',
    showActiveTooltip: true,


    //첫페이지 새로고침했을때 네비게이션바 숨기기
    afterLoad: function(anchorLink, index) {
      if (index === 1 || index === 12) {
        $("#fp-nav").fadeOut(300); // 첫 번째와 12번째 페이지에서 fp-nav 숨기기
      } else {
        $("#fp-nav").fadeIn(300); // 다른 페이지에서는 fp-nav 보이기
      }
    },

    onLeave: function(index, nextIndex, direction){

      if(nextIndex == 1 || nextIndex == 12){
        $("#fp-nav").fadeOut(300);
      }
      else{
        $("#fp-nav").fadeIn(300);
      }

      // 타이핑이 완료되었고, 12번째 섹션에 처음 들어올 때만 실행
      if (!typingExecuted && nextIndex === 12 && !typingInProgress) {
        typingInProgress = true; // 타이핑 진행 중으로 설정
        const txtWrap = document.querySelector('.last');
        const txtString = '끝까지 읽어주셔서 감사합니다. \n 가치를 전달하는 웹디자이너 박정은이었습니다.';
        const txtSpeed = 100;
        const txtDelay = 500;
        let txtIndex = 0;
        let typeCotrol = true;
        

        function typingEvent() {
          if(typeCotrol === true) {
            let txtNow = txtString[txtIndex++];
            txtWrap.innerHTML += txtNow === "\n" ? "<br>" : txtNow;
            if(txtIndex >= txtString.length) {
              txtIndex = 0;
              typeCotrol = false;
              typingExecuted = true; // 타이핑 완료 후 중복 실행 방지
              typingInProgress = false; // 타이핑 종료 상태로 설정
              clearInterval(setTyping); // 타이핑 종료
            }
          } else {
            clearInterval(setTyping);
            setTimeout(function() {
              txtWrap.innerHTML = '';
              typeCotrol = true;
              setTyping = setInterval(typingEvent, txtSpeed);
            }, txtDelay);
          }
        }

        let setTyping = setInterval(typingEvent, txtSpeed);
      }
    }
    
  });

  // video 버튼 눌리면 다음 페이지로 이동
  $('.next-btn').click(function () {
    $.fn.fullpage.moveTo(9, 1); // 이동하고 싶은 페이지
  });

  // video 재생 버튼
  $(".video-img-box img:nth-of-type(2)").hide();
  $("#video-1 button").mouseover(function(){
    $(".video-img-box img:nth-of-type(1)").hide();
    $(".video-img-box img:nth-of-type(2)").fadeIn();
  });
  $("#video-1 button").mouseleave(function(){
    $(".video-img-box img:nth-of-type(2)").hide();
    $(".video-img-box img:nth-of-type(1)").fadeIn();
  });
});