<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once("config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/resources/TemplateResource.php");
require_once(SRCDIR . "/resources/ComponentResource.php");
require_once(SRCDIR . "/resources/ArticleResource.php");
require_once(SRCDIR . "/resources/ConnectResource.php");

class RestCms{

	private $templateResource;
	private $componentResource;
	private $articleResource;
	private $connectResource;
	private $googleClient;
	private $rest;
	private $googlePlus;
	///Entity Manager
	private $em;

	public function __construct($em, $googleClient, $googlePlus){
		$this->em = $em;
		$this->rest = new Silex\Application();
		$this->googleClient = $googleClient;
		$this->googlePlus = $googlePlus;
		
		
		$this->rest->register(new Silex\Provider\TwigServiceProvider(), array(
			'twig.path' => __DIR__,
		));
		$this->rest->register(new Silex\Provider\SessionServiceProvider());
		
		$this->templateResource = new TemplateResource($em, $this->rest);
		$this->componentResource = new ComponentResource($em, $this->rest);
		$this->articleResource = new ArticleResource($em, $this->rest);
		$this->connectResource = new ConnectResource($em, $this->rest, $this->googleClient, $this->googlePlus);
	}


	public function run(){
		$this->rest->run();
	}

}
?>
