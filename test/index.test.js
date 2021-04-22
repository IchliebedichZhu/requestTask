const req = require('../dist/bundle.js');

test('test run module', () => {
  function TestFun() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
        console.log(true);
      }, 1000)
    })
  }
  
  req(TestFun, true);
  req(TestFun, true);
  
  req(TestFun);
  req(TestFun);
  req(TestFun);

  expect(true);
})


