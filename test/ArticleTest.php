<?php
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Article.php");
require_once(SRCDIR . "/Helper.php");
require_once(__DIR__ . "/Test.php");


class ArticleTest extends Test{

	public function testGetNextSeq(){
		$template = Template::findTemplate("test1", "test", $this->em);
		$component = Component::find($template, "component1", $this->em);
		echo "Next article seq: ". Article::getNextSeq($component, $this->em) . "\n";
		return true;
	}

}	
?>
