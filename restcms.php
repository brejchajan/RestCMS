<?php

require_once("bootstrap.php");
require_once(SRCDIR . "/RestCms.php");
date_default_timezone_set('Europe/London');

$application = new RestCms($em, $client, $client, $plus);
$application->run();
?>

