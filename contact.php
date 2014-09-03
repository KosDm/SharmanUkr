<?php 

include_once('inc/class.simple_mail.php');
include_once('inc/gump.class.php');

include_once('mail-config.php');




// Check Data
$isValid = GUMP::is_valid($_GET, array(
	'name' => 'required',
	'phone' => 'required',
	'ques' => 'required',
	'email' => 'required',
	'ref' => 'required',
	'formname' => 'required'
	));

if($isValid === true) {

	// Submit Mail
	$mail = new SimpleMail();
	$mail->setTo(YOUR_EMAIL_ADDRESS, YOUR_COMPANY_NAME)
	->setSubject('Записався новий покупець')
	->setFrom(htmlspecialchars($_GET['email']), htmlspecialchars($_GET['formname'].' '.$_GET['name']))
	->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
	->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
	->setMessage(createMessage($_GET))
	->setWrap(100);

	$mail->send();

	$result = array(
		'result' => 'success', 
		'msg' => array('Success! Your contact request has been send.')
		);

	echo json_encode($result);

} else {
	$result = array(
		'result' => 'error', 
		'msg' => $isValid
		);

	echo json_encode($result);
}


function createMessage($formData)
{
	$body  = 	"Отримано новий контакт : <br><br>";
	$body .=	"First Name:  ".htmlspecialchars($formData['name'])." <br><br>";
	$body .=	"Last Name:  ".htmlspecialchars($formData['forname'])." <br><br>";
	$body .=	"Telephone:  ".htmlspecialchars($formData['phone'])." <br><br>";
	$body .=	"Email:  ".htmlspecialchars($formData['email'])." <br><br>";
	$body .=	"Buttonset:  ".htmlspecialchars($formData['buttonset'])." <br><br>";
	$body .=	"Question:  ".htmlspecialchars($formData['ques'])." <br><br>";
	$body .=	"reference:  ".htmlspecialchars($formData['ref'])." <br><br>";
	
	

	return $body;
}






















// $mail = new SimpleMail();
// $mail->setTo('mail@themeinjection.com', 'Your Email')
// ->setSubject('Test Message')
// ->setFrom('no-reply@domain.com', 'Domain.com')
// ->addMailHeader('Reply-To', 'no-reply@domain.com', 'Domain.com')
// ->addMailHeader('Cc', 'bill@example.com', 'Bill Gates')
// ->addMailHeader('Bcc', 'steve@example.com', 'Steve Jobs')
// ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
// ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
// ->setMessage('<strong>This is a test message.</strong>')
// ->setWrap(100);
//$send = $mail->send();
//echo ($send) ? 'Email sent successfully' : 'Could not send email';


//echo json_encode(array('data' => 'test data'));

/* AJAX check  */
// if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
// 	echo json_encode(array('data' => 'test data'));
// }
// else
// {
// 	echo 'no ajax';
// }