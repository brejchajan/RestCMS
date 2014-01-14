<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once ("src/cz/brejchajan/restcms/config.php");
require_once "vendor/autoload.php";
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
?>
