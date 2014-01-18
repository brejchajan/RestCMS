<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once("config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/resources/TemplateResource.php");
require_once(SRCDIR . "/resources/ComponentResource.php");


class RestCms{

	private $templateResource;
	private $componentResource;
	private $rest;
	///Entity Manager
	private $em;

	public function __construct($em){
		$this->em = $em;
		$this->rest = new Silex\Application();
		$this->templateResource = new TemplateResource($em, $this->rest);
		$this->componentResource = new ComponentResource($em, $this->rest);
	}


	public function run(){
		$this->rest->run();
	}

}
?>
