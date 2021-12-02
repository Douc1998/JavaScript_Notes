
let person1 = new Object();
person1.name = 'douchen';
person1.age = 23;
person1.saySchool = function(){
    console.log('I am from Wuhan University !');
}
console.log(person1.name); // douchen
console.log(person1['age']); // 23
let descriptorName = Object.getOwnPropertyDescriptor(person1, 'name');
let descriptorAge = Object.getOwnPropertyDescriptor(person1, 'age');
let descriptorSchool = Object.getOwnPropertyDescriptor(person1, 'saySchool');
console.log(descriptorName);
console.log(descriptorAge);
console.log(descriptorSchool);

let descriptor = Object.getOwnPropertyDescriptors(person1);
console.log(descriptor);
/**
{
  name: {
    value: 'douchen',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { value: 23, writable: true, enumerable: true, configurable: true },
  saySchool: {
    value: [Function (anonymous)],
    writable: true,
    enumerable: true,
    configurable: true
  }
}
*/