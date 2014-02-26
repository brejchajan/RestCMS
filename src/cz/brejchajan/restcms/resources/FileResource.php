<?php

/** Part of the RestCMS project.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once(__DIR__ . "/../config/config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Article.php");
require_once(SRCDIR . "/Helper.php");


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class FileResource
{
	private $rest;
	private $em;

	public function __construct($em, $rest){
		$this->em = $em;
		$this->rest = $rest;
		$app = $this->rest;
		//Article rest implementation
		
		/**
		 * Upload a new file
		 */
	       	
		$this->rest->post('/template/{vendor}/{name}/component/{cname}/file',
		       	function($vendor, $name, $cname, Request $request) use($em, $app){ 

			if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				return $r;
			}
			$template = Template::findTemplate($name, $vendor, $em);
			if ($template == NULL){
				$r = new Response("Template from vendor $vendor with name $name is not installed",
				       	422);
				return $r;
			}
			$component = Component::find($template, $cname, $em);
			if ($component == NULL){
				$r = new Response("Component named " . $cname . 
					" is not installed in this template;", 423);
				return $r;
			}
			$barePath = "upload/" . $vendor . "/" . $name . "/" . $cname . "/files";
			$path = PROJECTDIR . "/" . $barePath;
			if (!is_dir($path)){
				mkdir($path, 0777, true);
			}
			$file = $request->files->get('file');
			$filename = $file->getClientOriginalName();
			$file->move($path, $filename);
			return new Response("http://".$_SERVER['SERVER_NAME'] . "/" . $barePath . "/" . $filename, 201);
		});
		
		/**
		 * Update article
		 */
		$this->rest->delete('/template/{vendor}/{name}/component/{cname}/file/{filename}', function($vendor, $name, $cname, $filename) use($em, $app){
		if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				return $r;
			}
			$template = Template::findTemplate($name, $vendor, $em);
			if ($template == NULL){
				$r = new Response("Template from vendor $vendor with name $name is not installed",
				       	422);
				return $r;
			}
			$component = Component::find($template, $cname, $em);
			if ($component == NULL){
				$r = new Response("Component named " . $cname . 
					" is not installed in this template;", 423);
				return $r;
			}
			
			$barePath = "upload/" . $vendor . "/" . $name . "/" . $cname . "/files";
			$path = PROJECTDIR . "/" . $barePath . "/" . $filename;
			
			$res = unlink($path);
			
			if ($res){
				$r = new Response("File deleted.", 200);
			}
			else{
				$r = new Response("File could not be deleted.", 500);
			}
			return $r;
		});
		
	}

}

