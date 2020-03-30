const express = require( "express" );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );
require('dotenv').config()


mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessTracker', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set('useCreateIndex', true);
// const orm = require( './orm' );

const workout = require('./db/workout.js');
const resistance = require( './db/resistance.js' );
const cardio = require( './db/cardio.js' );


const PORT = process.env.PORT || 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get( '/exercise', function( req, res){
    res.sendFile(__dirname +'/public/exercise.html')
})

//createWorkout
app.post( '/api/workouts', function( req, res ){

    const dbWorkout = new workout (  );
    dbWorkout.save();
    console.log( 'dbWorkout:', dbWorkout );
    //  dbWorkout.save(  );
    res.send( dbWorkout );
})

app.post( '/api/workouts/:id', async function ( req, res ){
    const id =  req.params.id ;
    console.log('id: ', id );
    console.log('create exercise body: ', req.body );
    if ( req.body.type === 'resistance'){
        const dbResistance = new resistance ( req.body );
        dbResistance.save();
        console.log( dbResistance );
        const resistanceId = mongoose.Types.ObjectId( dbResistance._id );
        const pushResistanceArray = await workout.findByIdAndUpdate({_id:`${id}`}, { $push: { resistance: resistanceId } });
    } else if ( req.body.type === 'cardio' ){
        const dbCardio = new cardio ( req.body );
        dbCardio.save();
        console.log( dbCardio );
        const cardioId = mongoose.Types.ObjectId( dbCardio._id );
        console.log('cardio id:', cardioId );
        const pushCardioArray = await workout.findByIdAndUpdate({_id:`${id}`}, { $push: { cardio: cardioId } });
    }
    res.send( '')
})

app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });

 