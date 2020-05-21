Youtube Search
==============

An application for searching YouTube videos by keywords, as well as for saving search queries.      

Getting started
---------------

The project was created using the JavaScript library React and its interaction with Redux on the client side and JavaScript runtime environment Node.js on the server side.

### Software

What software do you need to install and how to install them to start a project?

* Download and install the Node.js source code or a pre-built installer for your platform by link: https://nodejs.org/en/download/
* Download and install the MongoDB server for your platform by link: https://www.mongodb.com/download-center/community. Link to installation instructions: https://docs.mongodb.com/manual/administration/install-community/. 

### Settings
First to open a terminal and execute this command: 

    $ git clone https://github.com/NKonstantin007/Youtube-search.git

#### Client settings

To open a terminal in project folder `/client` and run this command:

    $ npm install

To open a project folder and then to open a file `/client/keys/index.js`. To change in export object a property `youtubeApiKey` to your YouTube API key.To go to this [link](https://www.slickremix.com/docs/get-api-key-for-youtube/) and to find how to get the API key for YouTube.

#### Server settings

To start the MongoDB server, use this command in Linux:

    $ sudo service mongod start

To enter in the MongoDB shell, use this command in Linux:

    $ mongo

To enter the following commands in mongo sequentially and after each command press on the keyboard Enter:

    $ use youtubesearchdb
    $ db.users.save( { name: "admin", password: "admin" } )
    $ db.users.save( { name: "<write your username>", password: "<write your password>" } )

To open a terminal in project folder `/server` and run this command:

    $ npm install
To compile a TypeScript code, use this command: 

    $ npm run tsc

Launch application
------------------

To start the application you need to open two terminals. The first to start the server, the second to start the client.

Open a terminal in the folder `/server` and run the command:

    $ npm start

Open another terminal in the folder `/client` and run the command:

    $ npm start

`Note`:  Before each application launch you need
to start the MongoDB server, use this command in Linux:  
    
    $ sudo service mongod start
