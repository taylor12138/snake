// 定义记分牌
export default class Scoreboard {
  // 分数 & 等级
  score = 0;
  level = 1;
  maxLevel = 10;
  upScore = 10;
  // 分数和等级对应的节点
  scoreNode: HTMLElement;
  levelNode: HTMLElement;
  constructor() {
    this.scoreNode = document.querySelector('#score')!;
    this.levelNode = document.querySelector('#level')!;
  }
  // 加分
  addScore() {
    this.scoreNode.innerText = "SCORE:" + ++this.score;
    if (this.score % this.upScore === 0) this.addLevel();
  }
  addLevel() {
    if (this.level < this.maxLevel)
      this.levelNode.innerText = "Level:" + ++this.level;
  }
}
