//Array destructuring

const address = ['12899 S Jupiter Street', 'Philadelphia', 'Pennsylvania', '19415'];

const [, city, state] = address;

console.log(`You are in ${city} ${state}.`);