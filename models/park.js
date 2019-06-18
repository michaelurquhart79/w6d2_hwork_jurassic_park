const Park = function (name, ticketPrice, dinoList) {
  this.name = name;
  this.ticketPrice = ticketPrice;
  this.dinoList = dinoList;
}

module.exports = Park;

Park.prototype.addDinosaur = function (dinosaur) {
  this.dinoList.push(dinosaur);
}

Park.prototype.removeDinosaur = function (dinosaur) {
  const indexToRemove = this.dinoList.indexOf(dinosaur);
  this.dinoList.splice(indexToRemove, 1);
}

Park.prototype.mostPopularDino = function () {
  let mostPopular = this.dinoList[0];
  this.dinoList.forEach(function(dino){
    if (dino.guestsAttractedPerDay > mostPopular.guestsAttractedPerDay){
      mostPopular = dino;
    }
  });
  return mostPopular;
}
Park.prototype.findAllOfSpecies = function (speciesToFind) {
  const arrayOfFound = this.dinoList.filter(dino => dino.species === speciesToFind);
  return arrayOfFound;
};

Park.prototype.removeAllOfSpecies = function (speciesToRemove) {
  const arrayToRemain = this.dinoList.filter(dino => dino.species != speciesToRemove);
  this.dinoList = arrayToRemain;
};

Park.prototype.visitorsPerDay = function () {
  let totaliser = 0;
  this.dinoList.forEach(function(dino) {
    totaliser += dino.guestsAttractedPerDay;
  });
  return totaliser;
};

Park.prototype.visitorsPerYear = function () {
  return this.visitorsPerDay() * 365;
}

Park.prototype.revenuePerYear = function () {
  return this.visitorsPerYear() * this.ticketPrice;
}

Park.prototype.dinoDiets = function() {
  const dinos = this.dinoList;
  const carniArray = dinos.filter(dino => dino.diet === 'carnivore');
  const herbiArray = dinos.filter(dino => dino.diet === 'herbivore');
  const omniArray = dinos.filter(dino => dino.diet === 'omnivore');
  const dinoDietObject = {
    carnivore: carniArray.length,
    herbivore: herbiArray.length,
    omnivore: omniArray.length
  };
  return dinoDietObject
}
