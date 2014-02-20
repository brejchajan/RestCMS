RestCMS
==================

Help us!
------------------
If you like the project we would be glad for help! This piece of software needs a lot of 
different things to be done which requires different people at different positions.
There is programming in php and JavaScript. You can also make translations (at least English - Czech).
We also need webdesigners, so so HTML and CSS coders as well as logo and UI designers are welcome.

If you are interested, please contact the project founder: brejchaja@gmail.com.
Thank you very much!

Introduction
------------------

Easy to manage, highly extensible CMS system based on JavaScript and Rest. Thick client, thin server.

The basic idea if this project is: the server manages only the data of the CMS application.
The presentation layer is the HTML webpage only, with thick frontend JavaScript library that
serves the content from the server. The JavaScript RestCMS client contains several components
such as ArticleComponent or MainComponent, that are responsible for managment of the content.

The project is very young, but grows really fast. Just check out our 
<a href="http://restcms.brejchajan.cz/#homeEn">homepage</a> to see the system in action. Meanwhile we are
building the Docs and How tos for you (in english and czech). We hope it is ready until 
the end of the February.

Stay tuned, the RestCMS is coming.

Architecture
------------------
The RestCMS system consists of two main parts. The first one is the server implementation, 
which can be found at ```{RestCMSDir}/src/cz/brejchajan/restcms```. The server is implemented in 
php and it is responsible to manage the content data through REST interface. Therefore
the server can provide only the data with no visual form. The visual form is defined on
presentaion layer, which is implemented as HTML and JavaScript on client side.

The second main part is the implementation of RestCMS JavaScript client library. Through
this JavaScript library the content is asynchronously downloaded from the RestCMS php server
and presented into the HTML template which is defined by the webmaster.

Thanks to this approach there is no need to create templates in php. You just create 
static HTML page (with all the CSS stuff as you need) and then just add components from
RestCMS JS library to be able to add, edit, delete and sort the content.

Client Components
-----------------
The RestCMS JS library provides components to be able to manage the content of the webpage.
Each component is bound with some HTML element into which the content is loaded.

As for now the components ready to use are:

- ArticleComponent: Component responsible for article management. It can create, edit,
delete and sort the articles. For the text input the TextInputComponent is used.

- TextInputComponent: This component is in fact rich text editor, with which the text
can be edited. It now supports Bold, Italics, Underline, six levels of headings, external
links, and internal links. Internal link is link to another section on the web. It starts
with # (hash) symbol and is treated as link to the section named the same as the link is
(without the # symbol). In the future we plan to extend this component for drag and drop
of images and files that could be added directly to the text, or below the article.

- MainComponent: This component connect all other components together and makes the whole
system. Other components are registered to the main component, which should have only one 
instance per application. The main component is responsible for choosing right parent 
element for current section (as all section templates are written into one HTML file -
the index.html). It is also responsible for calling broadcast callbacks to other 
components -- e.g. when the user loggs in or out.
							
Dependencies
------------------
All the dependencies that were possible to include were included into the project. For JavaScript
we need jQuery and Bootstrap libraries, for php RestCMS server there must be Silex, Doctrine,
Google api php client, twig and some other ones. All the dependencies for php are managed with 
composer, and are included into the project so there should not be any problems.

But not all dependencies can be bundled with the project. These are:
	
	- Php version should be at least php 5.3 or above with curl.
	- Doctrine is set up to use MySQL database. This can be changed in {RestCMSDir}/bootstrap.php
	in section "Database configuration parameters". For other drivers than MySQL please refer
 	<a href="http://www.doctrine-project.org" title="Doctrene docs">Doctrine documentation</a>.
 	
Installation
------------------

1) Clone the git repository and copy it in your server DocumentRoot directory. We recommend you
to create a bare repository with post-receive hook to copy the repository content into the web
directory. With this setting you will be able to install new versions of RestCMS in a few seconds,
but it is not obligatory to do so.

2) Add the directory for compiled Smarty templates to the group of your Apache server, like this:
```sudo chown nobody:nobody src/smarty/templates_c```. This works in case nobody is the user the Apache
is using. On OSX it is usually _www user and group.

3) Create the database on your MySQL server. No other servers than MySQL are supported now.

