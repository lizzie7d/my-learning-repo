工作中常用的 css 知识点整理

1.1 溢出省略号：
单行溢出：
overflow:hidden; 溢出隐藏
text-overflow:ellipsis; 溢出用省略号显示
white-space:nowrap; 文本不进行换行

多行溢出:
overflow:hidden; 溢出隐藏
text-overflow:ellipsis; 溢出用省略号显示
-webkit-line-clamp:3; // 显示的行数

1.2 css 变量
css 变量 => css 自定义属性
通过再 css 中自定义属性 --var 函数与 var()组成，var()用于引用自定义属性。

```css
:root {
  --c-color: orange;
}
.title {
  background-color: var(--c-color);
}
```

1.3 渐变
渐变分为线性渐变、径向渐变。线性渐变使用角度以及百分比去控制渐变。

```css
//渐变(方向)
background: linear-gradient(
  to right,
  rgba(255, 255, 255, 0),
  #3fb6f7,
  rgba(255, 255, 255, 0)
);

//渐变(角度)
background: linear-gradient(
  88deg,
  #4df7bf 0%,
  rgba(77, 247, 191, 0.26) 12%,
  rgba(77, 247, 191, 0) 100%
);
```

1.4 媒体查询
响应式布局
页面的头部必须有 meta 关于 viewport 的声明

```css
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```
