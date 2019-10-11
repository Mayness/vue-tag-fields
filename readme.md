属性  
placeholder 占位符
value 绑定数据  
ready-only 初始化数据只可读，不能删除或修改  
allow-duplicates 是否允许重复  
  
事件  
before-change 可以用于数据添加前的钩子，可以返回计算值，返回false则无法添加该数据。如果需要自定义校验重复值，则不要将``allow-duplicates``属性设置为true  
change 数据改变后的回调，返回当前添加值  