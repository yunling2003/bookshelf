<template>
  <div>
    <van-row>
      <van-col span="10" offset="2">
        <image style="width: 100%" :src="bookInfo.coverUrl" mode="aspectFill" />
      </van-col>
      <van-col span="10" offset="2">
        <text>{{bookInfo.name}}</text>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookInfo: {}
    }
  },

  methods: {
  },

  onLoad (options) {
    let _bookInfo = {}
    for (let key in options) {
      _bookInfo[key] = decodeURIComponent(options[key])
    }
    this.bookInfo = _bookInfo
  }
}
</script>

<style scoped>

</style>