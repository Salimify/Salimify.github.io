<?php
require 'PHPMailerAutoload.php';

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');

        $params = json_decode($json);

        $email_from = $params->email;
        $name = $params->name;
        $message = $params->message;
		$subject = $params->subject;
        $recipient = $params->recipient;
        $headers = "From: $name <$email_from>";

$mail = new PHPMailer(true);

$mail->SMTPOptions = array(
    'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
    )
    );
	//$mail->SMTPDebug = 2;                    // Enable verbose debug output
    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPAuth = true; // enable SMTP authentication
    $mail->SMTPSecure = "tls"; // sets the prefix to the servier
    $mail->Host = "smtp.gmail.com"; // sets GMAIL as the SMTP server
    $mail->Port = 587; // set the SMTP port for the GMAIL server
    $mail->Username = "contact@salimbenhassine.com"; // GMAIL username
    $mail->Password = "sevy%147%DOO"; // GMAIL password


//Typical mail data
$mail->AddAddress($recipient, $name);
$mail->SetFrom($email_from, $name);
$mail->Subject = $subject;
$mail->Body = $message;

try{
    $mail->Send();
    echo "Success!";
} catch(Exception $e){
    //Something went bad
    echo "Fail - " . $mail->ErrorInfo;
}

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
