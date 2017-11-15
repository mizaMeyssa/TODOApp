# TO DO Application with MEAN Stack

This MEAN Stack based application allows you to manage your TO DOs on a daily basis.

## Authors

* **Maissa Jabri**  - [mizaMeyssa](https://github.com/mizaMeyssa)

## Prerequisites

* Monogo database
* NodeJS

## Installation

* Install Mongo Database locally from here ()
* Install Nodejs from here ()
* Download the package and go under TODO_app folder
* Run what follows to download and install all node dependecies 
```
npm install
```

## Deployment

### Launching the database server
* Run what follows under TODO_app folder
```
alias mongo="<your_MongoDB_path>/Server/3.4/bin/mongo"
```
```
mongod --dbpath data
```

### Launching the application server
* Run what follows under TODO_app folder
```
node server/server.js
```
This way we are serving both the application and the web server under localhost:3000.

### Building the client code
* Run what follows under TODO_app folder
```
node_modules/gulp/bin/gulp.js build
```