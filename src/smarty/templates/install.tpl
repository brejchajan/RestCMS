<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<!-- Bootstrap main library (can be removed, you can use any stylesheet) -->
		<link href="/js/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
		<!-- Bootstrap justified enhancement (can be removed, you can use any stylesheet) -->
		<link href="/templates/default/css/justified.css" rel="stylesheet">
		<!-- RestCMS css (DO NOT REMOVE) -->
		<link rel="stylesheet" type="text/css" href="../../js/RestCMS/css/RestCMSDefault.css" />
		
		<title>RestCMS installation wizard</title>
		<!-- JQUERY (jQuery is needed for RestCMS and Bootstrap as dependency, DO NOT REMOVE!)-->
		<script src="/js/jquery/jquery.js" type="text/javascript"></script>
		<script src="/js/bootstrap/dist/js/bootstrap.js" type="text/javascript"></script>
		<!-- RestCMS system javascript (DO NOT REMOVE) -->
		<script src="/js/RestCMS/RestCMScompiled.js" type="text/javascript"></script>
		<!-- RestCMS initialization code (can be altered) -->
		<script type="text/javascript">
			var run = function(){				
				var article = new ArticleComponent("articles");
				article.attachToDataComponent("articles");
				
				var pageHeader = new ArticleComponent("pageHeader");
				pageHeader.attachToDataComponent("pageHeader");
				
				//var leftSidebar = new ArticleComponent("leftSidebar");
				//leftSidebar.attachToClass("leftSidebar");
				
				var jumbotron = new ArticleComponent("jumbotron");
				jumbotron.attachToClass("jumbotron");
				
				var main = new MainComponent();
				main.attachToClass("main");
				main.addPage("home");
				main.addPage("about");
				//main.addPage("contact");
				main.registerPageComponent(article);
				main.registerPageComponent(jumbotron);
				main.registerPageComponent(pageHeader);
				main.setIndexPage("home", "home");
				
				RestCMS.setMainComponent(main);
				//leftSidebar.buildComponent();
			}
			var engine = new RestCMS(run, "brejchajan", "default", "en");
		</script>
		<!-- Google API - DO NOT REMOVE, needed for login! -->
		<script type="text/javascript">
		  (function() {
			var po = document.createElement('script');
			po.type = 'text/javascript'; po.async = true;
			po.src = 'https://plus.google.com/js/client:plusone.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(po, s);
		  })();
		</script>
	</head>
	<body>

    <div class="container">
		<form role="form" action="install.php" method="post">
		
		<!-- Nav tabs -->
		<ul class="nav nav-tabs" id="stepTabs">
			<li class="active disabled"><a href="#step1"><script type="text/javascript">document.write(_("Step"))</script> 1</a></li>
			<li class="disabled"><a href="#step2"><script type="text/javascript">document.write(_("Step"))</script> 2</a></li>
			<li class="disabled"><a href="#step3"><script type="text/javascript">document.write(_("Step"))</script> 3</a></li>
			<li class="disabled"><a href="#recap"><script type="text/javascript">document.write(_("Recapitulation"))</script></a></li>
			<li class="disabled"><a href="#done"><script type="text/javascript">document.write(_("Done"))</script></a></li>
		</ul>
		<div id="alert" class="alert alert-danger fade in"></div>

		<!-- Tab panes -->
		<div class="tab-content">
			<div class="tab-pane active" id="step1">
				<div class="page-header">
					<h1><script type="text/javascript">document.write(_("RestCMS installation wizard"))</script></h1>
				</div>
				<p>Welcome in RestCMS! This is an installation wizard to help you install the RestCMS php backend on your server.</p>
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Before you start, important!"))</script></h2>
				</div>
				<p><b>
					One crucial thing is needed to be done before you can proceed to next steps.</b> Please, create a directory named <code>config</code> if not exists
					on this path on your server: <code>src/cz/brejchajan/restcms</code>, so the whole path to the config directory will be <code>src/cz/brejchajan/restcms/config</code>.
					Please ensure, that the <code>config</code> directory is owned by the user and group your Apache installation uses so our php scripts have permissions to write files
					into this directory. This is automatical on most webhostings, but if you have a VPS, you might to configure this manually.
				</p>
				<p>
					This can be achieved by issuing command on your server: <code>chown nobody:nobody src/cz/brejchajan/restcms/config</code>.
					On most linux servers the nobody user and group is used for Apache, on OSX it is often _www. Exchange proper user and group
					in format <code>&lt;user&gt;:&lt;group&gt;</code> in the command if needed.
				</p>
				<p> Once you have created the <code>config</code> directory at desired path, feel free to proceed to next steps.</p>
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("General"))</script></h2>
				</div>
				<div class="form-group">
					<label for="PROJECTDIR">RestCMS root directory</label>
					<input type="text" class="form-control" id="PROJECTDIR" name="PROJECTDIR" value="{$project_dir}" placeholder="Enter Database Login" />
					<p class="help-block">
						Change this default path only if you are sure it is wrong. It is the path on your server to the root of RestCMS project.
						Please, be really careful here, without this setting the system cannot work at all!
					</p>
				</div>
		
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Timezone settings"))</script></h2>
				</div>
				<p>As the RestCMS php backend needs to use time functions, please choose the timezone that fits best in your case.</p>
				<div class="form-group">
					<label for="TIMEZONE">Timezone</label>
					<select class="form-control" id="TIMEZONE" name="TIMEZONE">
						{foreach from=$timezones key=timezoneName item=timezone}
					<option value="{$timezoneName}">{$timezone}</option>
						{/foreach}
					</select>
				</div>
				<ul class="pager">
				  <li class="disabled"><a href="#">&larr; Previous step</a></li>
				  <li><a href="#" class="step2btn">Next step &rarr;</a></li>
				</ul>
			</div>
			
			<div class="tab-pane" id="step2">
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Database configuration"))</script></h2>
				</div>
				<p>Here configure your database connection.</p>
		
				<div class="form-group">
					<label for="DBTYPE">Type of Database 
						<span class="badge" data-toggle="tooltip" data-trigger="hover" data-original-title="Tooltip on left" title="Only MySQL database type is now supported. More databases will be added in near future.">
							<span class="glyphicon glyphicon-info-sign">
							</span>
						</span>
					</label>
					<select class="form-control" id="DBTYPE" name="DBTYPE">
						<option value="mysql">MySQL</option>
					</select>
				</div>
				<div class="form-group">
					<label for="DBNAME">Name of database</label>
					<input type="text" class="form-control" id="DBNAME" name="DBNAME" placeholder="Enter name of the database" />
					<p class="help-block">Create the database for RestCMS system (or obtain one from your provider). 
					Enter here the name of your database (e.g. the name you see in PhpMyAdmin or some other database management tool).</p>

					<label for="DBUSER">Login</label>
					<input type="text" class="form-control" name="DBUSER" id="DBUSER" placeholder="Enter Database Login" />

					<label for="DBPASSWORD">Password</label>
					<input type="text" class="form-control" name="DBPASSWORD" id="DBPASSWORD" placeholder="Enter Database Password" />
				</div>
				<ul class="pager">
				  <li><a href="#" class="step1btn">&larr; Previous step</a></li>
				  <li><a href="#" class="step3btn">Next step &rarr;</a></li>
				</ul>
			</div>
			
			<div class="tab-pane" id="step3">		
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Google Plus Sign In Configuration"))</script></h2>
				</div>
				<p>
					The default (and currently the only supported) login method is Google Plus Sign In. It's of course
					absolutely free of charge and provides high security. It is supposed you already have a google account, if not please
					<a href="https://accounts.google.com/SignUp?continue=https%3A%2F%2Fwww.google.cz%2F&hl=cs" target="_blank" title="Create new Google account">create one</a>.
				</p>
				<p>
					Now log into <a href="https://code.google.com/apis/console" target="_blank" title="Google Apis Console">Google Apis Console</a> and follow 
					<a href="https://developers.google.com/+/quickstart/javascript" target="_blank" title="Google Plus Sign In Tutorial">google tutorial</a>
					for google sign in to obtain Client ID and Client secret keys. From the tutorial, follow Step 1 only, all other steps were already implemented in 
					RestCMS system for you.
				</p>
				<p>
					When prompted to enter <b>JavaScript Origin</b>, please enter the full address of your site (e.g. http://yoursite.com), with and without www if aplicable.
					To <b>Redirect Uri</b> please enter the addresses you entered to JavaScript Origins, and the same once more with /index.html suffix (e.g.
					http://yoursite.com and http://yoursite.com/index.html), with and without www if aplicable.
				</p>
		
				<div class="form-group">
					<label for="CLIENT_ID">Client ID</label>
					<input type="text" class="form-control" id="CLIENT_ID" name="CLIENT_ID" placeholder="Enter Client ID key" />
	
					<label for="CLIENT_SECRET">Client secret</label>
					<input type="text" class="form-control" id="CLIENT_SECRET" name="CLIENT_SECRET" placeholder="Enter Client Secret key" />
				</div>
				<ul class="pager">
				  <li><a href="#" class="step2btn">&larr; Previous step</a></li>
				  <li><a href="#" class="recapbtn">Next step &rarr;</a></li>
				</ul>
			</div>		
			<div class="tab-pane" id="recap">		
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Recapitulation"))</script></h2>
				</div>
				<p>Please check the setup you have made through the installer. If everything fits, just press Install.</p>
				<table class="table table-striped">
					<tbody>
						<tr>
							<td colspan="2"><b>General</b></td>
						</tr><tr>
							<td>RestCMS Root directory</td><td id="recapPROJECTDIR"></td>
						</tr><tr>
							<td>Timezone</td><td id="recapTIMEZONE"></td>
						</tr><tr>
							<td colspan="2"><b>Database configuration</b></td>
						</tr><tr>
							<td>Database type</td><td id="recapDBTYPE"></td>
						</tr><tr>
							<td>Database name</td><td id="recapDBNAME"></td>
						</tr><tr>
							<td>Database login</td><td id="recapDBUSER"></td>							
						</tr><tr>
							<td>Database password</td><td id="recapDBPASSWORD"></td>
						</tr><tr>
							<td colspan="2"><b>Google Plus Sign In Configuration</b></td>
						</tr><tr>
							<td>Google Plus Client ID</td><td id="recapCLIENT_ID"></td>
						</tr><tr>
							<td>Google Plus Client Secret</td><td id="recapCLIENT_SECRET"></td>
						</tr>
					</tbody>
				</table>

				<ul class="pager">
				  <li><a href="#" class="step3btn">&larr; Previous step</a></li>
				  <li class="disabled"><a href="#">Next step &rarr;</a></li>
				</ul>
				<input type="submit" class="btn btn-success btn-block btn-lg" value="install">
			</div>
			<div class="tab-pane" id="done">		
				<div class="page-header">
					<h2><script type="text/javascript">document.write(_("Installation Complete"))</script></h2>
				</div>
				<p>Congratulations! Your RestCMS has been installed on your server. Lets start <a href="{$web_address}">use it</a>!
			</div>
		</div>
		
		<!-- Site footer -->
		<div class="footer">
			<p>RestCMS installation wizard, &copy; Jan Brejcha 2014</p>

			<!--<div id="gConnect">
				<button class="g-signin"
					data-scope="https://www.googleapis.com/auth/plus.login email"
					data-requestvisibleactions="http://schemas.google.com/AddActivity"
					data-clientId="965352633379-id8mac0mg6o26qi8v0qdru88tqggh5v4.apps.googleusercontent.com"
					data-accesstype="offline"
					data-callback="onSignInCallback"
					data-theme="dark"
					data-cookiepolicy="single_host_origin">
				</button>
			</div>
			<div id="gDisconnect">
				<div>Přihlášen <span id="userEmail"></span>, v roli <span id="userRole"></span>.</div>
				<button class="btn btn-primary">Odhlásit se</button>
			</div>
			-->
		</div> <!-- /footer -->
		<script type="text/javascript">		
			function onSignInCallback(authResult) {
			  	RestCMS.onSignInCallback(authResult);
			}
		</script>
		<!-- Activate tooltips and tabs-->
		<script type="text/javascript">
			//close the alert
			$('#alert').hide();
		
			var verifyStep1 = function(){
				var ok = true;
				if ($('#PROJECTDIR').val() == '')
					ok = false;
				if ($('#TIMEZONE').val() == '')
					ok = false;
				return ok;
			};
			
			var verifyStep2 = function(){
				var ok = true;
				if ($('#DBTYPE').val() == '')
					ok = false;
				if ($('#DBNAME').val() == '')
					ok = false;
				if ($('#DBUSER').val() == '')
					ok = false;
				if ($('#DBPASSWORD').val() == '')
					ok = false;
				return ok;
			};
			
			var verifyStep3 = function(){
				var ok = true;
				if ($('#CLIENT_ID').val() == '')
					ok = false;
				if ($('#CLIENT_SECRET').val() == '')
					ok = false;
				return ok;
			};
			
			var showAlert = function(msg){
				$('#alert').html(msg);
				$('#alert').show();
			}
		
			$(function () {
				$("[data-toggle='tooltip']").tooltip();
			});
			
			$('.step1btn').click(function (e) {
			  $('#alert').hide();
			  e.preventDefault()
			  $('#stepTabs [href="#step1"]').tab('show')
			})
			$('.step2btn').click(function (e) {
		      $('#alert').hide();
			  e.preventDefault()
			  if (verifyStep1())
				$('#stepTabs [href="#step2"]').tab('show')
			  else{
			  	showAlert("You have to fill all fields before you go next.");
			  }
			})
			$('.step3btn').click(function (e) {
			  $('#alert').hide();
			  e.preventDefault()
			  if (verifyStep2())
				$('#stepTabs [href="#step3"]').tab('show')
			  else{
			  	showAlert("You have to fill all fields before you go next.");
			  }
			})
			$('.donebtn').click(function (e) {
			  $('#alert').hide();
			  e.preventDefault()
			  $('#stepTabs [href="#done"]').tab('show')
			})
			$('.recapbtn').click(function (e) {
			  $('#alert').hide();
			  e.preventDefault()
			  if (!verifyStep3())
			  	showAlert("You have to fill in all fields before you go next.");
			  else{
				  //update recap
				  $('#recapPROJECTDIR').html($('#PROJECTDIR').val());
				  $('#recapTIMEZONE').html($('#TIMEZONE').val());
				  $('#recapDBTYPE').html($('#DBTYPE').val());
				  $('#recapDBNAME').html($('#DBNAME').val());
				  $('#recapDBUSER').html($('#DBUSER').val());
				  $('#recapDBPASSWORD').html($('#DBPASSWORD').val());
				  $('#recapCLIENT_ID').html($('#CLIENT_ID').val());
				  $('#recapCLIENT_SECRET').html($('#CLIENT_SECRET').val());
			  
				  //show recap
				  $('#stepTabs [href="#recap"]').tab('show')
			  }
			})
			//reload project dir on page reload.
			$('body').load(function(e){
				$('#PROJECTDIR').val('{$project_dir}');
			});
		</script>
		</form>
    </div> <!-- /container -->
	</body>
</html>