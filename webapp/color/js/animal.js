var j = $('#id-test');
console.log(j.animate);
j.animate({
  left: '700px'
}, 500);


function Animal(dom, props, time) {
  var fn = function() {
    console.log(new Date());
    setTimeout(fn, time)
  }, now = new Date().getTime();
  fn();
}
Animal(document.getElementById('id-test'), {
  left: '700px'
}, 5000);
