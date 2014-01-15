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
	 * @OneToMany(targetEntity="Component", mappedBy="templates", cascade={"ALL"})
	 */
	protected $components;

	/**
	 * @Column(type="integer", unique=true)
	 */
	protected $id;

	public function __construct($name, $vendor){
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

	public function setId($id){
		$this->id = $id;
	}

	public function getId(){
		return $this->id;
	}
}
