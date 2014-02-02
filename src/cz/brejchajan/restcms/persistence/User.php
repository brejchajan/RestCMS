<?php
/** Part of the RestCMS project.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

/**
 * @Entity @Table(name="users")
 **/
class User{

	const PERMISSION_ADMIN = 'ADMIN';
	const PERMISSION_USER = 'USER';	
	/**
	 * @Id
	 * @Column(type="integer")
	 * @GeneratedValue
	 */
	protected $id;

	/**
	 * @Column(type="string");
	 */
	protected $permission;

	/**
	 * @Column(type="string", unique=true)
	 */
	protected $email;
	
	/**
	 * Constructor
	 * @param seq 		the sequence number - to be able to order the articles
	 * @param component 	the component that is parent of this Article
	 */
	public function __construct($permission, $email){
		$this->permission = $permission;
		$this->email = $email;
	}

	public function getId(){
		return $this->id;
	}

	public function getEmail(){
		return $this->email;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function getPermission(){
		return $this->permission;
	}

	public function setPermission($permission){
		$this->permission = $permission;
	}
	
	public static function getPermissionsList(){
		return array(
							self::PERMISSION_ADMIN,
							self::PERMISSION_USER
						);
	}
}

?>