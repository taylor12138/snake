import Snake from '../Snake/index'
import Food from '../Food/index'
import Scoreboard from '../Scoreboard/index'

export default class Controller {
  snake: Snake;
  food: Food;
  socreboard: Scoreboard;
  // 蛇移动的方向
  direction: string = 'ArrowRight';
  // 蛇移动的大小
  move: number = 10;
  // 定时器
  timer: NodeJS.Timeout | null = null;
  // 蛇是否存活
  isLive = true;
  // 上下左右
  buttons: HTMLCollection;


  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.socreboard = new Scoreboard();
    this.buttons = document.querySelector('.control')!.getElementsByTagName('button')!;
    // this.up = document.querySelector('.up')!;
    // this.down = document.querySelector('.down')!;
    // this.left = document.querySelector('.left')!;
    // this.right = document.querySelector('.right')!;
    this.init();
  }
  // 游戏开始
  init() {
    // 绑定键盘按下事件
    //这里出现的this指向问题和react的this指向问题类似，绑定事件后this都不是指向当前实例，因为并非通过实例调用的方法
    //所以我在keydownHandle加了一个箭头函数避免问题
    document.addEventListener('keydown', this.keydownHandle);
    // 绑定上下左右点击事件
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', this.clickHandle(this.buttons[i].className));
    }
    // 开始动起来
    this.run();
  }
  // 键盘按下事件
  keydownHandle = (e: KeyboardEvent) => {
    this.checkLegal(e.key);
  }
  // 鼠标点击事件
  clickHandle = (classname: string) => {
    return () => {
      console.log(classname);
      this.checkLegal(classname);
    }
  }
  // 分别对应ArrowUp  （ie：Up）
  // 分别对应ArrowDown  （ie：Down）
  // 分别对应ArrowLeft  （ie：Left）
  // 分别对应ArrowRight  （ie：Right）
  checkLegal = (name: string) => {
    const { direction } = this;
    if ((name.indexOf('Up') !== -1 && direction.indexOf('Down') === -1) ||
      (name.indexOf('Down') !== -1 && direction.indexOf('Up') === -1) ||
      (name.indexOf('Left') !== -1 && direction.indexOf('Right') === -1) ||
      (name.indexOf('Right') !== -1 && direction.indexOf('Left') === -1)) {
      this.direction = name;
      this.run();
    }
  }
  // 蛇移动的方法
  run = () => {
    let x = this.snake.X;
    let y = this.snake.Y;
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        y -= this.move;
        break;
      case 'ArrowDown':
      case 'Down':
        y += this.move;
        break;
      case 'ArrowLeft':
      case 'Left':
        x -= this.move
        break;
      case 'ArrowRight':
      case 'Right':
        x += this.move;
        break;
      default:
        break;
    }
    // 检查是否吃到了food
    this.eat(x, y);

    // 修改蛇的位置（蛇头）
    // 使用trycatch解决抛错（新的知识增加了）
    try {
      this.snake.setLoaction(x, y);
    } catch (e) {
      //蛇撞墙，catch撞墙抛出的错误
      alert(e.message)
      this.isLive = false;
    }
    // 开启定时器让蛇跑起来
    if (this.timer === null) {
      this.timer = setInterval(() => {
        this.isLive && this.run();
      }, 500 - this.socreboard.level * 10);
    }
  }
  // 吃到食物
  eat(x: number, y: number) {
    let [fx, fy] = this.food.Loaction;
    if (fx === x && fy === y) {
      console.log("eaten");
      // 改变食物地点
      this.food.change();
      // 提高分数
      this.socreboard.addScore();
      // 增加身体
      this.snake.addBody();
    }
  }
}