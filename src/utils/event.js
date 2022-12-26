import mitt from 'mitt'
const VueEvent = mitt();
export default VueEvent;
/*
也就是说 emitter中一共包含以下几个属性方法：
on:为给定类型注册事件处理程序；
====》 emitter.on('type',(...args)=>{})  type:监听的事件类型，为*时监听所有的事件    args：用于接收传递的值

all:事件名称到注册处理程序函数的映射，主要用于监听所有的事件时使用，不需要重复的书写on去监听；

off:用于移除事件监听，回调函数中类型为*时表示移除所有监听的事件；

emit：用于发送自定义事件

*/


