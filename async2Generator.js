const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000));

function * testG () {
  const data = yield getData();
  console.log('data: ', data);
  const data2 = yield getData();
  console.log('data2: ', data2);
  return 'success';
}

function async2Generator(generatorFunc) {
  let gen = generatorFunc();
  return new Promise((resolve, reject) => {
    let genResult;
    function step (key, arg) {
      try {
        genResult = gen[key](arg);
      } catch (e) {
        reject(e);
      }
      const { done, value } = genResult;
      if (done) {
        resolve(value);
      } else {
        return Promise.resolve(value).then(val => step('next', val), err => step('throw', err));
      }
    }
    step('next');
  });
}

async2Generator(testG).then(() => { });
