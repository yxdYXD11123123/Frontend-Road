export default (context, inject) => {
  inject('hello', (msg) => {
    console.log(msg);
  })
}