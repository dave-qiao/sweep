/*
* ES6 异步机制 与dva 循环有关
*有待封装co generator async
*
* */
export const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
