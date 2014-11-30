
$('#main-labels:first-child').click(checkForNewMails);
function checkForNewMails () {
	$.get('/email/new', representMails);
}

function representMails (data) {
	$.each(data, printMail);
}

function printMail (index, element) {
  $('#emails').prepend(
  '<li>' + 
  '<div class="checked" data-checked="false"></div>' + 
  '<div class="starred" data-starred="' + element.starred + '"></div>' + 
  '<div class="from">' + element.from + '</div>' + 
  '<div class="subject">' + element.subject + '</div>' +
  '<div class="preview">' + element.preview + '</div>' +
  '</li>');
};



$('#emails').delegate('li', 'click', function () {
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




$('#last-activity').click(createMail);
function createMail () {
	$.post('/email', function (data) {
		$('#email').prepend( '<div class="sentConfirmation">' + data + '</div>' );
	});
}


$('#email').delegate('.sentConfirmation', 'click', closeConfirmation);
function closeConfirmation () {
	$(this).remove();
};



$('#newMail').click(newMail);
function newMail () {
	var pos = $('#footer').position();
	$('#blank-email').css('display', 'block').css('top', pos.top-162);
};



$('.closeWindow').click(hideWindow);
function hideWindow () {
	$('#blank-email').css('display', 'none');
}