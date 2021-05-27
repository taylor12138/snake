// 定义食物类
export default class Food {
  element: HTMLElement;
  constructor() {
    // 加个感叹号表示一定会获取到
    this.element = document.querySelector("#food")!;
    this.change();
  }
  get Loaction() {
    return [this.element.offsetLeft, this.element.offsetTop];
  }
  // 食物的位置最小为0，最大为400px-食物大小
  //食物坐标必须为整10，因为和蛇大小位置匹配
  change() {
    let top = this.createRandom();
    let left = this.createRandom();
    this.element.style.left = top;
    this.element.style.top = left;
  }
  // 随机生成位置
  createRandom() {
    return Math.round(Math.random() * 39) * 10 + "px";
  }
}