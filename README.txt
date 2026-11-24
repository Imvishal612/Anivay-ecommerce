ANIVAY – Hostinger deployment
1. hPanel > Websites > File Manager > public_html.
2. Upload anivay.zip and Extract here (index.html must sit directly in public_html).
3. Edit js/main.js: set CONFIG.whatsapp (checkout/chat number) and email.
4. Edit contact.php ($to) – use a domain mailbox created in hPanel > Emails.
5. Update order statuses in orders.json (Order ID, email/phone, status, tracking).
6. Enable free SSL in hPanel > SSL. Pages: index, shop, contact, track-order.
