<?php
require_once(__DIR__ . "/../bootstrap.php");
require_once(__DIR__ . "/HelperTest.php");
use \Doctrine\DBAL\LockMode;
$test = new HelperTest($em);

$test->run();



/*$app = new RestCms($em);
$app->run();
 */
$vendor = "test";
$name = "test1";
			$newTemplate = new Template(Helper::getNextId('Template', $em), "mytemplate3", "brejchaja");
			$newTemplate->setInstalled(new DateTime());
				
			$em->persist($newTemplate);
			$em->flush();	
			
			return new Response("/template/".$newTemplate->getVendor()."/".$newTemplate->getName()."", 201);
	
?>
