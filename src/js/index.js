import '../scss/index.scss'
$(function () {
  /*$('header').load('./src/header.html');*/
  /*点击切换样式*/
  $('.toggle').on('click','li',function () {
    $(this).addClass('active').siblings('li').removeClass('active');
  });
});
