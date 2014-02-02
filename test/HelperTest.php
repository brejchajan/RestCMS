<?php

require_once(SRCDIR . "/RestCms.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/Helper.php");
require_once(__DIR__ . "/Test.php");

class HelperTest extends Test{

	public function testGetNextId(){
		echo Helper::getNextId('Component', $this->em);
		return true;
	}

	public function testGetTemplateId(){
		if (Helper::getTemplateId("test", "test1", $this->em) != 9){
			return false;
		}

		if (Helper::getTemplateId("", "", $this->em) != -1){
			return false;
		}

		return true;
	}
}
