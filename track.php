<?php
// Looks up an order in orders.json. Edit that file to update statuses.
header('Content-Type: application/json');
$id = strtoupper(trim($_POST['order'] ?? ''));
$contact = strtolower(trim($_POST['contact'] ?? ''));
$orders = json_decode(@file_get_contents(__DIR__ . '/orders.json'), true) ?: [];
foreach ($orders as $o) {
  if (strtoupper($o['id']) === $id && ($contact === strtolower($o['email']) || $contact === preg_replace('/\D/', '', $o['phone']) || $contact === strtolower($o['phone']))) {
    echo json_encode(['ok'=>true,'id'=>$o['id'],'status'=>$o['status'],'tracking'=>$o['tracking'] ?? '']); exit;
  }
}
echo json_encode(['ok'=>false,'msg'=>'Order not found. Check your order ID and email/phone.']);
