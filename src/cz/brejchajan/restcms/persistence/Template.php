<?php
/** Part of the RestCMS project.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

/**
 * @Entity @Table(name="templates")
 **/
class Template{

	/**
	 * @Id @Column(type="string", length=50)
	 */
	protected $name;

	/**
	 * @Id @Column(type="string", length=50);
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
			->where($qb->expr()->andX(
				$qb->expr()->eq("t.vendor", "'$vendor'"),
				$qb->expr()->eq("t.name", "'$name'")
			));
		$q = $qb->getQuery();
		$templateArr = $q->getResult();
		if (count($templateArr) > 0){
			$template = $templateArr[0];
			return $template;
		}
		else return null;
	}
	/**
	 * Checks if teplate with given name and vendor is already installed.
	 * @param $vendor 		The vendor of the teplate.	
	 * @param $name 		Name of the template.	
	 * @param $em 			Doctrine EntityManager.
	 * @return			true if this template with given
	 * 				name and vendor is installed already, 
	 * 				false otherwise.
	 */
	public static function isInstalled($vendor, $name, $em){
		if (Template::findTemplate($name, $vendor, $em) == null)
			return false;
		return true;	
	}
}
