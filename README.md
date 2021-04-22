# A common run function task
## how to use

### start
> yarn add public_request_task

>  npm install public_request_task

### example

```
  const req = require('public_request_task');

  function Task() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
        conosle.log(true);
      }, 1000)
    })
  }

  req(Task, true);
  req(Task, true);
  
  req(Task);
  req(Task);
  req(Task);
```

### options

* `task`: function your business function
* `isSync`: boolean control your function is async if true, other task will run after sync function finished





