<template>
  <div class="workbench h100">
    <!-- <div @click="orgin">origin</div> 
    <div @click="mock">mock</div> -->
    <div class="workbench-main mr16">
    <el-tabs type="border-card" v-model="activeTab" class="h100">
      <el-tab-pane label="任务管理" name="task">
        <div class="task-hall">
           <div class="button-container flex-justify-end mb16">
            <el-button type="primary" size="mini" @click="handlePublishTask">发布任务</el-button>
          </div>
          <ul class="tasks">
            <li class="task mb8" v-for="item in heroTaskCenter.heroList" :key="item.id">
              <div class="info">
                <el-row>
                  <el-col :span="6"><div>姓名：</div></el-col>
                  <el-col :span="6"><div>{{ item.name }}</div></el-col>
                  <el-col :span="6"><div>性别：</div></el-col>
                  <el-col :span="6"><div>{{ item.sex }}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6"><div>年龄：</div></el-col>
                  <el-col :span="6"><div>{{ item.age }}</div></el-col>
                  <el-col :span="6"><div>积分：</div></el-col>
                  <el-col :span="6"><div>{{ item.points }}</div></el-col>
                </el-row>
              </div>
              <!-- 当前登录者卡片展示关注者数量；其它卡片展示关注与取消关注操作 -->
              <div class="followers flex-all-center fw700 fz16" v-if="item.id === currentUserId">
                {{ item.followers.length }}
              </div>
              <div class="operation pointer" v-else>
                <div class="follow flex-all-center h100 fw700 fz16"
                  v-if="!item.followers.includes(currentUserId)"
                  @click="handleFollow(item)">关注</div>
                <div class="unfollow flex-all-center h100 fw700 fz16" v-else
                  @click="handleUnfollow(item)">取消关注</div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="hero">
        <div class="hero-hall">
          <div class="button-container flex-justify-end mb16">
            <el-button type="primary" size="mini" @click="handleAddHero">新增角色</el-button>
          </div>
          <ul class="heros">
            <li class="hero mb8" v-for="item in heroTaskCenter.heroList" :key="item.id">
              <div class="info">
                <el-row>
                  <el-col :span="6"><div>姓名：</div></el-col>
                  <el-col :span="6"><div>{{ item.name }}</div></el-col>
                  <el-col :span="6"><div>性别：</div></el-col>
                  <el-col :span="6"><div>{{ item.sex }}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6"><div>年龄：</div></el-col>
                  <el-col :span="6"><div>{{ item.age }}</div></el-col>
                  <el-col :span="6"><div>积分：</div></el-col>
                  <el-col :span="6"><div>{{ item.points }}</div></el-col>
                </el-row>
              </div>
              <!-- 当前登录者卡片展示关注者数量；其它卡片展示关注与取消关注操作 -->
              <div class="followers flex-all-center fw700 fz16" v-if="item.id === currentUserId">
                {{ item.followers.length }}
              </div>
              <div class="operation pointer" v-else>
                <div class="follow flex-all-center h100 fw700 fz16"
                  v-if="!item.followers.includes(currentUserId)"
                  @click="handleFollow(item)">关注</div>
                <div class="unfollow flex-all-center h100 fw700 fz16" v-else
                  @click="handleUnfollow(item)">取消关注</div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="setting">
        <el-button type="primary" size="mini" @click="currentUserId = 'jqucckltp8w00000'">zhao</el-button>
        <el-button type="primary" size="mini" @click="currentUserId = 'jsumo2y7now00000'">lin</el-button>
        <el-button type="primary" size="mini" @click="currentUserId = '1a4bpaqmplk00000'">fang</el-button>
        <el-button type="primary" size="mini" @click="currentUserId = 'pqd3x3gmsds0000'">ning</el-button>
      </el-tab-pane>
    </el-tabs>
    </div>
    <div class="workbench-rightside">
      
    </div>
    <el-dialog title="角色信息" v-model="addHeroDialogVisible">
      <el-form :model="addHeroForm" :rules="addHeroRules" ref="addHeroFormRef">
        <el-form-item label="姓名" :label-width="'120px'" prop="name">
          <el-input v-model="addHeroForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="'120px'" prop="age">
          <el-input v-model="addHeroForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="'120px'" prop="sex">
          <el-select v-model="addHeroForm.sex" placeholder="请选择">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addHeroDialogVisible = false">取 消</el-button>
          <el-button type="primary" :loading="confirmAddHeroLoading"
            @click="confirmAddHero">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, computed } from "vue"
import { useStore } from 'vuex'
import {HeroTaskCenter} from './constructors'
const store = useStore()
const heroTaskCenter = new HeroTaskCenter()

const currentUserId = ref('x2k70ym7qn400000')
// 控制 tabs
const activeTab = ref('task')
onMounted(() => {
  heroTaskCenter.heroList = reactive(store.state['modules/practices'].heroList)
})
// 新增人物
const handleAddHero = () => {
  addHeroDialogVisible.value = true
}
const addHeroDialogVisible = ref(false)
const addHeroFormRef = ref(null)
const addHeroForm = reactive({
  name: '',
  age: '',
  sex: 'male'
})
const addHeroRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    {
      min: 2,
      max: 5,
      message: '长度在 2 到 5 个字符',
      trigger: 'blur',
    },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    {
      min: 1,
      max: 3,
      message: '长度在 1 到 3 个字符',
      trigger: 'blur',
    },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
}
const confirmAddHeroLoading = ref(false)
const confirmAddHero = () => {
  addHeroFormRef.value.validate().then(() => {
    heroTaskCenter.addHero(toRaw(addHeroForm))
    console.log(heroTaskCenter.heroList)
    store.commit('modules/practices/setHeroList', heroTaskCenter.heroList)
    addHeroDialogVisible.value = false
  })
}

// 关注/取消关注人物
const handleFollow = (hero) => {
  hero.followers.push(currentUserId.value)
}
const handleUnfollow = (hero) => {
  const targetIndex = hero.followers.findIndex(id => id === currentUserId.value)
  hero.followers.splice(targetIndex, 1)
}

// 发布任务
const handlePublishTask = () => {
  const currentHero = heroTaskCenter.heroList.find(hero => hero.id === '2222')
  console.log(currentHero)
}
</script>

<style lang="less" scoped>
.workbench{
  display: flex;
  .workbench-main{
    padding: 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    flex: 0 0 60%;
    .task-hall{
      .tasks{
        overflow: auto;
        li{
          border-radius: 3px;
          display: flex;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
          user-select: none;
          .info{
            flex: 1;
            padding: 5px 15px;
          }
          .followers, .operation{
            flex: 0 0 80px;
            background-color: yellowgreen;
            color: #fff; 
          }
          .operation:hover{
            color: @color_theme_blue;
          }
        }
      }
    }
    .hero-hall{
      .heros{
        overflow: auto;
        li{
          border-radius: 3px;
          display: flex;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
          user-select: none;
          .info{
            flex: 1;
            padding: 5px 15px;
          }
          .followers, .operation{
            flex: 0 0 80px;
            background-color: yellowgreen;
            color: #fff; 
          }
          .operation:hover{
            color: @color_theme_blue;
          }
        }
      }
    }
  }
  .workbench-rightside{
    background: #fff;
    flex: 0 0 40%
  }

}
</style>