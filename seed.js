// Create the model from your schema
const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

const Planet = mongoose.model('Planet', dataSchema);

async function connectToDatabase() {
    const mongoUri = process.env.MONGO_URI
        try {
            console.log(`🔄 Attempting to connect to MongoDB (attempt ${attempt}/${maxRetries})...`);

            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000,
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
            });

            console.log('✅ Connected to MongoDB successfully');
            return;
        } catch (error) {
            console.log(`❌ Connection attempt ${attempt} failed:`, error.message);
            throw new Error(`Failed to connect to MongoDB after ${maxRetries} attempts: ${error.message}`);
        }
    }
}


// Seed function to populate planets data
seedPlanets = async () => {
    try {
        // Check if data already exists
        const count = await Planet.countDocuments();
        if (count === 0) {
            await Planet.insertMany([
                {
                    id: 1,
                    name: 'Mercury',
                    description: 'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth\'s Moon.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/mercury-11591_1280.jpg',
                    velocity: '47.4 km/s',
                    distance: '57.9 million km from Sun'
                },
                {
                    id: 2,
                    name: 'Venus',
                    description: 'Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/venus-11590_1280.jpg',
                    velocity: '35.0 km/s',
                    distance: '108.2 million km from Sun'
                },
                {
                    id: 3,
                    name: 'Earth',
                    description: 'Our home planet is the only place we know of so far that\'s inhabited by living things. It\'s also the only planet in our solar system with liquid water on the surface.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_1280.jpg',
                    velocity: '29.8 km/s',
                    distance: '149.6 million km from Sun'
                },
                {
                    id: 4,
                    name: 'Mars',
                    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/mars-11593_1280.jpg',
                    velocity: '24.1 km/s',
                    distance: '227.9 million km from Sun'
                },
                {
                    id: 5,
                    name: 'Jupiter',
                    description: 'Jupiter is more than twice as massive as the other planets of our solar system combined. The giant planet\'s Great Red Spot is a centuries-old storm.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/jupiter-11592_1280.jpg',
                    velocity: '13.1 km/s',
                    distance: '778.5 million km from Sun'
                },
                {
                    id: 6,
                    name: 'Saturn',
                    description: 'Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is not the only planet to have rings, but none are as spectacular or complex.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/saturn-11594_1280.jpg',
                    velocity: '9.7 km/s',
                    distance: '1.43 billion km from Sun'
                },
                {
                    id: 7,
                    name: 'Uranus',
                    description: 'Uranus—seventh planet from the Sun—is unique in that it rotates on its side. Most planets spin on an axis nearly perpendicular to the plane of the ecliptic.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/uranus-11596_1280.jpg',
                    velocity: '6.8 km/s',
                    distance: '2.87 billion km from Sun'
                },
                {
                    id: 8,
                    name: 'Neptune',
                    description: 'Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold, and whipped by supersonic winds.',
                    image: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/neptune-11595_1280.jpg',
                    velocity: '5.4 km/s',
                    distance: '4.50 billion km from Sun'
                }
            ]);
            console.log('✅ Planets seeded successfully');
        } else {
            console.log('🌍 Planets data already exists');
        }
    } catch (error) {
        console.error('❌ Error seeding planets:', error);
    }
};


async function runSeed() {
    try {
        await connectToDatabase()
        await seedPlanets()
        console.log('✅ Planets seeded successfully');
        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding planets:', error);
        process.exit(1)
    }
}


if ( require.main === module) {
    runSeed();
}