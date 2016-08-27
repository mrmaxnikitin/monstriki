$(document).on("page:load ready", function(){
  $('#change-password').click(function(){
    $("#change-password-form").ajaxSubmit({
      success: function(data, status, response) {
        $('.notice-change-pass-content').removeClass('error').html(response.responseText);
        $('.notice-change-pass').fadeIn()
      },
      error: function(data) {
        $('.notice-change-pass-content').addClass('error').html(data.responseText);
        $('.notice-change-pass').fadeIn()
      }
    });
  });
})

