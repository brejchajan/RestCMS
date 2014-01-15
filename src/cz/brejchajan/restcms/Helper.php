<?php

class Helper{

	public static function getNextId($entityName, $em){

		$qb = $em->createQueryBuilder();

		$qb->select('t')
			->from($entityName, 't')
		       	->orderBy('t.id', 'DESC')
			->setMaxResults('1');
		$q = $qb->getQuery();
		$lastTemplate = $q->getSingleResult();
		$id = $lastTemplate->getId();
		return $id + 1;
	}
}
?>
			
