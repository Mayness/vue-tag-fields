属性  
placeholder 占位符
value 绑定数据  
ready-only 初始化数据只可读，不能删除或修改  
allow-duplicates 是否允许重复  
before-change 可以用于数据添加前的钩子函数，返回添加的value和index，该函数应该返回true或false，表示是否应用添加。当删除元素的时候，value值为undefined。注意，若需要自定义判断相同元素的时候，就不要设置``allow-duplicates``属性
  
事件  
change 数据改变后的回调，返回当前添加值  