<?php
require_once(__DIR__ . "/../bootstrap.php");
require_once(__DIR__ . "/HelperTest.php");
require_once(__DIR__ . "/ComponentTest.php");
require_once(__DIR__ . "/TemplateTest.php");
require_once(__DIR__ . "/ArticleTest.php");

$test1 = new HelperTest($em);

$test1->run();

$test2 = new ComponentTest($em);
$test2->run();

$test3 = new TemplateTest($em);
$test3->run();

$test4 = new ArticleTest($em);
$test4->run();

?>
