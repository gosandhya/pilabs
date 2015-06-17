/*var ChatJquery = function (firstName) {

	this.firstName = firstName;
	console.log("person instantiated")
};


var p1 = new ChatJquery("bob");
var p2 = new ChatJquery("lice");

console.log('person1 is ' + p1.firstName); // logs "person1 is Alice"
console.log('person2 is ' + p2.firstName); // logs "person2 is Bob"*/


var Person = function (firstName) {
  this.firstName = firstName;
};

Person.prototype.sayHello = function() {
  console.log("Hellaaaao, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");

// call the Person sayHello method.
person1.sayHello(); // logs "Hello, I'm Alice"
person2.sayHello(); // logs "Hello, I'm Bob"