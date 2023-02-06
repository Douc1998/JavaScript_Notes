// 父类
class Person{
  static print(){ // 静态方法
    console.log('I am father');
  }
}

// 派生类
class Student extends Person{
  static print(){
    super.print(); // 在派生类静态方法中调用父类静态方法
  }
}

Student.print(); // I am father