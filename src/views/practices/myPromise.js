// 逻辑实现
// 1. constructor 接收 executor 函数并执行，类体中提供 resolve reject 函数传递给executor 函数(1.1进行 this 绑定，以免传值后发生this指向改变)
// 2. 初始状态 PromiseState = 'pending' PromiseResult = undefined，执行resolve 切换成fulfilled状态，执行reject 或若是executor函数报错切换成rejected状态，同时，状态只可以改变一次
// 3. 实现 then 函数，该接收两个参数（成功和失败的回调, 两个参数均为可选，传入参数不为函数时，onResolved 相当于传入 res => res, onRejected 相当于 err => 一个rejected 的promise
// 3.1 onResolved 和 onRejected 会在其他代码执行后调用（对应疑问1）
// 3.2 一个 promise 可以多次调用 then 方法，其成功和失败的回调按照其注册顺序依次调用
// 3.3 then 方法返回一个新的 promise，从而实现链式调用
// 3.3.1 then 调用时返回一个 promise，这个 promise 的state与 result 与 then 的 onResolved 或 onRejected 函数的返回值有关
// 如果返回非promise，则相当于立刻resolve，state为 fulfilled，result为返回值; 如果返回 promise，promise resolve 则state为 fulfilled，result为resolve参数，reject同理
// 接着调用下一个 then，根据resolve或是reject 调用 onResolved 或 onRejected 函数
// 4. 实现 catch 函数，该函数接收一个参数，一个 promise 可以多次调用
// 4.1 Promise.prototype.catch 方法是 .then(null, rejection) 或是 .then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
// 4.2 

// 疑问（原生 promise 的表现）
// 1. 为什么在 executor 里面立刻执行 resolve onResolved 函数还是在其他代码（promise相关代码）之后执行
// 答：因为不能在 resolve 中同步调用 onResolved， 如果同步调用，那么当 then 晚于 resolve 执行，resolve 中拿不到 onResolved 函数，myPromise 使用 setTimeout 处理

// 几个小知识
// 1. 抛出错误后的代码不会执行，直接进入 catch
// 1. throw new Error('throw new error') 或者 throw 'throw new error'
// 2. PromiseResult 是 resolve 和 reject 函数传递的参数

// 来自 mdn
// 在本轮 事件循环 运行完成之前，回调函数是不会被调用的。
// 即使异步操作已经完成（成功或失败），在这之后通过 then() 添加的回调函数也会被调用。
// 通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序进行执行。
// then 里的参数是可选的，catch(failureCallback) 是 then(null, failureCallback) 的缩略形式。
export default class MyPromise {
  PromiseState = 'pending'
  PromiseResult = null
  onResolvedCallbacks = []
  onRejectedCallbacks = []
  constructor(executor) {
    let resolve = result => {
      if (this.PromiseState !== 'pending') return
      this.PromiseState = 'fulfilled'
      this.PromiseResult = result
      setTimeout(() => {
        this.onResolvedCallbacks.forEach(cb => cb(this.PromiseResult))
      })
    }
    let reject = result => {
      if (this.PromiseState !== 'pending') return
      this.PromiseState = 'rejected'
      this.PromiseResult = result
      setTimeout(() => {
        this.onRejectedCallbacks.forEach(cb => cb(this.PromiseResult))
      })
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then = (onResolved, onRejected) => {
    console.log('then函数执行时的state', this.PromiseState)
    console.log('then函数执行时的参数', onResolved, onRejected)
    const resolvePromise = (returnedValue, resolve, reject) => {
      // 第一个参数为then函数的参数onResolved或onResolved的返回值，
      // 第二个函数为then 返回的promise的 resolve 和 reject
      // console.log(returnedValue)
      if(returnedValue instanceof MyPromise) {
        returnedValue.then(res => resolve(res), err => reject(err))
      } else{
        resolve(returnedValue)
      }
    }
    const thenPromise = new MyPromise((resolve, reject) => {
      // 如果 resolve reject 在 then 之前，也就是状态已经改变，那么立刻调用；否则注册回调，待状态改变后调用
      if (this.PromiseState === 'fulfilled') {
        if (typeof onResolved !== 'function') {
          onResolved = res => res
        }
        const returnedValue = onResolved(this.PromiseResult)
        resolvePromise(returnedValue, resolve, reject)
      } else if (this.PromiseState === 'rejected') {
        if (typeof onRejected !== 'function') {
          onRejected = err => { return new MyPromise((resolve, reject) => reject(err)) }
        }
        const returnedValue = onRejected(this.PromiseResult)
        resolvePromise(returnedValue, resolve, reject)
        
      } else {
        if (typeof onResolved !== 'function') {
          onResolved = res => res
        }
        this.onResolvedCallbacks.push(((onResolved, resolve, reject) => {
          return function (PromiseResult) {
            const returnedValue = onResolved(PromiseResult)
            resolvePromise(returnedValue, resolve, reject)
          }
        })(onResolved, resolve, reject))
        if (typeof onRejected !== 'function') {
          onRejected = err => { return new MyPromise((resolve, reject) => reject(err)) }
        }
        this.onRejectedCallbacks.push(((onRejected, resolve, reject) => {
          return function (PromiseResult) {
            const returnedValue = onRejected(PromiseResult)
            resolvePromise(returnedValue, resolve, reject)
          }
        })(onRejected, resolve, reject))
      }
    })
    return thenPromise
  }
  catch = onRejected => {
    this.then(null, onRejected)
  }
}