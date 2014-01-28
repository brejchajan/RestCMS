<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Helper{

	public static function getNextId($entityName, $em){

		$qb = $em->createQueryBuilder();

		$qb->select('t')
			->from($entityName, 't')
		       	->orderBy('t.id', 'DESC')
			->setMaxResults('1');
		$q = $qb->getQuery();
		$res = $q->getResult();
		$lastTemplate = $res[0];
		if (!$lastTemplate || $lastTemplate == NULL){
			return 0;
		}
		$id = $lastTemplate->getId();
		return $id + 1;
	}
	

	public static function getTemplateId($vendor, $name, $em){
		$qb = $em->createQueryBuilder();
		$qb->select('t')
			->from('Template', 't')
			->where($qb->expr()->andX(
				$qb->expr()->eq("t.vendor", "'" . $vendor  . "'"),
				$qb->expr()->eq("t.name", "'" . $name  . "'")
			));
		$q = $qb->getQuery();
		$res = $q->getResult();

		if (!$res || $res == NULL){
			return -1;
		}
		return $res[0]->getId();
	}
	
	public static function generateNewState(){
		return hash('sha256', rand());
    }
    
    public static function checkState($request, $app){
    	if ($request->get('state') != ($app['session']->get('state'))) {
			return new Response($request->get('state') . ' -- ' . $app['session']->get('state'), 401);
		}
	    $state = Helper::generateNewState();
		$app['session']->set('state', $state);
		return null;
	}
	
	public static function isAdminLogged($app){
		if ($app['session']->get('permission') == "ADMIN")
			return true;
		return false;
	}


}
?>