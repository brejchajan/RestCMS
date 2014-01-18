<?php

require_once(SRCDIR . "/RestCms.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/Helper.php");


//date_default_timezone_set('Europe/London');

/**
 * The base class for all unit tests.
 */

class Test{

	protected $em;

	/**
	 * Test default constructor
	 * @param $em 	the EntityManager of the Doctrene ORM layer
	 */
	public function __construct($em){
		$this->em = $em;
	}

	/**
	 * Runs all the test in this class.
	 */	
	public function run(){
		$classMethods = get_class_methods($this);
		/** Run all test methods */
		foreach ($classMethods as $methodName){
			if (substr($methodName, 0, 4) == "test"){ 
				if ($this->{$methodName}()){
					echo $methodName . " test OK\n";
				}
				else{
					file_put_contents("php://stderr", "$methodName test FAILED!\n");
				}	
			}
		}
	}

}

?>

