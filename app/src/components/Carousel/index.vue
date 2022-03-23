<template>
	<div class="swiper-container" ref="cur">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
				<img :src="carousel.imgUrl"/>
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>

</template>

<script>
	import Swiper from "swiper";

	export default {
		name: "Carousel",
		props: ['list'],
		watch: {
			list: {
				//不管数据是否有变化，立即监听一次
				//为什么watch监听不到list，因为数据是父亲给的，父亲给的是一个对象，对象里面的数据是有的
				immediate: true,
				handler() {
					this.$nextTick(() => {
						var mySwiper = new Swiper(
								this.$refs.cur,
								{
									loop: true,
									// 如果需要分页器
									pagination: {
										el: '.swiper-pagination',
										clickable: true,
									},
									// 如果需要前进后退按钮
									navigation: {
										nextEl: '.swiper-button-next',
										prevEl: '.swiper-button-prev',
									},
								})
					})
				}
			}
		}
	}
</script>

<style scoped>

</style>