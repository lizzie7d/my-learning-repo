JS 内存管理 - JS 内存机制

1. 内存空间：栈内存(stack)、堆内存(heap)
   栈内存- 所有原始数据类型都存储在栈内存中，如果删除一个栈原始数据，遵循先进后出。=> a 先进栈，最后出栈
   堆内存- 引用数据类型会在堆内存中开辟一个内存空间，并会有一个十六进制的内存地址，在栈内存中声明的变量的值就是十六进制的内存地址

原始数据类型 => string, number, boolean, null, undefined
引用数据类型 => object, array, function

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
