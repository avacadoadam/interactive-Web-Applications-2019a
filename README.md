# Interactive-Web-Applications-2019a ![nodeJS icon](https://assets.coingecko.com/coins/images/1061/small/js.png?1511578998)

table of contents
* Goals
* Brief
* Requirements
* NPM dependencies
* Technology backend
* Technology Frontend
* Technology Database
* Take away

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
  * jsontoxml

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


