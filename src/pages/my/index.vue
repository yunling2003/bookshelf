<template>
  <div>                      
    <div class="my-user">
      <image class="my-user__avatar" :src="user.avatarUrl"></image>
    </div>
    <div class="my-user__name">
      <span>{{user.nickName}}</span>
    </div>
    <div class="my-user__authorize">
      <span>
        <button open-type="getUserInfo" >获取授权</button>
      </span>
    </div>
    <div class="my-tabs__container">
      <van-cell-group>
        <van-cell title="积分" :value="user.credit" icon="points" />
        <van-cell title="已购" is-link />
      </van-cell-group>
    </div>
  </div>  
</template>

<script>
import { getMyUserInfo } from '@/services/index'
export default {
  data () {
    return {
      user: {}
    }
  },

  created () {
  },

  async onShow () {
    this.user = await getMyUserInfo()
    this.app.user = this.user
  }
}
</script>

<style scoped>
.my-user {
  text-align: center;
}
.my-user__name {
  text-align: center;
  margin-top: 10px;
}
.my-user__avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
}
.my-user__authorize {
  text-align: center;
}
.my-tabs__container {
  margin-top: 60rpx;
}
</style>
