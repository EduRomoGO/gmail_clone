
$('#main-labels').first().click(checkForNewMails);
$('#check-emails').click(checkForNewMails);
function checkForNewMails () {
		console.log('checkForNewMails');
	$.get('/email/new', representMails);
}

function representMails (data) {
	$.each(data, printMail);
}

function printMail (index, element) {
  $('#emails').prepend(
  '<li>' + 
  '<input type="checkbox">' +
  '<div class="checked" data-checked="false"></div>' + 
  '<div class="starred" data-starred="' + element.starred + '"></div>' + 
  '<div class="from">' + element.from + '</div>' + 
  '<div class="subject">' + element.subject + '</div>' +
  '<div class="preview">' + element.preview + '</div>' +
  '</li>');
};



$('#emails').delegate('li div', 'click', function () {
	$.get('/email/' + $(this).attr('data-id'), showMail);
	console.log($(this).attr('data-id'));
});

function showMail (data) {
	//console.log(data);
	$('#footer').before(
    '<section class="completeMail">' + 
      '<div class="starred" data-starred="' + data.starred + '"></div>' + 
      '<div class="from">' + data.from + '</div>' + 
      '<div class="subject">' + data.subject + '</div>' +
      '<div class="preview">' + data.preview + '</div>' +
      '<div class="preview">' + data.preview + '</div>' +
      '<div class="preview">' + data.email + '</div>' +
    '</section>');
}



// dummy action
$('.sendMail').click(createMail);
function createMail () {

	var createMailRequest = $.post('/email', function (data) {
	var windowWidth = $(window).width();
	var allElementesHeight = $('#email').height();

	var confirmationMessageWidth  = $('.sentConfirmation').outerWidth(true);
	var confirmationMessageHeight = $('.sentConfirmation').outerHeight(true);
		console.log($('.sentConfirmation').outerHeight());
		console.log($('.sentConfirmation').outerWidth());
	var horizontalPosition = (windowWidth - confirmationMessageWidth)/2;
	var verticalPosition = (allElementesHeight - confirmationMessageHeight)/2;
	$('.sentConfirmation').html(data)
												.show()
												.delay(750)
												.css('left', horizontalPosition)
												.css('top', verticalPosition);
	})

	createMailRequest.done(function(){
		$('#blank-email').slideUp();
	});
}

$('#email').delegate('.sentConfirmation', 'click', closeConfirmation);
function closeConfirmation () {
	$(this).remove();
};

$('#newMail').click(newMail);
function newMail () {
	var footerPosition = $('#footer').position();
	$('#blank-email').show().css('top', footerPosition.top-162);
};

$('.closeWindow').click(hideWindow);
function hideWindow () {
	$('#blank-email').show();
}


$('#select-all').click(toggleSelectAllMails);
var count = 0;
function toggleSelectAllMails () {
	var toggle = (count%2 === 0) ? true : false;
	$('#emails input').prop('checked', toggle);	
	count++;
};

$('.filterStarred').click(filterStarred);
function filterStarred () {
	console.log('click');
	//$('.starred').data('starred', false).show();

	var selected = $(".starred").filter(function(index) {
		return $(this).data('starred', false);
	});
	selected.show();
};