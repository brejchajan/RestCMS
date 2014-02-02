<?php
require_once("config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/persistence/Article.php");

$article = new Article();
$article->setText("This is very interesting first article.");

$em->persist($article);
$em->flush();
echo "Added article with ID ". $article->getId() . "\n";

?>

