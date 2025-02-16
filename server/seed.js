const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/user');
const Product = require('./models/product');
const Category = require('./models/category');
const faker = require('faker');
const Review = require('./models/review');  


mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('Existing data cleared.');

    // Create Users
    const user1 = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      isSeller: true
    });

    const user2 = new User({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      isSeller: false
    });

    await user1.save();
    await user2.save();
    console.log('Users created.');

    // Define Categories
    const categoryNames = ['Electronics', 'Clothing', 'Books', 'Home Appliances', 'Sports'];

    let categories = [];
    for (let name of categoryNames) {
      const category = new Category({ name });
      await category.save();
      categories.push(category);
    }
    console.log('Categories created.');

    // Add Products to Each Category
    for (let category of categories) {
      for (let i = 0; i < 5; i++) {
        let product = new Product({
          title: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: faker.commerce.price(),
          category: category._id,
          owner: user1._id,
          image: faker.image.imageUrl()
        });
        await product.save();
      }
    }
    console.log('Products created.');

    console.log('Database seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedDatabase();
