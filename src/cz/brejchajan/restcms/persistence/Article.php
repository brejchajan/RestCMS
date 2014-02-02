<?php
/** Part of the RestCMS project.
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
	 * @ManyToOne(targetEntity="Component", inversedBy="articles") 
	 */
	protected $component;

	/**
	 * @Column(type="string")
	 */
	protected $url;
	
	/**
	 * Constructor
	 * @param seq 		the sequence number - to be able to order the articles
	 * @param component 	the component that is parent of this Article
	 */
	public function __construct($seq, $component){
		$this->seq = $seq;
		$this->component = $component;
		$this->url = $url;
	}

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

	public function getUrl(){
		return $this->url;
	}

	public function setUrl($url){
		$this->url = $url;
	}

	/**
	 * Returns next sequence number for given component
	 * @param $component 	the future parent component of the Article
	 * @param $en		Doctrine EntityManager.
	 */	
	public static function getNextSeq($component, $em){
		$qb = $em->createQueryBuilder();

		$qb->select('a')
			->from('Article', 'a')
			->where("a.component = '".$component->getId()."'")
		       	->orderBy('a.seq', 'DESC')
			->setMaxResults('1');
		$q = $qb->getQuery();
		$res = $q->getResult();
		if (count($res) > 0){
			$lastArticle = $res[0];
			$id = $lastArticle->getSeq();
			return $id + 1;
		}
		return 1;
	}
}

