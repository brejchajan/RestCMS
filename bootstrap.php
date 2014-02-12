<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

include ("src/cz/brejchajan/restcms/config/config.php");
require_once __DIR__.'/vendor/autoload.php';
// Create a simple "default" Doctrine ORM configuration for Annotations

$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(SRCDIR."/persistence"), $isDevMode);
//$config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config/xml"), $isDevMode);
//$config = Setup::createYAMLMetadataConfiguration(array(__DIR__."/config/yaml"), $isDevMode);

// database configuration parameters
$conn = array(
	'dbname' 	=> DBNAME,
	'user'		=> DBUSER,
	'password' 	=> DBPASSWORD,
	'host'		=> DBHOST,
	'driver' 	=> 'pdo_mysql',
);
//obtaining the entity manager
$em = EntityManager::create($conn, $config);


/*function customError($errno, $errstr)
  {
  echo "<b>Error:</b> [$errno] $errstr<br>";
  echo "Ending Script";
  die();
  }
  
set_error_handler("customError");*/

//google client init
$client = new Google_Client();

$client->setApplicationName(APPLICATION_NAME);
$client->setClientId(CLIENT_ID);
$client->setClientSecret(CLIENT_SECRET);
$client->setRedirectUri('postmessage');
//$client->setScopes(array('https://www.googleapis.com/auth/userinfo.email'));

$plus = new Google_PlusService($client);
?>