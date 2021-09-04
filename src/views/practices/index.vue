<template>
  <div class="container">
    <div @click="orgin">origin</div> 
    <div @click="mock">mock</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
import MyPromise from './myPromise'
const orgin = () => {
  let resolveSave
  const myPromise = new Promise((resolve, reject) => {
    throw 'throw new error'
    // reject('reject err')
    // resolve('new resolve')
  })
  console.log('new promise', myPromise)
  const firstThenPromise = myPromise.then(
  //   res => {
  //   console.log('first then', res)
  //   // throw 'test catch'
  //   // return 'first then returnedValue'
  //   return new Promise((resolve, reject) => {
  //     // setTimeout(() => {resolve('1000 ms 后 resolve')}, 1000)
  //     setTimeout(() => {reject('1000 ms 后 reject')}, 1000)
  //   })
  // }, err => {
  //   console.log('inner then', err)
  //   return new Promise((resolve, reject) => {
  //     // setTimeout(() => {resolve('1000 ms 后 resolve')}, 1000)
  //     setTimeout(() => {reject('1000 ms 后 reject')}, 1000)
  //   })
  // }
  ).catch(err => {console.log('outer then', err); return 'catch res'})
  firstThenPromise.then(res => console.log('res', res), err => console.log(err))
  myPromise.catch(err => console.log(err))
}
const mock = () => {
  let resolveSave
  const myPromise = new MyPromise((resolve, reject) => {
    // throw 'throw new error'
    reject('reject err')
    // resolve('new resolve')
    // setTimeout(() => {
    //   resolve('new resolve')
    // }, 1000)
  })
  console.log('new promise', myPromise)
  const firstThenPromise = myPromise.then(
  //   res => {
  //   console.log('first then', res)
  //   // throw 'test catch'
  //   // return 'first then returnedValue'
  //   return new MyPromise((resolve, reject) => {
  //     // setTimeout(() => {resolve('1000 ms 后 resolve')}, 1000)
  //     setTimeout(() => {reject('1000 ms 后 reject')}, 1000)
  //   })
  // }
  // , err => {
  //   console.log('inner then', err)
  //   return new MyPromise((resolve, reject) => {
  //     // setTimeout(() => {resolve('1000 ms 后 resolve')}, 1000)
  //     setTimeout(() => {reject('1000 ms 后 reject')}, 1000)
  //   })
  // }
  ).catch(err => {console.log('outer then', err); return 'catch res'})
  console.log(firstThenPromise)
  firstThenPromise.then(res => console.log('res', res), err => console.log(err)) // 需调整，接 catch 后存在问题
  // myPromise.catch(err => console.log(err))
  // 如第一环then的回调函数中返回的promise reject，而不使用第二环then，会在控制台中抛出 uncaught in promise 错误
  // const secondThenPromise = firstThenPromise.then(
  //   res => { console.log('second then success', res)}, 
  //   err => { console.log('second then fail', err) }
  // )
  // console.log('secondThenPromise', secondThenPromise)
}
// 关于异步任务，then函数并非异步，then函数传入的参数（回调函数）才是异步的，可以断点调试看看
</script>

<style lang="less" scoped>
</style>