4) With your browser go to the page of your website in the form yoursite.com/installation.php.
This will run the installation wizard which instructs you what to do in your next steps.

5) Now you are ready to go to hack the default template and make a design as you wish. You can
create new components and assign them to the elements in the page. Tutorials how to do this and
much more will be prepared next week (8 or 9th of february 2014).

If you come across any troubles, please feel free to report a bug into the bug tracker here on our
Github page. We will be glad to fix them!

Also, if you like the RestCMS project, consider, if you would like to help us improve it. We are
looking for HTML and CSS coders, JS and php programmers and designers. More information how to contribute
will be added later.

Getting Started
===================
Html templates
-------------------
RestCMS is based on the idea that you create static HTML webpage where RestCMS JavaScript 
(JS) components are defined. These components transform the static HTML template to a 
dynamic webpage since they load the content through rest api from the backend dynamically. 
Thanks to this the whole website can be defined in only one HTML template. RestCMS 
components assure, that only the desired parts of the template are visible and the rest 
remains hidden. You can of course have multiple html files for some sections of your web 
as you like. But thanks to the fact that the content is loaded with ajax dynamically, the 
template definition remains compact even for bigger sites.

Minimal template
----------------
Now we will show how to build minimal HTML template with RestCMS components that bring the
asynchronously loaded content into the page. The minimal template I will describe can be 
viewed and downloaded at: http://restcms.brejchajan.cz/minimalistic_template.html. Look at 
the source code, below I will discuss it.

Header
----------------
```
...
<!-- RestCMS css (DO NOT REMOVE) -->
<link rel="stylesheet" type="text/css" href="../../js/RestCMS/css/RestCMSDefault.css" />
<!-- JQUERY (jQuery is needed for RestCMS and Bootstrap as dependency, DO NOT REMOVE!)-->
<script src="/js/jquery/jquery.js" type="text/javascript"></script>
<!-- RestCMS system javascript (DO NOT REMOVE) -->
<script src="/js/RestCMS/RestCMScompiled.js" type="text/javascript"></script>
		
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
...
```
At first we have to load css stylesheets of RestCMS components then we will loaf jQuery 
and compiled RestCMS JS library.

Template definition
To the rest of the header I will return later. It  is one of the most important parts 
where particular RestCMS components are defined which are bound with the HTML template. 
Now let's have a look at how the template looks like and then we will return to component 
definition.
```
...
<body>
    <h1>RestCMS</h1>
    <nav>
               <ul>
			<li><a href="#home" data-use-template="home">Home</a></li>
			<li><a href="#news" data-use-template="news">News</a></li>
			<li><a href="#gettingStarted" data-use-template="news">Gettung Started</a></li>
		</ul>
      </nav>
	  <div id="main">
	  	  <div id="home">
			  <div class="articles" data-component="articles" data-children-class="red"></div>
		  </div>
		  <div id="news">
			  <div class="articles" data-component="articles"></div>
		  </div>
	  </div>
...
</body>
</html>
```
Here we can see the actual code of the template. In the nav section there can be seen menu,
 which contains three elements: Home, News and Getting Started. Section Home has address 
 #home and if you click on this link this addres will show in the address bar of the browser. 
 Next there is attribute data-use-template which defines which element should be used as 
 atemplate for this section. In the code it is the element with id "home".

Element with id "home" defines the layout of section "Home" and thus is section template. 
It containst one div with class "articles". This div will contain dynamically loaded articles. 
Its second attribute data-children-class defines which class will be assigned to the 
children of this element - the particular articles. This way you can style articles in 
the article component, for instance you can style them to be all red. On this website we 
used this option to create columns of articles on the homepage.

Another section template is element with id "news". It does not contain the 
data-children-class attribute so no class is attached for child elements. 

All the section templates reside in element with id "main". This element is managed by 
"Main" component which manages which section template is currently visible according to 
which section the user currently is.

The definition of the section templates and the whole website template is done. As you can 
see, it is very easy and contain no design at all - the design should be defined by CSS. 
You can write your own, or use some third party library like bootstrap (getbootstrap.com), 
which is also used on this website. Now we can jump back to the header and make definition 
of the RestCMS JS components and connect them to the defined website template.

