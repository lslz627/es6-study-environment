async function f() {
  // await Promise.reject('reject');
  await Promise.resolve('hello world!');
  await Promise.resolve('adden');
}

f().then((success) => {
  console.log(success);
}, (error) => {
  console.log(error);
}).then((success) => {
  console.log(success);
}, (error) => {
  console.log(error);
});

