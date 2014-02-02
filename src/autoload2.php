<?php
function restCmsAutoloader($class){
	include($class . '.class.php');
}

spl_autoload_register(__NAMESPACE__ . '\restCmsAutoloader');
?>

