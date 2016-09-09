$(document).on("page:load ready", function(){
	$('.continue-reg').click(function(){
	  $('.reg-form .first-part').addClass('displaynone');
	  $('.reg-form .second-part').removeClass('displaynone').addClass('animated bounceIn');
	});

	$('.link-change-password').click(function(){
	  $('.change-user-data-form').addClass('displaynone');
	  $('.change-password-form').removeClass('displaynone').addClass('animated bounceIn');
	});

	$('.link-change-data-user').click(function(){
	  $('.change-password-form').addClass('displaynone');
	  $('.change-user-data-form').removeClass('displaynone').addClass('animated bounceIn');
	});

	$('.snap-sound').click(function(){
		var mySound = new buzz.sound("/sounds/snap", {
      formats: [ "mp3", "aac", "ogg" ],
      preload: true,
      autoplay: true,
      loop: false
    });
	});
	$('.buy-sound').click(function(){
		var mySound = new buzz.sound("/sounds/coin-drop-5", {
      formats: [ "mp3", "wav" ],
      preload: true,
      autoplay: true,
      loop: false
    });
	});
});