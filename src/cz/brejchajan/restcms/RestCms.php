<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once("config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/resources/TemplateResource.php");

class RestCms{

	private $templateResource;
	
	///Entity Manager
	private $em;

	public function __construct($em){
		$this->em = $em;
		$this->templateResource = new TemplateResource($em);

			
	}


	public function run(){
		$this->templateResource->run();
	}

}
?>
