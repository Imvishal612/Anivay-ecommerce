<?php
// Contact form handler. Change $to to your inbox. On Hostinger, mail() works with a domain email.
header('Content-Type: application/json');
$to = 'hello@anivay.com';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !empty($_POST['website'])) { echo json_encode(['ok'=>false]); exit; }
$name  = trim(strip_tags($_POST['name'] ?? ''));
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = trim(strip_tags($_POST['phone'] ?? ''));
$msg   = trim(strip_tags($_POST['message'] ?? ''));
if (!$name || !$email || !$msg) { echo json_encode(['ok'=>false]); exit; }
$headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'anivay.com') . "\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail($to, "Website enquiry from $name", "Name: $name\nEmail: $email\nPhone: $phone\n\n$msg", $headers);
echo json_encode(['ok'=>$ok]);
