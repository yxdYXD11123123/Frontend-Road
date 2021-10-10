export default function (context, inject) {
  inject("hello", msg => console.log(msg));
}