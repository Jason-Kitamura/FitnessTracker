const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log( 'json:', json);

    return json;
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];
    console.log( 'id:', id, 'data:', data );

    const res = await fetch("/api/workouts/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( data )
    }
    
    );
    console.log('sent new excercise')

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
