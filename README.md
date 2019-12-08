# Interactive-Web-Applications-2019a ![nodeJS icon](https://assets.coingecko.com/coins/images/1061/small/js.png?1511578998)

## table of contents

* Goals
* Brief
* Requirements
* NPM dependencies
* Technology backend
* Technology Frontend
* Technology Database
* Take away
* API
* Reference


## Goals

1. Develop the needs of a web application and implement an intuitive and user-centric interface
design that can be applied to web applications to develop customizable user interfaces.
2. Implement the requirements of an interactive web application solution taking into account
the framework, user interface and storage needs.
3. Design embeddable services that can integrate simple web applications into hosted web
services.
4. Assess the security needs of a web application to aid the development and integration of
security measures. 


## Brief

A website for a new english teaching company, with slick responsive design and a blogging system.
The blogging system must be able to display related youtube links and censor out bad words.
As well as all CRUD functionality. 

## Requirements
  * NodeJS
  * express 4+
  * (optional) nodemon
  
  
## NPM dependencies
* bad-words
* http
* url
* fs
* express
* Jsontoxml
* Xml2js
* xslt-processor


## Technology backend

Nodejs and express was used to build the JSON and XML powered API. Trying to create readable code and utilising ES6 features
as well as staying true to the design princibles of functional programming.

## Technology frontend

Using bootstrap css and javascript building a responsive cross-broswer was fast and efficent.

## Technology database

Currently the database is a json fill which contains a list blogs.
However upgrading to a mongoDB should be straight forward as the database code is isolated away from the server logic.

## Take away
Using this stack development time was fast and still robust. Which only two minor bugs occuring due to incorrectly assign variables.
Theres was a error with cors so cors middleware was added to the server.
 
The database uses promises whoever I believe a simple callback would be sufficient as the error handling is not implement this is due to the fact that the server will die if database encounters a problem.
 
It may be better practice to return a error object {'statuscode','error message'} and handle it in blog.js.

## API
Post /blog 
Takes a json blog object which mendator fields.
Returns a JSON object that specifies if a error occurs or if a succeeds.

PUT /blog
Takes a blog object note does not need to contain all fields only fields specified will be added. Any field that is not listed will be removed.
Takes a id param in the query string specify which blog to update.
Returns a JSON object that specifies if a error occurs or if a succeeds.

Get /blog
Takes a id param in the query string specify which blog to return
Optional header value xml which iif set to ‘true’ will return the blog formated in a styled html.
Returns a JSON object that specifies if a error occurs or if a succeeds.

Delete /blog
Takes a id param in the query string specify which blog to return.
Returns a JSON object that specifies if a error occurs or if a succeeds.


