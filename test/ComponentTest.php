<?php
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/Helper.php");
require_once(__DIR__ . "/Test.php");


class ComponentTest extends Test{

	public function testIsComponentInstalled(){
		$vendor = 'test';
		$templateName = 'test1';
		$template = Template::findTemplate($templateName, $vendor, $this->em);
		if ($template == null){
			echo "Template test not found, the test of component installed cannot be done.";
			return false;
		}

		$installed = Component::isInstalled($template, 'component1', $this->em);
		$notInstalled = Component::isInstalled($template, 'notinstalledcomponent', $this->em);

		if ($installed && !$notInstalled)
			return true;
		return false;
	}

}	
?>
