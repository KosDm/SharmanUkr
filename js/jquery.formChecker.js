/* Cheker of valid form */

function checkForm(form1) {

  var $form = $(form1),
      checker = true,
      name = $("input[name='name']", $form).val(),
      phone1 = $("input[name='phone1']", $form).val(),
      phone2 = $("input[name='phone2']", $form).val(),
      phone3 = $("input[name='phone3']", $form).val(),
      email = $("input[name='email']", $form).val(),
      phone3_1 = $("input[name='phone3']", $form);

  if($form.find(".name").hasClass("required")) {
    if(!name) {
      $form.find(".name").addClass("red");
      checker = false;
    } else {
      $form.find(".name").removeClass('red');
    }
  }

  if($form.find(".phone").hasClass("required")) {
    if(!phone1) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else if(/[^0-9+]/.test(phone1)) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else {
      $form.find(".phone").removeClass("red");
    }

    if(!phone2) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else if(/[^0-9]/.test(phone2)) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else {
      $form.find(".phone").removeClass("red");
    }

    if(!phone3) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else if(/[^0-9 -]/.test(phone3) || phone3.length < 4) {
      $form.find(".phone").addClass("red");
      checker = false;
    } else {
      $form.find(".phone").removeClass("red");
    }
  }

  if($form.find(".email").hasClass("required")) {
    if(!email) {
      $form.find(".email").addClass("red");
      checker = false;
    } else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
      $form.find(".email").addClass("red");
      checker = false;
    } else {
      $form.find(".email").removeClass("red");
    }
  }

  if(checker != true) { return false; }
}