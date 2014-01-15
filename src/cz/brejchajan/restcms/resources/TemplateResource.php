<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once(__DIR__ . "/../config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/Helper.php");


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TemplateResource
{
	private $rest;
	private $em;

	public function __construct($em){
		$this->em = $em;
		$this->rest = new Silex\Application();
		$app = $this->rest;	
		//Resource rest implementation
		$this->rest->get('template/{name}', function($name) use($app){
			return "Teplate name: " . $name;	
		});

		$this->rest->post('template', function(Request $request) use($em){ 
			$msg = $request->getContent();
			$template = json_decode($msg);
			if (!$template){
				return new Response("Unable to parse JSON string.", 201);	
			}
			$newTemplate = new Template($template->name, $template->vendor);
			$newTemplate->setInstalled(new DateTime());
				
			$newTemplate->setId(Helper::getNextId('Template', $em));

			$em->persist($newTemplate);
			$em->flush();	
			
			return new Response("Template named: " . $template->name . " successfully added.", 200);
		});
	}

	public function run(){
		$this->rest->run();
	}
}

