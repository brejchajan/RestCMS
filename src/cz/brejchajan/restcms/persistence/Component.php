<?php
/**
 * @Entity @Table(name="components")
 **/
class Component{

	/**
	 * @Id @ManyToOne(targetEntity="Template", inversedBy="t_components")
	 */
	protected $template;

	/**
	 * @Id @Column(type="string")
	 */
	protected $name;

	/**
	 * @OneToMany(targetEntity="Article", mappedBy="component")
	 */
	protected $articles;
	
	/**
	 * @Id
	 * @Column(type="integer", unique=true)
	 */
	protected $id;
	
	public function __construct($id, $name, $template){
		$this->id = $id;
		$this->name = $name;
		$this->template = $template;
	}

	public function getTemplate(){
		return $this->template;
	}

	public function getName(){
		return $this->name;
	}

	public function getId(){
		return $this->id;
	}

	/**
	 * Checks if component with given name for given template is already installed.
	 * @param $template 		The Template persistence object as the owner of
	 * 				component being tested.
	 * @param $componentName 	Name of the component.
	 * @param $em 			Doctrine EntityManager.
	 * @return			true if component in this template with given
	 * 				componentName is installed already, false otherwise.
	 */
	public static function isInstalled($template, $componentName, $em){
		$component = Component::find($template, $componentName, $em);
		if ($component == NULL){
			return false;
		}
		return true;
	}
	
	public static function find($template, $componentName, $em){
		$qb = $em->createQueryBuilder();
		$qb->select('c')
			->from('Component', 'c')
			->where($qb->expr()->andX(
				$qb->expr()->eq('c.template', '\''.$template->getId().'\''),
				$qb->expr()->eq('c.name', '\''.$componentName.'\'')
			));
		$res = $qb->getQuery()->getResult();
		if (count($res) > 0){
			return $res[0];
		}
		return null;
	}

}

