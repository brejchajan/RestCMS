<?php
/**
 * @Entity @Table(name="components")
 **/
class Component{

	/**
	 * @Id @ManyToOne(targetEntity="Template", inversedBy="components")
	 */
	protected $templateName;

	/**
	 * @Id @Column(type="string")
	 */
	protected $name;

	/**
	 * @Column(type="integer", unique=true) 
	 */
	protected $id;


	public function __construct($name, $templateName){
		$this->name = $name;
		$this->templateName = $templateName;
	}

	public function getTemplateName(){
		return $this->templateName;
	}

	public function getName(){
		return $this->name;
	}

	public function setId($id){
		$this->id = $id;
	}

	public function getId(){
		return $this->id;
	}
}

