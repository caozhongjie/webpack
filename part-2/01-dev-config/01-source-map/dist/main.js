/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************!*\
  !*** ./app.js ***!
  \****************/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log('hello webpack');
console.log('第二行');

var A = /*#__PURE__*/function () {
  function A() {
    _classCallCheck(this, A);

    this.str = 'hello webpack11111';
  }

  _createClass(A, [{
    key: "sayHello",
    value: function sayHello() {
      console.log(this.str);
    }
  }]);

  return A;
}();

var a = new A();
A.sayHello();
/******/ })()
;
//# sourceMappingURL=main.js.map