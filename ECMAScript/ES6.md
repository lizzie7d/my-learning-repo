1. Promise
   Promise 是异步编程的一种解决方案。其实是一个构造函数，身上有 all, reject, resolve 这几个方法。原型上有 then, catch.

Promise 对象有以下：
1）对象的状态不受外界影响。Promise 对象代表一个异步操作，与三种状态: pending, fulfilled, rejected。只有异步操作的时候，可以决定当下是哪一种状态，任何其他操作都无法改变。；

2）一旦状态改变，就不会再改变。就像 promise 这个意思一样。Promise 对象的状态改变，只有两种可能： pending => fulfilled, pending => rejected。只要这两种情况发生，状态不会再变了，会一直保持这个结果，这时就称为 => resolved 定型。 如果改变已经发生了，你在对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件不同。事件的特点是，如果错过了，可以再去监听。

example

```javascript
let p = new Promise(function(resolve,reject){
    //做一些异步操作
    setTimeout(function(){
        console.log("执行完成");
        resolve("要返回的数据")；
    }，2000);
});

执行完成
```
