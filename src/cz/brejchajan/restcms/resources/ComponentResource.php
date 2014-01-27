<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once(__DIR__ . "/../config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Article.php");
require_once(SRCDIR . "/Helper.php");


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ComponentResource
{
	private $rest;
	private $em;

	public function __construct($em, $rest){
		$this->em = $em;
		$this->rest = $rest;
		$app = $this->rest;
		//Resource rest implementation
		/**
		 * List all components in the template specified by vendor and
		 * template name. 
		 */

		$this->rest->get('/template/{vendor}/{name}/component', function($vendor, $name) use($em){

			$templateId = Helper::getTemplateId($vendor, $name, $em);
			if ($templateId == -1){
				return new Response("Template from $vendor with name $name is not installed", 422);		
			}
			
			$qb = $em->createQueryBuilder();
			$qb->select('c')
				->from('Component', 'c')
				->where("c.template = '".$templateId."'");
			$q = $qb->getQuery();
			$result = $q->getArrayResult();
			$json = json_encode($result);

			if($json == NULL){
				return new Response("Error retrieving objects from database.", 500);
			}
			return new Response($json, 200);	
		});
		
		/**
		 * Install new component 
		 */ 
		$this->rest->post('/template/{vendor}/{name}/component',
		       	function($vendor, $name, Request $request) use($em, $app){ 
			
			$r = Helper::checkState($request, $app);
			if ($r != null){
				return $r;
			}
			$state = $app['session']->get('state'); 
			if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				$r->headers->set('XState', $state);
				return $r;
			}
			
			$template = Template::findTemplate($name, $vendor, $em);		

			if ($template == null)
				$r = new Response("This template is not installed", 422);
				$r->headers->set('XState', $state);
				return $r;
			$msg = $request->getContent();
			$component = json_decode($msg);
			if (!$component){
				$r = new Response("Unable to parse JSON string.", 422);	
				$r->headers->set('XState', $state);
				return $r;
			}
			if (Component::isInstalled($template, $component->name, $em)){
				$r = new Response("This component is already installed", 422);
				$r->headers->set('XState', $state);
				return $r;			
			}
			$newComponent = new Component(Helper::getNextId('Component', $em),
			       				$component->name, $template);
				
			$em->persist($newComponent);
			$em->flush();	
			
			$r = new Response("http://".$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME']."/template/$vendor/$name/component/".$newComponent->getName()."", 201);
			$r->headers->set('XState', $state);
			return $r;
		});
		 
	}

}

