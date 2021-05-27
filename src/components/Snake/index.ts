export default class Snake {
  // 蛇的头部
  head: HTMLElement;
  // 蛇的身体
  bodies: HTMLCollection;
  // 蛇整体
  snakeAll: HTMLElement;

  constructor() {
    // 返回第一个元素对象
    this.head = document.querySelector('#snake > div')!;
    // 通过querySelectorAll获取的是NodeList集合，是死的，获取完10个元素，里面永远只有十个元素，更新元素需要我们重新去获取
    // this.bodies = document.querySelectorAll('#snake > div')!;
    this.snakeAll = document.getElementById('snake')!;
    this.bodies = this.snakeAll.getElementsByTagName('div')!;
  }
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇头坐标
  setLoaction(valueX: number, valueY: number) {
    // 不能撞墙
    if (valueX < 0 || valueX > 390 || valueY < 0 || valueY > 390) throw new Error("您撞墙了。。。");
    this.moveBody();
    this.head.style.left = valueX + "px";
    this.head.style.top = valueY + "px";
    this.crashBody();
  }

  // 添加蛇身
  addBody() {
    let Node = document.createElement('div');
    this.snakeAll.appendChild(Node);
  }
  // 蛇身移动的方法(不需要更改蛇头，本身已实现移动)
  moveBody() {
    const { bodies } = this;
    for (let i = bodies.length - 1; i > 0; i--) {
      (bodies[i] as HTMLElement).style.left = (bodies[i - 1] as HTMLElement).offsetLeft + 'px';
      (bodies[i] as HTMLElement).style.top = (bodies[i - 1] as HTMLElement).offsetTop + 'px';
    }
  }
  // 撞到身体
  crashBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) throw new Error("您撞死自己了。。。")
    }
  }
}