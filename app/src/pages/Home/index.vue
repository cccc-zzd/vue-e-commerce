<template>
	<div>
		<TypeNav></TypeNav>
		<ListContainer/>
		<Recommend></Recommend>
		<Rank/>
		<Like></Like>
		<!--list是属性名，floor是值，组件通信接受的是属性名-->
		<Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
		<Brand></Brand>
	</div>

</template>

<script>
	//引入其他组件
	import ListContainer from '@/pages/Home/ListContainer';
	import Recommend from '@/pages/Home/Recommend';
	import Rank from '@/pages/Home/Rank';
	import Like from '@/pages/Home/Like';
	import Floor from '@/pages/Home/Floor';
	import Brand from '@/pages/Home/Brand';
	import {mapState} from "vuex";

	export default {
		name: "",
		components: {
			ListContainer, Recommend, Rank, Like, Floor, Brand
		},
		mounted() {
			//派发action，获取floor组件的数据
			this.$store.dispatch("getFloorList")

		},
		computed: {
			...mapState({
				floorList: state => state.home.floorList
			})
		}
	}
</script>

<style scoped>

</style>