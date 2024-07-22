class User {
    constructor(id, username, email) {
      this.id = id;
      this.username = username;
      this.email = email;
    }
  
    // Method to get user details
    getUserDetails() {
      return `${this.username} (${this.email})`;
    }
  }

  // Encapsulation example with private properties using closures
class Car {
    constructor(make, model) {
      let _make = make; // private property
      let _model = model; // private property
  
      this.getMake = () => _make;
      this.getModel = () => _model;
      this.setMake = (make) => { _make = make; };
      this.setModel = (model) => { _model = model; };
    }
  }
  
  // Inheritance example
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`${this.name} makes a sound.`);
    }
  }
  
  class Dog extends Animal {
    speak() {
      console.log(`${this.name} barks.`);
    }
  }
  
  const dog = new Dog('Buddy');
  dog.speak(); // Output: Buddy barks.
  
  // Polymorphism example
class Shape {
    calculateArea() {
      return 0;
    }
  }
  
  class Circle extends Shape {
    constructor(radius) {
      super();
      this.radius = radius;
    }
  
    calculateArea() {
      return Math.PI * this.radius ** 2;
    }
  }
  
  class Square extends Shape {
    constructor(sideLength) {
      super();
      this.sideLength = sideLength;
    }
  
    calculateArea() {
      return this.sideLength ** 2;
    }
  }
  
  const shapes = [new Circle(5), new Square(4)];
  shapes.forEach(shape => console.log(shape.calculateArea()));
  // Output:
  // 78.53981633974483 (area of the circle with radius 5)
  // 16 (area of the square with side length 4)

  
  // Example of using classes in Node.js for API
class UserController {
    constructor() {
      this.users = [];
    }
  
    addUser(id, username, email) {
      const user = new User(id, username, email);
      this.users.push(user);
    }
  
    getUser(id) {
      return this.users.find(user => user.id === id);
    }
  }
  
  // Express.js example
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  
  app.use(bodyParser.json());
  
  const userController = new UserController();
  
  app.post('/users', (req, res) => {
    const { id, username, email } = req.body;
    userController.addUser(id, username, email);
    res.status(201).send('User added successfully');
  });
  
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = userController.getUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  