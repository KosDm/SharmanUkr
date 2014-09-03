$(document).ready(function() {
  $("#slider").slider({
    range:"min",
    value:7,
    min:0,
    max:12,
    step:1,
    slide:function(event,ui) {
      calc(ui.value);
    }
  });
  $("#amount").text("100");
  // calc('false');

  $('.kop, .rub, .auto').focus(function() {
	$(this).keyup(function(){
		calc('false');
	});
  });

  $('#slide2').parallax("50%", 0.1);
  $('#slide6').parallax("50%", 0.2);
  $('#slide8').parallax("50%", 0.2);
  $('#slide10').parallax("50%", 0.1);
  $('#slide13').parallax("50%", 0.1);
  $('#slide15').parallax("50%", 0.1);
  $('#slide17').parallax("50%", 0.2);
  $('#slide23').parallax("50%", 0.1);
  
  $(".cert").colorbox({rel:'cert'});
  
  /* Anchor Scroll */
  $("#menu a").click(function(i) {
    i.preventDefault();
    var target = $($(this).attr("href"));
    $("html, body").animate({ scrollTop: target.position().top }, 1000);
  });

  timer();
  
  var prefix = $('.prefix').val();
	var url = prefix+"contact.php";
	var mobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);

  /* Youtube fix */
	$("iframe").each(function() {
		var ifr_source=$(this).attr('src');
		var wmode="wmode=transparent";
		if(ifr_source.indexOf('?')!=-1) {
			var getQString=ifr_source.split('?');
			var oldString=getQString[1];
			var newString=getQString[0];
			$(this).attr('src',newString+'?'+wmode+'&'+oldString)
		} else $(this).attr('src',ifr_source+'?'+wmode)
	});

  /* Mobile & Animation */
	if(mobile != null) {
		$('html').css('width', window.innerWidth + 'px');
	} else {
		$(".scroll").each(function () {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				if ((scroll_top > top) && (scroll_top < bottom)) {
					if (!block.hasClass("animated")) {
						block.addClass("animated");
					}
				} else {
					block.removeClass("animated");
				}
			});
		});
		$('head').append('<link rel="stylesheet" href="'+prefix+'css/animation.css" />');
	}

  /* Forms */
	$('.button').click(function() {
		$('body').find('form:not(this)').children('label').removeClass('red');
		var request_url = '\n'+$('input[name="ref_url"]').val().toString().replace(/&/g, '\n');
		var answer = checkForm($(this).parent().get(0));
		if(answer != false) {
				//i_am_subscribed(); /* wovo4ka edition 12-07-14 */
			var $form = $(this).parent(),
				name = $('input[name="name"]', $form).val(),
				phone = $('input[name="phone1"]', $form).val()+''+$('input[name="phone2"]', $form).val()+''+$('input[name="phone3"]', $form).val(),
				email = $('input[name="email"]', $form).val(),
				ques = $('textarea[name="ques"]', $form).val(),
				//sbt = $('.btn', $form).attr("data-name"),
				submit = $('.btn', $form).text();
			var	ref = $('input[name="referer"]').val();
			var ref = ref+request_url;
			var formname = $('input[name="formname"]').val();
			$.ajax({
				type: "GET",
				url: "contact.php",
				dataType: "json",
				data: "name="+name+"&phone="+phone+"&buttonset"+"="+submit+"&email="+email+"&ques="+ques+"&formname="+formname+"&ref="+ref,
				success:function(answ){
					alert("information = " + data + "resultat= " + answ.result + " + " + answ.msg);
					
				}
			}).always(function() {
				//метрики
				thx();
				// ga('send', 'event', ''+sbt, ''+sbt, ''+sbt);
				// yaCounter25012874.reachGoal(''+sbt);
			});
		}
	});

  $('input[name="phone2"]').focus(function() {
		$(this).keyup(function(){
			if($(this).val().length >= 3)
				$(this).parent().siblings().find('input[name="phone3"]').focus();
		});
	});
});

/* Functions: */

/* Popup Centration */
$(window).resize(function(){
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
});

/* Timer */
function timer() {
	var now = new Date();
	var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); //var newDate = new Date("Feb,29,2014 23:59:00");
	var totalRemains = (newDate.getTime()-now.getTime());
	if (totalRemains>1) {
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Days<10){Days="0"+Days}
		if (Hours<10){Hours="0"+Hours}
		if (Min<10){Min="0"+Min}
		if (Sec<10){Sec="0"+Sec}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

/* Popups */
function popup(id, form, h1, h2, btn) { //onClick="popup('callback', '', '', '', '');"
	$('.popup_overlay').show();
	$('#'+id).addClass('activePopup');
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
  if(id == 'callback') {
 		var def_h1 = 'Зворотній дзвінок';
 		var def_h2 = 'Залиште заявку, щоб замовити зворотній дзвінок';
 		var def_btn = 'Замовити дзвінок';
 	}
 	if(id == 'request') {
 		var def_h1 = 'Залишити заявку';
 		var def_h2 = 'Заповніть форму,<br>і&nbsp;ми&nbsp;обов\'язково звяжемось з&nbsp;вами!';
 		var def_btn = 'Залишити заявку';
 	}
 	if(id == 'question') {
 		var def_h1 = 'Задати питання';
 		var def_h2 = 'Заповніть форму,<br>і&nbsp;ми&nbsp;обов\'язково звяжемось з&nbsp;вами!';
 		var def_btn = 'Задати питання';
 	}
	if(h1 != '') {$('#'+id).find('.popup-title').html(h1);} else {$('#'+id).find('.popup-title').html(def_h1);}
	if(h2 != '') {$('#'+id).find('p').html(h2);} else {$('#'+id).find('p').html(def_h2);}
	if(btn != '') {$('#'+id).find('.button').html(btn);} else {$('#'+id).find('.button').attr(def_btn);}
	$('.activePopup').show();
	$('.formname').attr("value", form);
}

/* Popup Close */
function popup_out() {
	$('.popup_overlay').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
}

/* Popup formname */
function formname(name) { //onClick="formname('text');"
	$('.formname').attr("value", name);
}

/* Thx */
function thx() {
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	popup('thx', '');
	$('input[type="text"]:not(input[name="phone1"])').each(function(){
		$(this).val('');
	});
	$('textarea').val('');
}
