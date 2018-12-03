console.log('lalala');

let a = 123;
var b = "abc"

module.exports = a; // 通过module.exports暴露东西,我想导出啥就让module.exports赋成啥

console.log(module.exports); // 我打印这个module.exports出来的是一个空对象

module.exports = b; // 这样我暴露出去的就是"abc"了


// 如果我想两个都暴露出去,可以在这个对象上面加属性,我想使用a就在那边.a, 使用b就.b
module.exports.a = a;
module.exports.b = b;

// 上面这两行可以简写,下面两行和上面两行效果是一样的
exports.a = a;
exports.b = b;


// 那module.exports和exports有什么区别
// 我这样混着来也是一样的
module.exports.a = a;
exports.b = b;

// 如果我这样导出
module.exports = a;
exports = b;
// 我导出的是a

// 我打印module.exports结果是个空对象
// 打印exports结果是一个空对象
// 打印module.exports == exports 发现得true 说明他们这两个对象的地址相等,是同一个对象,所以可以混着来用给这个对象加属性.调用的时候不管调用哪一个都是那个对象

// 但是我这么来操作的话,我让他的指向变了,他们俩本来都指向同一个对象,我现让他们两个指向不一样的东西
module.exports = a;
exports = b;
// 发现我导出的是module.exports

// 所以总结,导出的永远是module.exports

// 所以我永远都用module.exports
// 因为如果我用exports,万一同事把module.exports改了我就导不出去了