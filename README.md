# car-rental
Simple web app that models a car rental service.

## Installation
Before running this web app you must have the following installed on your computer:
* [NodeJS](https://nodejs.org/en/)
* [GulpJS](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* [MySQL](http://dev.mysql.com/)

It is easiest to install NodeJS and MySQL through [Homebrew](http://brew.sh/). Gulp can be installed globally through Node's NPM.

### Running the app
* Run `npm install` to install all packages locally
* Run `gulp start-db` to start the mysql server
* Run `mysql -u root < setup.sql` to initialize database
* Run `gulp` to run the app in development mode (`gulp production` will build the app for production)

## Contributors
* [teob832](https://github.com/teob832)
* [triedal](https://github.com/triedal)

*Will add more later as app progresses.* - @triedal
