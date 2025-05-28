require('dotenv').config()
const app = require('./app')
const { seedPlanets } = require('./seed.js')

app.listen(3000, async () => {
    if (process.env.NODE_ENV != "prod") {
        await seedPlanets();
        console.logs(" planets are seeded successfully ! ")
    }

    console.log("Server successfully running on port - " + 3000);
})

