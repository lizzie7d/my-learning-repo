每一个 Vuex 应用的核心 => store 仓库
store 基本上就是一个容器，它包含着你的应用中大部分的状态 State。 Vuex 和单纯的全局对象有以下的几点不同：

1. Vuex 的状态存储的响应式的。当 Vue 组件从 store 中读取状态时，若 store 中的状态发生变化，那么相应的组件也会发生 高效 更新。
2. 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式的提交 mutation。

生命周期
onLoad => 会在界面打开时触发
mounted => 组件挂载到界面的时候触发
