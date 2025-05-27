const app = require('./app')
const { seedPlanets } = require('./seed.js')

app.listen(3000, () => {
//    seedPlanets();
    console.log("Server successfully running on port - " + 3000);
})

