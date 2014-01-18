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
}

