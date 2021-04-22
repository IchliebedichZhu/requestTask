(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bundle = factory());
}(this, (function () { 'use strict';

  let asyncArr = [];
  let requestArr = [];

  let isAsyncRequesting = false; // 是否有同步请求在运行

  // 提交到任务队列
  async function pushRequest(task, callback, isAsync) {
    if (isAsync) {
      asyncArr.push(() => new Promise(async resolve => {
        const result = await task();
        callback(result);
        resolve();
      }));
    } else if (asyncArr.length || isAsyncRequesting) {
      requestArr.push(() => new Promise(async resolve => {
        const result = await task();
        callback(result);
        resolve();
      }));
    } else {
      return await Req(() => new Promise(async resolve => {
        const result = await task();
        callback(result);
        resolve();
      }));
    }
    if (!isAsyncRequesting) {
      startRequest();
    } 
  }

  // 开始执行任务
  function startRequest() {
    return new Promise(async resolve => {
      if (!asyncArr.length && !requestArr.length) {
        return;
      }
      if (asyncArr.length) {
        const task = asyncArr.splice(0, 1);
        isAsyncRequesting = true;
        Req(task[0]).then(msg => {
          resolve(msg);
          if (!asyncArr.length) {
            isAsyncRequesting = false;
          }
          startRequest();
        });
      } else if(requestArr.length) {
        await Promise.all(requestArr.map(val => val()));
        requestArr = [];
        startRequest();
      }
    })
  }

  // 请求方法
  async function Req(task) {
    return await task();
  }

  // 对外接口方法
  async function publicRequest(task, isAsync) {
    return new Promise(resolve => {
      pushRequest(task, msg => {
        resolve(msg);
      }, isAsync);
    })
  }

  return publicRequest;

})));
