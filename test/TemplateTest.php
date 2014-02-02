<?php
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/Helper.php");
require_once(__DIR__ . "/Test.php");


class TemplateTest extends Test{

	public function testIsComponentInstalled(){
		$exvendor = 'test';
		$exname = 'test1';
		$notexvendor = 'notexistingvendor';
		$notexname = 'notexistingname';	

		$installed = Template::isInstalled($exvendor, $exname, $this->em);
		$notInstalled1 = Template::isInstalled($notexvendor, $exname, $this->em);
		$notInstalled2 = Template::isInstalled($exvendor, $notexname, $this->em);
		$notInstalled3 = Template::isInstalled($notexvendor, $notexname, $this->em);

		if ($installed && !$notInstalled1 && !$notInstalled2 && !$notInstalled3)
			return true;
		return false;
	}

}	
?>
