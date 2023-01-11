JS 内存管理 - JS 内存机制

1. 内存空间：栈内存(stack)、堆内存(heap)
   栈内存- 所有原始数据类型都存储在栈内存中，如果删除一个栈原始数据，遵循先进后出。=> a 先进栈，最后出栈

   堆内存- 引用数据类型会在堆内存中开辟一个内存空间，并会有一个十六进制的内存地址，在栈内存中声明的变量的值就是十六进制的内存地址
   存储的值大小不定，可动态调整
   空间较大，运行效率低
   无法直接操作其内部存储，使用引用地址读取
   通过代码进行分配空间

原始数据类型 => string, number, boolean, null, undefined
引用数据类型 => object, array, function

Symbol => 可以代表独一无二的值，最大的用法是用来定义对象的唯一属性名
BigInt => 可以表示任意大小的整数

引用类型存储在堆中的对象，占据空间大，大小不固定，如果存储在栈中，将会影响程序运行的性能。

函数 => 我们定一个函数的时候，会在堆内存中开辟空间，会以字符串的形式存储到堆内存中去。

function fn(){var i = 1; console.log(i);}
如果我们直接打印 fn => 出现一段字符串  
d
fn() // 1

2. 垃圾回收
   我们平时创建所有的数据类型都需要内存
   所谓的垃圾回收就是找出那些不再继续使用的变量，然后释放出其所占用的内存，垃圾回收会按照固定的时间间隔周期性的执行这一操作。但是程序员无法掌控内存，js 没有暴漏内存的 api，无法强迫进行垃圾回收，无法干预内存管理。

提高代码的可靠性

3. 函数式编程
   含义：函数式编程是一种编程范式，是一种构建计算机程序结构和元素的风格，它把计算看做是对数据函数的评估，避免了状态的变化和数据的可变。
   1）对一个数据每项加 1

```javascript
   我的写法：
   let arr = [1,2,3,4];
   let arr2 = [];
   arr.map((item, index)=>{
   arr2.push(item+1)
   })

   函数式编程：
   let arr = [1,2,3,4];
   let newArr = (arr, fn)=>{
    let res= [];
    for(var i =0; i<arr.length;i++){
        res.push(fn(arr[i]))
    }
    return res
   }

   let add = item => item + 1;
   let multi = item => item * 5;
   let sum = newArr(arr, add);
   let product = newArr(arr, multi);
   console.log(sum, product) // [2, 3, 4, 5] [5, 10, 15, 20]

```

4. 可执行代码
   分为三种： 全局代码、函数代码、eval 代码
   当执行一个函数时，会进行准备工作，更专业的形容是指 => 执行上下文

5. JS 深入之词法作用域和动态作用域
   作用域：程序源代码中定义变量的区域 作用域决定了如何查找变量，也就是确定当前执行代码对变量的访问权限
   JS 采用词法作用域也就是静态作用域

静态作用域/动态作用域
前者 => 函数的作用域在函数定义的时候就决定了 => 函数的作用域基于函数创建的位置
后者 => 函数的作用域是在函数调用的时候才决定

```javascript
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();
```

上面的例子：如果是动态作用域，那么在 foo 函数里找 value，如果找不到则去调用 foo 函数的 bar 函数里去找 value，结果为 2
但是 js 是静态作用域，那么 => foo 函数内部查找是否有局部变量 foo，没有则就根据书写的位置，查找上一层的代码，也就是 value=1

6. 执行上下文
   js 引擎创建了执行上下文栈(ECS)来管理执行上下文

执行上下文 => 变量对象、作用域链、this

下面我们模拟执行上下文行为：
ECStack = [];
JS 开始要解释执行代码时，最先遇到的是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 GlobalContext 代表。只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前，ECStack 最底部永远有个 globalContext：
ECStack = [
globalContext
];

```javascript

function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();


// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();
```

```javascript
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
checkscope();
```

ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();

7. 变量对象
   变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明

8. 数据类型的判断

1）typeof => 能判断所有值类型，函数。不可对 null，对象，数组进行精准判断，都返回 object

```javascript
typeof undefined // undefined
typeof 2 // number
typeof true // boolean
typeof "2" // string
typeof Symbol("foo") // symbol
typeof 2172141653n // bigint
typeof function() // funtion

typeof null // object
typeof {} // object
typeof [] // object
```

2）instanceof => 能判断对象类型 不能判断基本数据类型，其内部运行机制是判断在其原型链中是否可以找到该类型的原型

```javascript
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true
```

也就是顺着原型链去找，如果能找到对应的 xxxx.prototype 则为 true

3）Object.prototype.toString.call() => 所有原始数据类型都可以判断

如何判断变量是否为数组？

```javascript
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```

9. 为什么区分原始类型和对象类型
   1）不可变性
   以字符串为例，没有任何方法可以直接改变字符串
   由于栈中的内存空间的大小是固定的，那么注定了存储在栈中的变量就是不可变的。
   2）复制
   var name = 'ConardLi';
   var name2 = name;
   name2 = 'code 秘密花园';
   console.log(name); // ConardLi;
   虽然两者值是相同的，但是两者指向的内存空间完全不同，这两个变量参与任何操作都互不影响。
   var obj = {name:'ConardLi'};
   var obj2 = obj;
   obj2.name = 'code 秘密花园';
   console.log(obj.name); // code 秘密花园
   当我们复制引用类型的变量时，实际上复制的是栈中存储的地址，所以复制出来的 obj2 实际上和 obj 指向的堆中同一个对象。因此，我们改变其中任何一个变量的值，另一个变量都会受到影响，这就是为什么会有深拷贝和浅拷贝的原因。
   3）比较
   对于引用类型，比较时会比较它们的<h3>引用地址</h3>，虽然两个变量在堆中存储的对象具有的属性值都是相等的，但是它们被存储在了不同的存储空间，因此比较值为 false。
