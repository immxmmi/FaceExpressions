
<?php

class json_builder
{
private $response_code = 200;
private $status = 'success';
private $msg = 'FaceData successfully fetched';
private $data = array();
private $info = '-';

public function __construct()
{
}

public function build_face_data($customer)
{

if ($customer === null) {
$this->info = "no DATA - Failed";
} else {
$this->info = "Loading - Success";
$this->data = array(
'customer' => $question,
);
}
return $this->convert_data_to_json();
}

private function convert_data_to_json()
{
http_response_code($this->response_code);
$response = array(
'meta' => array(
'status' => $this->status,
'msg' => $this->msg,
'info' => $this->info
),
'data' => array(
'data' => $this->data,
)
);
return $response;
}

/**
* @return int
*/
public function getResponseCode(): int
{
return $this->response_code;
}

}
