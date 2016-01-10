function test() {
  return function nested() {
    return 1;
  }();
}
