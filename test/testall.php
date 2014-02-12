<?php
require_once(__DIR__ . "/../bootstrap.php");
require_once("HelperTest.php");
require_once("ComponentTest.php");
require_once("TemplateTest.php");
require_once("ArticleTest.php");


$test1 = new HelperTest($em);

$test1->run();

$test2 = new ComponentTest($em);
$test2->run();

$test3 = new TemplateTest($em);
$test3->run();

$test4 = new ArticleTest($em);
$test4->run();

$rest = new Silex\Application();
		
$rest->register(new Silex\Provider\TwigServiceProvider(), array(
	'twig.path' => __DIR__,
));
$rest->register(new Silex\Provider\SessionServiceProvider());
		

$connectRes = new ConnectResource($em, $rest);

var_dump($connectRes);

?>
