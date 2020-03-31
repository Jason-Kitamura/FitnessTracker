const express = require( "express" );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessTracker', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set('useCreateIndex', true);
// const orm = require( './orm' );

const workout = require('./db/workout.js');
const exercise = require('./db/exercises');


const PORT = process.env.PORT || 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get( '/exercise', function( req, res){
    res.sendFile(__dirname +'/public/exercise.html')
})

app.get( '/api/workouts', async function (req, res ){
    const checkWorkouts = await workout.find();
    console.log('check workout: ', checkWorkouts[0] );
    if ( !checkWorkouts[0] ){
        console.log( `empty!`);
        res.send(checkWorkouts);
    } else {
        const id = checkWorkouts[0]._id
        const populateWorkout = await workout.findById( {_id : `${id}`}).populate('exercises');
        console.log('populate workouts', populateWorkout );
        res.send( populateWorkout );
    }

})

//createWorkout
app.post( '/api/workouts', async function( req, res ){
    const removeWorkout = await workout.deleteMany({});
    console.log('deleted workouts', removeWorkout );

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

    const dbExercise = new exercise ( req.body );
    dbExercise.save();

    const exerciseId = mongoose.Types.ObjectId( dbExercise._id );
    const pushExercisesArray = await workout.findByIdAndUpdate({_id:`${id}`}, { $push: { exercises: exerciseId } });

    const currentWorkout = await workout.findById( {_id:`${id}`} );
    console.log('current workout: ', currentWorkout )
    const workoutDuration = currentWorkout.totalDuration
    const newDuration = Number(workoutDuration) + Number(req.body.duration);
    const updateDuration = await workout.update( {_id:`${id}`}, {totalDuration : `${newDuration}` }  );
    console.log( 'new duration: ', newDuration );

    const workoutData = await workout.findById( {_id:`${id}`} ).populate('exercises');
    console.log('workoutData:', workoutData );

    res.send( workoutData );
 })


app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });

 