RestCMS JavaScript Components Definition
```
<head>
...
<!-- RestCMS initialization code (can be altered) -->
<script type="text/javascript">
	var run = function(){				
	        var article = new ArticleComponent("articles");
	        article.attachToDataComponent("articles");
				
	        var main = new MainComponent();
	        main.attachToClass("main");
	        main.addPage("home");
	        main.addPage("news");
	        main.registerPageComponent(article);
	        main.setIndexPage("home", "home");
		
	        RestCMS.setMainComponent(main);
        }
var engine = new RestCMS(run, "brejchajan", "default", "en");
</script>
...
</head>
```
RestCMS components are defined in the header of HTML code. The most important is the line 
before ```</script>``` tag, which instantiates the whole system. The first parameter of 
RestCMS constructor is callback to function run, which will be executed as soon as the 
whole HTML page is loaded. Second parameter is the vendor of this template. It is a simple 
string which should contain the name, nickname, abbreviation, company name, etc. and should
be for each vendor unique. You can choose what you want. The third parameter is template 
name, which is again a simple string. It should  somehow describe the template. The 
template should be unique across all template names from particular vendor. The la st 
parameter is language in which the RestCMS UI controls will be presented. Currently there 
are two options, either "en" for english and "cz" for czech.

In function run the RestCMS component are defined. There can be seen one ArticleComponent 
which has in constructor one parameter with the name of the component (you can choose 
whatever name you like, it will be used for persisting the content into the database). 
Each component when used for the first time while administrator is logged in is 
automatically installed to the database on your server. This is done in order to be able 
to identify where to place which content. If you name two components in one section 
template the same, the will load the same content. After the creation of ArticleComponent 
we attach it to the element which has data-component attribute equal to "articles". From 
the template definition we made earlier you can see, that there are two elements with 
data-component attribute equal to "articles". Because each of them is in different section 
template, the are not going to share the content - each will have its own. This is due to 
the management of the MainComponent, which adds prefix to the name of the component. The 
prefix is equal to the name of the section the user is currently seeing. Thanks to this
you can create only one component and attach it to more elements in several section 
templates. The content of these elements will be divided for each section separately.
With this functionality we avoid to instantiating redundant components which acts the same.

Next we create MainComponent. Its constructor does not have any parameters as there is no 
need to install MainComponent into the database. It is the component that manages which 
section template is currently visible and contains no dynamically loaded content itself. 
It has to be attached to some element (with attachToClass or attachToDataComponent). We 
attach it to the "main" element which contains all section templates of the website.

Now we call addPage("home") which means that we add section template called "home". We do 
the same for "news" and any other section template we have defined.

Then we register the components which are in one or more section templates. We do this by 
calling registerPageComponent method. we have to do this for every component which is 
presented in particular sections on the web. If we had some component which shall be visible 
on all sections (like the header or the footer of the webpage) and thus would be not in any 
section template we do not register it. Then we have to set the default (index) page by calling 
setIndexPage(sectionName, sectionTemplateName), here we want to show as index page the 
"home" section with "home" section template. At last we set the main component to the 
RestCMS system by calling RestCMS.setMainComponent(main). 

Now almost everything is done to have functional website template. We defined HTML 
template which contains several section templates and we defined the RestCMS JS components
which will manage the content of the sections.

Google Plus Sign In
---------------------
We must not forget to add the sign in and log out button, which was generated by the installer
wizard after the installation. You can visit the install.php script again and copy paste 
the generated code. 
```
<div id="gConnect">
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
        <div>Logged in <span id="userEmail"></span>, in role <span id="userRole"></span>.</div>
        <button class="btn btn-primary">Logout</button>
</div>

<script type="text/javascript">		
	function onSignInCallback(authResult) {
		RestCMS.onSignInCallback(authResult);
	}
</script>
```
The script written in bold  has to be added at the end of the website template before 
```</body>``` tag (or simply behind the google plus sign in button code) to the system be 
able to accept events that the user has been logged in and logged out. This script will be 
included in the RestCMS system and there will be not needed to add it manually to the page. 

Have a look at life example
----------------------------
The code I described here can be seen at restcms.brejchajan.cz/minimalistic_template.html. 
It is really simple and minimal template which is used by this website. I hope that after 
you have finished reading this article you are prepared to hack this template to suit your needs.




							


