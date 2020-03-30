const express = require( "express" );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );
require('dotenv').config()


mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/undefined', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);
// const orm = require( './orm' );

const workout = require('./db/workout.js');
const resistance = require( './db/resistance.js' );
const cardio = require( './db/cardio.js' );


const PORT = process.env.PORT || 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


app.get( '/exercise', function( req, res){
    res.sendFile(__dirname +'/public/exercise.html')
})

//createWorkout
app.post( '/api/workouts', function( req, res ){
    const dbWorkout = new workout ( );
    console.log( 'dbWorkout:', dbWorkout );
    //  dbWorkout.save(  );
    res.send( dbWorkout );
})

app.put( '/api/workouts/:id', function ( req, res ){
    const id = req.params.id;
    console.log('id: ', id );
    console.log('create exercise body: ', req.body );
    res.send( '')
})

app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });

 