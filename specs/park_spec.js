const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {
  let park1;

  beforeEach(function () {
    park1 = new Park ('Dino Land', 10, []);
    dinosaur1 = new Dinosaur('t-rex', 'carnivore', 50);
    dinosaur2 = new Dinosaur('velociraptor', 'carnivore', 25);
    dinosaur3 = new Dinosaur('triceratops', 'herbivore', 10);
    dinosaur4 = new Dinosaur('t-rex', 'carnivore', 30);
    park2 = new Park ('Dino Land 2', 8, [dinosaur1, dinosaur2, dinosaur3, dinosaur4]);
  })

  it('should have a name', function () {
    const actual = park1.name;
    assert.strictEqual(actual, 'Dino Land');
  });

  it('should have a ticket price', function () {
    const actual = park1.ticketPrice;
    assert.strictEqual(actual, 10);
  });

  it('should have a collection of dinosaurs', function () {
    const actual = park1.dinoList;
    assert.deepStrictEqual(actual, []);
  });

  it('should be able to add a dinosaur to its collection', function () {
    park1.addDinosaur(dinosaur1);
    const actual = park1.dinoList;
    assert.deepStrictEqual(actual, [dinosaur1])
  });

  it('should be able to remove a dinosaur from its collection', function () {
    park1.addDinosaur(dinosaur1);
    park1.addDinosaur(dinosaur2);
    park1.addDinosaur(dinosaur3);

    park1.removeDinosaur(dinosaur2);
    const actual = park1.dinoList;
    assert.deepStrictEqual(actual, [dinosaur1, dinosaur3]);
  });


  it('should be able to find the dinosaur that attracts the most visitors', function() {
    park1.addDinosaur(dinosaur1);
    park1.addDinosaur(dinosaur2);
    park1.addDinosaur(dinosaur3);

    const actual = park1.mostPopularDino();
    assert.deepStrictEqual(actual, dinosaur1);
  });


  it('should be able to find all dinosaurs of a particular species', function() {
    park1.addDinosaur(dinosaur1);
    park1.addDinosaur(dinosaur2);
    park1.addDinosaur(dinosaur3);
    park1.addDinosaur(dinosaur4);
    const actual = park1.findAllOfSpecies('t-rex');
    assert.deepStrictEqual(actual, [dinosaur1, dinosaur4]);

  });


  it('should be able to remove all dinosaurs of a particular species', function() {
    park1.addDinosaur(dinosaur1);
    park1.addDinosaur(dinosaur2);
    park1.addDinosaur(dinosaur3);
    park1.addDinosaur(dinosaur4);

    park1.removeAllOfSpecies('t-rex');
    const actual = park1.dinoList;
    assert.deepStrictEqual(actual, [dinosaur2, dinosaur3]);
  });

  it('should be able to report the number of visitors per day', function() {
    const actual = park2.visitorsPerDay();
    assert.strictEqual(actual, 115);
  });

  it('should be able to report the number of visitors per year', function() {
    const actual = park2.visitorsPerYear();
    const expected = 115 * 365;
    assert.strictEqual(actual, expected);
  });

  it('should be able to report the total revenue per year', function () {
    const actual = park2.revenuePerYear();
    const expected = 115 * 365 * 8;
    assert.strictEqual(actual, expected);
  });

  it('should be able to provide an object for dinos diet types', function () {
    const actual = park2.dinoDiets();
    const expected = { 'carnivore': 3, 'herbivore': 1, 'omnivore': 0 };
    assert.deepStrictEqual(actual, expected);
  });

});
