<?php
/** Part of the RestCMS priject.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

/**
 * @Entity @Table(name="articles")
 **/
class Article{
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 */
	protected $id;

	/**
	 * @Column(type="text")
	 */
	protected $text;


	/**
	 * @Column(type="integer");
	 */
	protected $seq;

	/**
	 * @ManyToOne(targetEntity="Component")
	 */
	protected $component;


	public function getId(){
		return $this->id;
	}

	public function getText(){
		return $this->text;
	}

	public function setText($text){
		$this->text = $text;
	}

	public function getSeq(){
		return $this->seq;
	}

	public function setSeq($seq){
		$this->seq = $seq;
	}

	public function getComponent(){
		return $this->component;
	}

	public function setComponent($com){
		$this->component = $com;
	}
}

