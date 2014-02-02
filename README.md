RestCMS
==================

Introduction
------------------

Easy to manage, highly extensible CMS system based on JavaScript and Rest. Thick client, thin server.

The basic idea if this project is: the server manages only the data of the CMS application.
The presentation layer is the HTML webpage only, with thick frontend JavaScript library that
serves the content from the server. The JavaScript RestCMS client contains several components
such as ArticleComponent or MainComponent, that are responsible for managment of the content.

The project is very young, but grows really fast. Just check out our 
<a href="http://restcms.brejchajan.cz">homepage</a> to see the system in action. Meanwhile we are
building the Docs and How tos for you (in english and czech). We hope it is ready until 
the end of the February.

Stay tuned, the RestCMS is coming.

Architecture
------------------
The RestCMS system consists of two main parts. The first one is the server implementation, 
which can be found at {RestCMSDir}/src/cz/brejchajan/restcms. The server is implemented in 
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
	-	ArticleComponent: 	Component responsible for article management. It can create, edit,
							delete and sort the articles. For the text input the TextInputComponent
							is used.
	- 	TextInputComponent: This component is in fact rich text editor, with which the text
							can be edited. It now supports Bold, Italics, Underline, six
							levels of headings, external links, and internal links. Internal
							link is link to another section on the web. It starts with # (hash)
							symbol and is treated as link to the section named the same as 
							the link is (without the # symbol).
							In the future we plan to extend this component for drag and drop
							of images and files that could be added directly to the text, or
							below the article.
	- 	MainComponent: 		This component connect all other components together and makes 
							the whole system. Other components are registered to the main component,
							which should have only one instance per application. The main component
							is responsible for choosing right parent element for current 
							section (as all section templates are written into one HTML file -
							the index.html). It is also responsible for calling broadcast
							callbacks to other components -- e.g. when the user loggs in
							or out.
							
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
The installation is not complicated, though we are planning to add user-friendly installer in
the future, that will handle the configuration.

1) Clone the git repository and copy it in your server DocumentRoot directory. We recommend you
to create a bare repository with post-receive hook to copy the repository content into the web
directory. With this setting you will be able to install new versions of RestCMS in a few seconds,
but it is not obligatory to do so.
2) Create the database on your MySQL server. If you want to have some other server than MySQL,
you must change the Doctrine database driver in {RestCMSDir}/bootstrap.php in section "Database
configuration parameters". Other drivers than MySQL were not tested, though.
3) Go to {RestCMSDir}/src/cz/brejchajan/restcms/config.php and change the PROJECT_DIR 
to the directory {RestCMSDir} - the root of your project. It should be absolute path on your
fileystem. Please, change the settings of your database connection as well.
4) Register new Google app on <a href="https://code.google.com/apis/console">Google apis console</a>.
If you are not familiar with this, please refer <a href="https://developers.google.com/+/quickstart/javascript">
google tutorial</a> (just section 1) for google plus sign in. The next steps in the tutorial
are implemented in RestCMS.
5) Update the config.php file with the CLIENT_ID and CLIENT_SECRET keys.
6) Create the database schema running the '''php vendor/bin/doctrine orm:schema-tool:update --force --dump-sql'''
command, or you can just issue the '''./dbupdate.sh''' command. If you do not have access to 
server console (e.g. through ssh or by some other way), you can create your database locally
and then copy it as raw SQL to the database on server.
7) Open your browser and go to your webpage. It should say, that this template is not installed
and it would be installed right after you log in with admin rights.
8) Log in with your google account (on the bottom of the default index.html page). As you login
as the first user, you will be granted the ADMIN rights and the default template will be installed
with all components that are needed into your database.
9) Now you are ready to go to hack the default template and make a design as you wish. You can
create new components and assign them to the elements in the page. Tutorials how to do this and
much more will be prepared next week (8 or 9th of february 2014).

If you come across any troubles, please feel free to report a bug into the bug tracker here on our
Github page. We will be glad to fix them!

Also, if you like the RestCMS project, consider, if you would like to help us improve it. We are
looking for HTML and CSS coders, JS and php programmers and designers. More information how to contribute
will be added later.




							


