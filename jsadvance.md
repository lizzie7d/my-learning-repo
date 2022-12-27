JS 内存管理 - JS 内存机制

1. 内存空间：栈内存(stack)、堆内存(heap)
   栈内存- 所有原始数据类型都存储在栈内存中，如果删除一个栈原始数据，遵循先进后出。=> a 先进栈，最后出栈
   堆内存- 引用数据类型会在堆内存中开辟一个内存空间，并会有一个十六进制的内存地址，在栈内存中声明的变量的值就是十六进制的内存地址

原始数据类型 => string, number, boolean, null, undefined
引用数据类型 => object, array, function

函数 => 我们定一个函数的时候，会在堆内存中开辟空间，会以字符串的形式存储到堆内存中去。

function fn(){var i = 1; console.log(i);}
如果我们直接打印 fn => 出现一段字符串  
fn() // 1

2. 垃圾回收
   我们平时创建所有的数据类型都需要内存
   所谓的垃圾回收就是找出那些不再继续使用的变量，然后释放出其所占用的内存，垃圾回收会按照固定的时间间隔周期性的执行这一操作。但是程序员无法掌控内存，js 没有暴漏内存的 api，无法强迫进行垃圾回收，无法干预内存管理。

提高代码的可靠性

1. 函数式编程
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
