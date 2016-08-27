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
});