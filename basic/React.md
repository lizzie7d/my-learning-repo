1. 不可变性在 react 中的中的重要性
   .slice 方法创建数据的副本，而不是直接修改现有的数组

一般来说有两种改变数据的方式，一种是直接修改变量，另一种是使用新的一份数据代替旧数据。
直接修改：
var plaer = {score:1, name:'liz'};
player.score:2;
console.log(player);==> {score:2, name:'liz'}

新的数据替换旧数据：
var plaer = {score:1, name:'liz'};
var newPlayer = Object.assign({}, player, {score:2});
console.log(newPlayer);==> {score:2, name:'liz'}
使用对象的展开语法，就可以写成： var newPlayer:{...player, score:2}

不可变性的重要性有：
跟踪数据的改变：
如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。
跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。

不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

2. 事件处理
   不可以通过 return false 的方法阻止默认行为，必须显式的使用 preventDefault
   如果没有在方法后面添加 ()，例如 onClick={this.handleClick}，则应该为这个方法绑定 this。

3. 代码分割
   最佳方式是 import()方法

4. setState 同步还是异步
   setState 本身代码的执行肯定是同步，异步是指多个 state 会合成到一起进行批量更新。同步还是异步取决于他被调用的环境

=> 如果 setState 在 React 能否控制的范围被调用，就是异步。比如合成事件处理函数，生命周期函数，此时会进行批量更新，也就是将状态合并后再进行 DOM 更新

=> 如果 setState 在原生 js 控制的范围内，就是同步。比如原生事件处理函数，定时器回调函数，ajax 回调函数中，此时 setstate 被调用后立即更新 DOM

5. 函数编程

```javascript
const arr = ['john', 'harold'];\
const objectArr = [];
arr.map((item)=>objectArr.push({name:item}))
```
