const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, description } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const des = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6453f5e41df09151cd627274',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `${sample(description)}`,
            price,
            images:  [
                // {
                //   url: 'https://res.cloudinary.com/dg8uvpwyl/image/upload/v1683351304/YelpCamp/dymm4n72ap9lxg0bj8wm.jpg',
                //   filename: 'YelpCamp/dymm4n72ap9lxg0bj8wm',
                // },
                {
                  url: 'https://res.cloudinary.com/dg8uvpwyl/image/upload/v1683351305/YelpCamp/h047dkhjjgmcqpmrmhhr.jpg',
                  filename: 'YelpCamp/h047dkhjjgmcqpmrmhhr',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})