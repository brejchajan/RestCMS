<?php

require_once("bootstrap.php");
require_once(SRCDIR . "/RestCms.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/Helper.php");

/*
			$qb = $em->createQueryBuilder();

			$qb->select('t')
				->from('Template', 't')
			       	->orderBy('t.id', 'DESC')
				->setMaxResults('1');
			$q = $qb->getQuery();
			$tpl = $q->getSingleResult();

var_dump($tpl->getId());
 */



/*date_default_timezone_set('Europe/London');
$newTemplate = new Template("sime", "defaulttemplate");
$newTemplate->setId(1);
$newTemplate->setInstalled(new DateTime());
$em->persist($newTemplate);
$em->flush();
 */

var_dump(Helper::getNextId('Template', $em));
?>

