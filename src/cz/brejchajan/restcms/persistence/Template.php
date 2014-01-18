<?php

/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

/**
 * @Entity @Table(name="templates")
 **/
class Template{

	/**
	 * @Id @Column(type="string")
	 */
	protected $name;

	/**
	 * @Id @Column(type="string");
	 */
	protected $vendor;

	/**
	 * @Column(type="datetime");
	 */
	protected $installed;

	/**
	 * @OneToMany(targetEntity="Component", mappedBy="template", cascade={"ALL"})
	 */
	protected $t_components;


	/**
	 * @Id 
	 * @Column(type="integer", unique=true)
	 */
	protected $id;
	public function __construct($id, $name, $vendor){
		$this->id = $id;
		$this->name = $name;
		$this->vendor = $vendor;
	}

	public function getName(){
		return $this->name;
	}

	public function getVendor(){
		return $this->vendor;
	}

	public function getInstalled(){
		return $this->installed;
	}

	public function setInstalled($installed){
		$this->installed = $installed;
	}

	public function getId(){
		return $this->id;
	}
	
	public static function findTemplate($name, $vendor, $em){
		$qb = $em->createQueryBuilder();
		$qb->select('t')
			->from('Template', 't')
			->where($qb->expr()->orX(
				$qb->expr()->eq("t.vendor", "'$vendor'"),
				$qb->expr()->eq("t.name", "'$name'")
			));
		$q = $qb->getQuery();
		$templateArr = $q->getResult();
		if ($templateArr > 0){
			$template = $templateArr[0];
			return $template;
		}
		else return null;
	}
}
