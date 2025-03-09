require('dotenv').config();
const mongoose = require('mongoose');
const products = require('../models/products');

// Sample product data to seed
const data = [
    {
        sku: "BIS001",
        name: "Parle-G",
        description: "Classic glucose biscuits",
        price: 10,
        category: "Biscuits"
    },
    {
        sku: "BIS002",
        name: "Bourbon",
        description: "Chocolate-filled sandwich biscuits",
        price: 30,
        category: "Biscuits"
    },
    {
        sku: "BIS003",
        name: "Hide & Seek Fab",
        description: "Chocolate cream biscuits",
        price: 35,
        category: "Biscuits"
    },
    {
        sku: "BIS004",
        name: "Good Day Butter",
        description: "Crunchy butter cookies",
        price: 25,
        category: "Biscuits"
    },
    {
        sku: "BIS005",
        name: "Jim Jam",
        description: "Jam-filled biscuits",
        price: 30,
        category: "Biscuits"
    },
    {
        sku: "BIS006",
        name: "Marie Gold",
        description: "Tea-time biscuits",
        price: 20,
        category: "Biscuits"
    },
    {
        sku: "BIS007",
        name: "Milk Bikis",
        description: "Milk-based biscuits",
        price: 25,
        category: "Biscuits"
    },
    {
        sku: "CHC001",
        name: "KitKat",
        description: "Crispy chocolate wafer",
        price: 20,
        category: "Chocolates"
    },
    {
        sku: "CHC002",
        name: "Munch",
        description: "Crunchy chocolate bar",
        price: 15,
        category: "Chocolates"
    },
    {
        sku: "CHC003",
        name: "Perk",
        description: "Wafer covered in chocolate",
        price: 15,
        category: "Chocolates"
    },
    {
        sku: "CHC004",
        name: "5 Star",
        description: "Chewy caramel chocolate",
        price: 25,
        category: "Chocolates"
    },
    {
        sku: "CHC005",
        name: "Dairy Milk",
        description: "Smooth milk chocolate",
        price: 40,
        category: "Chocolates"
    },
    {
        sku: "CHC006",
        name: "Milky Bar",
        description: "White chocolate bar",
        price: 30,
        category: "Chocolates"
    },
    {
        sku: "CHC007",
        name: "Silk",
        description: "Premium creamy chocolate",
        price: 70,
        category: "Chocolates"
    },
    {
        sku: "CHC008",
        name: "Bournville",
        description: "Dark chocolate",
        price: 90,
        category: "Chocolates"
    },
    {
        sku: "CHC009",
        name: "Alpenliebe",
        description: "Caramel-flavored candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "CHC010",
        name: "Melody",
        description: "Chocolate-filled caramel candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "CHC011",
        name: "Mango Bite",
        description: "Mango-flavored candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "CHC012",
        name: "Pulse",
        description: "Tangy-filled candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "CHC013",
        name: "Eclairs",
        description: "Caramel chocolate candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "CHC014",
        name: "Center Fruit",
        description: "Juicy chewing gum",
        price: 5,
        category: "Candies"
    },
    {
        sku: "CHC015",
        name: "Kacha Mango",
        description: "Raw mango candy",
        price: 2,
        category: "Candies"
    },
    {
        sku: "NOD001",
        name: "Maggi Noodles",
        description: "Instant noodles",
        price: 14,
        category: "Noodles"
    },
    {
        sku: "NOD002",
        name: "Top Ramen",
        description: "Spicy instant noodles",
        price: 12,
        category: "Noodles"
    },
    {
        sku: "NOD003",
        name: "Yippee Noodles",
        description: "Long and non-sticky noodles",
        price: 15,
        category: "Noodles"
    },
    {
        sku: "CHP001",
        name: "Lays Salted",
        description: "Classic salted potato chips",
        price: 20,
        category: "Chips"
    },
    {
        sku: "CHP002",
        name: "Lays Masala",
        description: "Spicy masala potato chips",
        price: 20,
        category: "Chips"
    },
    {
        sku: "CHP003",
        name: "Kurkure",
        description: "Crunchy masala snack",
        price: 20,
        category: "Chips"
    },
    {
        sku: "CHP004",
        name: "Bingo Mad Angles",
        description: "Triangular crispy chips",
        price: 20,
        category: "Chips"
    },
    {
        sku: "CHP005",
        name: "Pringles",
        description: "Stackable potato chips",
        price: 85,
        category: "Chips"
    },
    {
        sku: "CHP006",
        name: "Uncle Chips",
        description: "Classic potato chips",
        price: 20,
        category: "Chips"
    },
    {
        sku: "CHP007",
        name: "Too Yumm",
        description: "Baked snacks",
        price: 30,
        category: "Chips"
    },
    {
        sku: "CHP008",
        name: "Act II Popcorn",
        description: "Instant microwave popcorn",
        price: 25,
        category: "Snacks"
    },
    {
        sku: "CHP009",
        name: "Tedhe Medhe",
        description: "Masala-flavored crunchy sticks",
        price: 15,
        category: "Chips"
    },
    {
        sku: "BIS011",
        name: "Patanjali Doodh Biscuits",
        description: "Milk-based biscuits",
        price: 25,
        category: "Biscuits"
    },
    {
        sku: "BIS012",
        name: "Hide & Seek",
        description: "Chocolate chip cookies",
        price: 30,
        category: "Biscuits"
    },
    {
        sku: "BIS013",
        name: "Britannia Rusk",
        description: "Crispy wheat rusk",
        price: 40,
        category: "Biscuits"
    }
];

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');

        // clear existing products
        await products.deleteMany({});
        console.log('Existing products removed');

        // bulk insert data
        await products.insertMany(data);
        console.log('Products seeded successfully');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB Atlas');
    }
}

seedData();