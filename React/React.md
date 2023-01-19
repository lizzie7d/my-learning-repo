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

# jsx 的本质：

js 的一种语法扩展，它和模板语言很接近，但是他充分具备 js 的能力。 => 说明浏览器不会像天然支持 js 一样支持 jsx
JSX 会被编译为 React.createElement() => React.createElement()将返回一个叫做 React Element 的 JS 对象
编译的动作是由 babel 来完成 => Babel 是一个工具链，主要用于 ES15+版本的代码转换为向后兼容的 js 语法 ，以便能够运行在当前和旧版本的浏览器或其他环境中。
JSX 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM

```javascript
export function createElement(type, config, children) {}
type => 用于标识节点的类型
config => 以对象形式传入，组件所有的属性都会以键值对的形式存储在config对象中
children => 以对象形式传入，它记录的是组件标签之间嵌套的内容


```

1. 挂载阶段 mount
   constructor()
   componentWillMount();
   render(); => render 在执行过程中并不会去操作真实的 DOM 它的只能是把需要渲染的内容返回出来
   componentDidMount(); => 在渲染结束后被触发 真实的 DOM 已经挂载到了页面上，可以在这个生命周期内执行真实 DOM 相关的操作

2. 更新阶段 update
   组件更新：由父组件触发 多出了 componentWillReceiveProps(nextProps)这个方法
   componentWillReceiveProps();
   组件更新：组件自身变化
   shouldComponentUpdate(); 默认值为 true
   componentWillUpdate();
   render();
   componentDidUpdate(); => 组件更新完毕后被触发

如果父组件导致组件重新渲染，即使 props 没有更改，也会调用此方法 => componentWillReceiveProps();
React 组件会根据 shouldComponentUpdate 的返回值 来决定是否执行该方法之后的生命周期 进而决定是否对组件进行 re-render

3. 组件卸载 unmount
   componentWillUnmount() => 如何触发该方法 => 1. 组件在父组件中被移除了 2.组件中设置了 key 属性，父组件在 render 的过程中，发现 key 值和上次不一样

# 生命周期的变化 React16.4

组件的挂载
废弃了 componentWillMount 新增了 static getDerivedStateFromProps(props, state) => 静态 static 方法 => 需要一个对象格式的返回值 => 实现基于 props 派生 State

组件的更新
componentWillReceiveProps() => getDerivedStateFromProps() => 能做且只做这件事
componentWillUpdate() 废弃
render()之后 => getSnapshotBeforeUpdate() => componentDidUpdate()

getSnapshotBeforeUpdate()的返回值会作为第三个参数给到 componentDidUpdate() => 它的执行时机实在 render 方法之后，真实 DOM 更新之前

# Fiber 是 React16 对 React 核心算法的一次重写

Fiber 会使原本同步的渲染过程变成异步
React16 之前每一次组件的更新 React 都会组建一个新的虚拟 DOM 数 与上一次的虚拟 DOM 数进行 diff，实现对 DOM 的定向更新 这个过程是一个递归的过程。
React16 引入的 Fiber 架构 => 会将一个大的更新任务拆解为许多个小任务

Fiber 架构的重要特征就是可以被打断的异步渲染模式 => 根据是否被打断这一标准，React16 的生命周期被划分为 render 和 commit 两个阶段
render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行。
因为 commit 的阶段已经涉及到了真实 DOM 的渲染

在 Fiber 机制下，render 阶段是允许暂停、终止和重启的

# 基于 props 的单向数据流

组件，从概念上类似于 js 的函数，他接受任意的入参即 props，并返回用于描述页面展示的内容的 React 元素

单向数据流 => 当前组件的 state 以 props 的形式流动时，只能流向组件树中比自己层级更低的组件

父-子组件通信 => React 的数据流是单向的，父组件可以直接将 this.props 传入子组件

子-父组件通信 => 父组件传递给子组件的是一个绑定了自身上下文的函数，那么子组件在调用该函数时，就可以将想要交给父组件的数据以函数入参的形式给出去

# 大量 props 不利于大项目的数据交互 发布-订阅模型

1. 事件和监听函数的对应关系

```javascript
constructor(){
   //eventMap 用来存储事件和监听函数之间的关系
   this.eventMap = {}
}
```

2. 如何实现订阅

```javascript
// type这里就代表事件的名称
on(type, handler){
   // handler必须是一个函数
   if(!(handler instanceof Function)){
      throw new Error("Invalid handler");
}
// 判断type事件对应的队列是否存在
if(!this.eventMap[type]){
   //不存在新建队列
   this.eventMap[type] = []
}
this.eventMap[type].push(handler);
```

3. 实现发布 => 触发时可以携带数据

```javascript

   emit(type, params){
   if(this.eventMap[type]){
   this.eventMap(type).forEach((handler,index)=>{
   handler(params)
   })
   }
   }
```

# Context API => 是 React 官方提供的一种组件树全局通信的方式

1. const AppContext = React.createContext(defaultValue);

2. const {Provider, Consumer} = AppContext;

# Redux => Redux 是 js 状态容器，他提供可预测的状态管理 => 严格单向

store => 是一个单一的数据源，而且是只读
action => 是对变化的描述
reducer => 负责对变化进行分发和处理

```javascript
//引入redux
import {createStore} from 'react';
//创建store
const store = createStore(reducer(必传));

(reducer) => 作用是将新的state返回给store;
const reducer = (state, action) => {
  return new_state;
};

(action) => (作用是通知reducer让改变发生) => 对象;

const action = {type: 'ADD_ITEM', payload: '<li>123</li>'};

action只是一个动作，使用dispatch派发action action会进入到reducer里触发对应的更新  store.dispatch(action)
```
