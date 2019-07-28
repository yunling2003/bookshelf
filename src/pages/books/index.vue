<template>
  <div>
    <view class="swiper">
      <swiper        
        class="swiper-books" 
        interval="5000" 
        duration="1000"
        previous-margin="20px"
        next-margin="20px">
        <block v-for="(item, index) in books" :index="index" :key="index">
          <swiper-item class="swiper-books__item" @click="goDetail(item)">
            <view class="swiper-books__item-container">
              <view class="swiper-books__item-image">
                <image style="width: 310px" :src="item.coverUrl" mode="scaleToFill" />
              </view>
              <view class="swiper-books__item-info">
                <text class="swiper-books__item-name">{{item.name}}</text>
                <text class="swiper-books__item-author">{{item.author}}</text>
                <text class="swiper-books__item-publisher">{{item.publisher}}</text>
              </view>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>   
  </div>
</template>

<script>
import { getAllBooks } from '@/services/index'

export default {
  data () {
    return {
      books: [],
      indicatorDots: false
    }
  },

  components: {

  },

  methods: {
    async fetchData () {
      this.books = await getAllBooks()
    },

    goDetail (item, event) {
      let navigateUrl = '/pages/detail/main?'
      let infos = ['id', 'name', 'author', 'publisher', 'coverUrl', 'fileUrl', 'credit']
      infos.forEach(key => {
        navigateUrl += key + '=' + item[key] + '&'
      })
      navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1)
      wx.navigateTo({
        url: navigateUrl
      })
    }
  },

  created () {
    // let app = getApp()
  },

  onShow () {
    this.fetchData()
  }
}
</script>

<style scoped>
.swiper {  
  box-sizing: border-box;	
	display: flex;
	justify-content: center;
	align-items: center;
}
.swiper-books {
  box-sizing: border-box;
  width: 100vw;
  height: 800rpx;
}
.swiper-books__item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;      
}
.swiper-books__item-container {
  border: 1px darkgray solid;
  border-radius: 10px; 
  box-shadow: 2px 2px 2px gray; 
}
.swiper-books__item-image {  
  margin: 5px 5px;
}
.swiper-books__item-info {
  display: flex;
  flex-flow: column;
}
.swiper-books__item-name {
  font-size: 16px;
  padding: 3px 0;
  text-align: center;
}
.swiper-books__item-author {
  font-size: 12px;
  padding: 3px 0;
  text-align: center;
}
.swiper-books__item-publisher {
  font-size: 14px;
  padding: 3px 0;
  text-align: center
}
</style>
