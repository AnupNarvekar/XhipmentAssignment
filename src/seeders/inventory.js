require('dotenv').config();
require('../config/db');
const inventory = require('../models/inventory');

// Sample product data to seed
const data = [
    { productId: "BIS001", stock: 100 },
    { productId: "BIS002", stock: 10 },
    { productId: "BIS003", stock: 90 },
    { productId: "BIS004", stock: 70 },
    { productId: "BIS005", stock: 2 },
    { productId: "BIS006", stock: 95 },
    { productId: "BIS007", stock: 60 },
    { productId: "CHC001", stock: 12 },
    { productId: "CHC002", stock: 11 },
    { productId: "CHC003", stock: 75 },
    { productId: "CHC004", stock: 65 },
    { productId: "CHC005", stock: 90 },
    { productId: "CHC006", stock: 4 },
    { productId: "CHC007", stock: 50 },
    { productId: "CHC008", stock: 40 },
    { productId: "CHC009", stock: 20 },
    { productId: "CHC010", stock: 130 },
    { productId: "CHC011", stock: 190 },
    { productId: "CHC012", stock: 1 },
    { productId: "CHC013", stock: 160 },
    { productId: "CHC014", stock: 3 },
    { productId: "CHC015", stock: 140 },
    { productId: "NOD001", stock: 130 },
    { productId: "NOD002", stock: 9 },
    { productId: "NOD003", stock: 24 },
    { productId: "CHP001", stock: 90 },
    { productId: "CHP002", stock: 0 },
    { productId: "CHP003", stock: 70 },
    { productId: "CHP004", stock: 85 },
    { productId: "CHP005", stock: 2 },
    { productId: "CHP006", stock: 75 },
    { productId: "CHP007", stock: 0 },
    { productId: "CHP008", stock: 50 },
    { productId: "CHP009", stock: 95 },
    { productId: "BIS011", stock: 105 },
    { productId: "BIS012", stock: 115 },
    { productId: "BIS013", stock: 125 }
];

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        // clear existing products
        await inventory.deleteMany({});
        console.log('Existing products removed');

        // bulk insert data
        await inventory.insertMany(data);
        console.log('Products seeded successfully');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB Atlas');
    }
}

seedData();