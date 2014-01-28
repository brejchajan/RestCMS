<?php

/** Part of the RestCMS project.
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

class ArticleResource
{
	private $rest;
	private $em;

	public function __construct($em, $rest){
		$this->em = $em;
		$this->rest = $rest;
		$app = $this->rest;
		//Article rest implementation

		/**
		 * List all articles in component.
		 */
		$this->rest->get('/template/{vendor}/{name}/component/{cname}/article', 
		function($vendor, $name, $cname) use($em){
				
			$template = Template::findTemplate($name, $vendor, $em);
			if ($template == NULL){
				return new Response("Template from vendor $vendor with name $name is not installed",
				       	422);	
			}
			$component = Component::find($template, $cname, $em);
			if ($component == NULL){
				return new Response("Component named " . $cname . 
					" is not installed in this template;", 424);
			}
			$qb = $em->createQueryBuilder();
			$qb->select('a')
				->from('Article', 'a')
				->where("a.component = '".$component->getId()."'")
				->orderBy('a.seq', 'ASC');
			$q = $qb->getQuery();
			$result = $q->getArrayResult();
			$json = json_encode($result);		
			if($json == NULL){
				return new Response("Error retrieving objects from database.", 500);
			}
			return new Response($json, 200);	
		});
		
		$this->rest->get('/article/{id}', 
		function($id) use($em){
			$qb = $em->createQueryBuilder();
			$qb->select('a')
				->from('Article', 'a')
				->where("a.id = '".$id."'");
			$q = $qb->getQuery();
			$result = $q->getArrayResult();
			if (count($result) > 0){
				$json = json_encode($result);		
				return new Response($json, 200);	
			}
			return new Response("Error retrieving objects from database.", 500);
		});

		
		/**
		 * Add new article 
		 */
	       	
		$this->rest->post('/template/{vendor}/{name}/component/{cname}/article',
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
			$msg = $request->getContent();
			$article = json_decode($msg);
			$seq = $article->seq;
			if ($article->seq == "AUTO")
				$seq = Article::getNextSeq($component, $em);		
			
			$newArticle = new Article($seq, $component);
			$newArticle->setText($article->text);
			$newArticle->setUrl("");
			$em->persist($newArticle);
			$em->flush();	
			$url = "http://".$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME'].
				"/article/".$newArticle->getId()."";
			$newArticle->setUrl($url);
			$em->persist($newArticle);
			$em->flush();
			
			$r = new Response($url, 201);
			return $r;
		});
		
		/**
		 * Update article
		 */
		$this->rest->put('/article/{id}', function($id, Request $request) use($em, $app){
		
			if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				return $r;
			}
			$article = $em->find('Article', $id);
			if ($article == NULL){
				$r = new Response("This article does not exist.", 400);
				return $r;
			}
			$msg = $request->getContent();
			$jsonArticle = json_decode($msg);
			//update the Article
			$article->setText($jsonArticle->text);
			if ($jsonArticle->seq != "AUTO")
				$article->setSeq($jsonArticle->seq);
			$em->persist($article);
			$em->flush();
			$r = new Response("", 200);
			return $r;
		});
		
		/**
		 * Update article
		 */
		$this->rest->delete('/article/{id}', function($id) use($em, $app){
		
			if (!Helper::isAdminLogged($app)){
				$r = new Response("Access denied", 403);
				return $r;
			}
			$article = $em->find('Article', $id);
			if ($article == NULL){
				$r = new Response("This article does not exist.", 400);
				return $r;
			}
		
			$em->remove($article);
			$em->flush();
			$r = new Response("Article deleted.", 200);
			return $r;
		});
		
	}

}

