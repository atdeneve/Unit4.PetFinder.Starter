//Pseudocode
// Create an array to retrieve data from file data.js
// Initialize your express app by importing, creating app instance,
// and setting a port 
// Get homepage
// get all pets from database, get pets with owners, and pets by name 
// start the server 

// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080; // initialize port 

app.use(express.static('public'))

// GET - / - returns homepage
// when someone wants to see the main page of the website/access the root path '/'
//if they are making a GET request to '/'
//then we send the conents of our mainpage (index.html)
app.get('/', (req, res) => { //handle request 
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + "/public/index.html")
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

//make a GET request to get all the pets from database 
//send the list of pets we have in the database 
// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

//make a get request
//look at request to find out the owner's type using the query string 
//search for the pet in database whose owner matches the provided owner type
//find the pet where the owner's type matches the provided owner type
//after finding the pet, we send it as a response and send back the info of the pet we found 
// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.type;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner.toLowerCase() === owner.toLowerCase());

    // send the pet as a response
    res.send(pet);

});

//make a get request
//look at request to find out the pet's name using the query string 
//search for the pet in database whose name matches the provided pet name 
//find the pet where the pet's name matches the provided pet name 
//after finding the pet we send it as a response and send back the info of the pet we found
// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());

    // send the pet as a response
    res.send(pet);

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;