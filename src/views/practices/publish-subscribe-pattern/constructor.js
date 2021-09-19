function generateUuiD(randomLength: number){
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
 }
class Hero {
  id: String = '2222'
  // id: String = generateUuiD(12)
  name: String
  age: String
  sex: String
  strengths?: String
  points: number = 0
  followers: string[] = []
  private taskList: taskInfo[] = []
  constructor (heroInfo: heroInfo) {
    this.name = heroInfo.name
    this.age = heroInfo.age
    this.sex = heroInfo.sex
    this.strengths = heroInfo.strengths
  }
  publish = (taskInfo: taskInfo) => {
    console.log(HeroTaskCenter)
    this.taskList.push(taskInfo)
  }
  test = () => {
    console.log('test')
  }
}
type heroInfo = {
  name: String,
  age: String,
  sex: String,
  strengths?: String,
  points?: String
}
type taskInfo = {
  scope: String,
  category: String,
  topic: String,
  desc: String,
  reward: String,
  followers: string[]
}
class Task {
  id: String = generateUuiD(12)
  scope: String
  category: String
  topic: String
  desc: String
  reward: String
  followers: string[] = []
  constructor (taskInfo: taskInfo) {
    this.scope = taskInfo.scope
    this.category = taskInfo.category
    this.topic = taskInfo.topic
    this.desc = taskInfo.desc
    this.reward = taskInfo.reward
    this.followers = taskInfo.followers
  }
}
class HeroTaskCenter {
  heroList = []
  // 任务的发布，撤回，订阅，取消订阅
  publish = (scope, category, topic, desc, reward) => {
    // this.heroList.push({scope, category, topic, desc, reward})
  }
  revoke = () => {

  }
  subscribe = (id) => {
    
  }
  unsubscribe = (id) => {
    
  }
  // 对人的关注和取关
  follow = (id) => {
    
  }
  unfollow = (id) => {
    
  }
  addHero = (heroInfo: heroInfo) => {
    const hero = new Hero(heroInfo)
    this.heroList.push(hero)
    console.log(this.heroList)
  }
  constructor () {
    console.log('task center created')
  }
}
export {
  HeroTaskCenter,
}
