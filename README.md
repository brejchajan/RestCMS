RestCMS
==================

Help us!
------------------
If you like the project we would be glad for help! This piece of software needs a lot of 
different things to be done which requires different people at different positions.
There is programming in php and JavaScript. You can also make translations (at least English - Czech).
We also need webdesigners, so so HTML and CSS coders are welcome.

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
<a href="http://restcms.brejchajan.cz">homepage</a> to see the system in action. Meanwhile we are
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




							


