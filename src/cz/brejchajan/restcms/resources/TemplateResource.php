<?php

/** Part of the RestCMS project.
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

	public function __construct($em, $rest){
		$this->em = $em;
		$this->rest = $rest;
		$app = $this->rest;	
		//Resource rest implementation
		/**
		 * List all installed templates 
		 */
		$this->rest->get('/template', function() use($em){
			$qb = $em->createQueryBuilder();
			$qb->select('t')
				->from('Template', 't');
			$q = $qb->getQuery();
			$result = $q->getArrayResult();
			$json = json_encode($result);

			if($json == NULL){
				return new Response("Error retrieving objects from database.", 500);
			}
			return new Response($json, 200);	
		});

		/**
		 * List all installed templates from particular vendor
		 */
		$this->rest->get('/template/{vendor}', function($vendor) use($em){
			$qb = $em->createQueryBuilder();
			$qb->select('t')
				->from('Template', 't')
				->where("t.vendor = '".$vendor."'");
			$q = $qb->getQuery();
			$result = $q->getArrayResult();

			$json = json_encode($result);

			if($json == NULL){
				return new Response("Error retrieving objects from database.", 500);
			}
			return new Response($json, 200);	
		});
		
		/**
		 * Check if template from vendor with name is installed
		 */
		$this->rest->get('/template/{vendor}/{name}', function($vendor, $name) use($em){
			$qb = $em->createQueryBuilder();
			$qb->select('t')
				->from('Template', 't')
				->where($qb->expr()->andX(
						$qb->expr()->eq("t.vendor", "'".$vendor."'"),
						$qb->expr()->eq("t.name", "'".$name."'")
				));
			$q = $qb->getQuery();
			$result = $q->getArrayResult();
			if (count($result) == 0){
				return new Response("Template from vendor ". $vendor." with name ". $name." is not installed", 424);
			}
			$json = json_encode($result);

			if($json == NULL){
				return new Response("Error retrieving objects from database.", 500);
			}
			return new Response($json, 200);	
		});
		
		/**
		 * Install new template
		 */
		$this->rest->post('/template', function(Request $request) use($em, $app){
			if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				return $r;
			}
			
			$msg = $request->getContent();
			$template = json_decode($msg);
			if (!$template){
				return new Response("Unable to parse JSON string.", 422);	
			}
			//check if template exists
			if (Template::isInstalled($template->vendor, $template->name, $em))
				return new Response(
					"Template from this vendor with this name is already installed",
					422);

			$newTemplate = new Template(Helper::getNextId('Template', $em),
			       	$template->name, $template->vendor);
			$newTemplate->setInstalled(new DateTime());
				
			$em->persist($newTemplate);
			$em->flush();	
			
			return new Response("http://".$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME']."/template/".$newTemplate->getVendor()."/".
				$newTemplate->getName()."", 201);
		});
	}
}

