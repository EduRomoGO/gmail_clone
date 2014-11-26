
var printMail = function (index, element) {
      $('#emails').prepend(
      '<li>' + 
      '<div class="checked" data-checked="false"></div>' + 
      '<div class="starred" data-starred="' + element.starred + '"></div>' + 
      '<div class="from">' + element.from + '</div>' + 
      '<div class="subject">' + element.subject + '</div>' +
      '<div class="preview">' + element.preview + '</div>' +
      '</li>');
	};


var representMails = function (data) {
	$.each(data, printMail);
}

var getMails = function () {
	$.get('/email/new', representMails );
}
$('#main-labels:first-child').click(getMails);



var showMail = function (data) {
	console.log(data);
	$('#blank-email').after(
      '<section class="completeMail">' + 
	      '<div class="starred" data-starred="' + data.starred + '"></div>' + 
	      '<div class="from">' + data.from + '</div>' + 
	      '<div class="subject">' + data.subject + '</div>' +
	      '<div class="preview">' + data.preview + '</div>' +
	      '<div class="preview">' + data.preview + '</div>' +
	      '<div class="preview">' + data.email + '</div>' +
      '</section>');
}

$('#email').delegate('li', 'click', function () {
	$.get('/email/' + $(this).attr('data-id'), showMail);
	console.log($(this).attr('data-id'));
});






var sendMail = function () {
	$.post('/email', function (data) {
		$('#email').prepend( '<div class="sentConfirmation">' + data + '</div>' );
	});
}
$('#last-activity').click(sendMail);

var closeConfirmation = function () {
	$(this).remove();
};
$('#email').delegate('.sentConfirmation', 'click', closeConfirmation);