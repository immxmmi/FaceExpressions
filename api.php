<?php
require_once("json_builder.php");


$data = json_builder->bu($qu, $aw);
http_response_code($quiz_build->getResponseCode());
header('Content-Type: application/json');

echo json_encode($data, JSON_PRETTY_PRINT);
exit;
