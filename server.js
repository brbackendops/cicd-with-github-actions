require('dotenv').config()
const app = require('./app')
const { seedPlanets } = require('./seed.js')

app.listen(3000, () => {
    if (process.env.NODE_ENV != "prod") {
        seedPlanets();
        console.logs(" planets are seeded successfully ! ")
    }

    console.log("Server successfully running on port - " + 3000);
})

