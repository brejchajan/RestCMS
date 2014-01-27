<?php

/** Part of the RestCMS project.
 * @author Jan Brejcha 2014,
 * all rights reserved.
 */

require_once(__DIR__ . "/../config.php");
require_once(PROJECTDIR . "/bootstrap.php");
require_once(SRCDIR . "/persistence/Template.php");
require_once(SRCDIR . "/persistence/Component.php");
require_once(SRCDIR . "/persistence/Article.php");
require_once(SRCDIR . "/Helper.php");


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ConnectResource
{
	private $rest;
	private $em;

	public function __construct($em, $rest, $googleClient, $googlePlus){
		$this->em = $em;
		$this->rest = $rest;
		$app = $this->rest;
	
		//Connect resource rest implementation
		/**
		 * get a new connection
		 */
		$this->rest->get('/connect', 
		function() use($app){
			$app['session']->set('token', '');
			$state = Helper::generateNewState();
			$response = array("state" => $state);
			$app['session']->set('state', $state);
			return new Response(json_encode($response), 200);	
		});
		
		/**
		 * Accept login connection
		 */ 	
		$this->rest->post('/connect', function(Request $request) use($app, $em, $googleClient, $googlePlus){ 

			$token = $app['session']->get('token');
			if (empty($token)) {
				// Ensure that this is no request forgery going on, and that the user
				// sending us this connect request is the user that was supposed to.
				if ($request->get('state') != ($app['session']->get('state'))) {
					return new Response('Invalid state parameter', 401);
				}
				$state = Helper::generateNewState();
				$app['session']->set('state', $state);
				$code = $request->getContent();
				// Exchange the OAuth 2.0 authorization code for user credentials.
				$googleClient->authenticate($code);
				$token = json_decode($googleClient->getAccessToken());
				// You can read the Google user ID in the ID token.
				// "sub" represents the ID token subscriber which in our case
				// is the user ID. This sample does not use the user ID.
				$attributes = $googleClient->verifyIdToken($token->id_token, CLIENT_ID)
					->getAttributes();
				$gplus_id = $attributes["payload"]["sub"];

				// Store the token in the session for later use.
				$app['session']->set('token', json_encode($token));
				$response = array("state" => $state, "permission" => "ADMIN");
				return new Response(json_encode($response), 200);
			}
			return new Response("Unable to verify login at Google. Try again later.", 522);
		});
		
		
		$app->delete('/connect', function (Request $request) use ($app, $googleClient) {
			if ($request->get('state') != ($app['session']->get('state'))) {
				return new Response('Invalid state parameter' . $request->get('state'), 401);
			}
			$token = json_decode($app['session']->get('token'))->access_token;
			$googleClient->revokeToken($token);
			// Remove the credentials from the user's session.
			$app['session']->set('token', '');
			return new Response('Successfully disconnected', 200);
		});
	}

}

