<template>
	<div class="type-nav">
		<div class="container">
			<!--事件委托-->
			<div @mouseleave="leaveIndex" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<!--三级分类-->
				<!--过渡动画-->
				<transition name="sort">
					<div class="sort" v-show="show">
						<!--利用事件委托+编程式导航实现路由的跳转与传递参数-->
						<div class="all-sort-list2" @click="goSearch">
							<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
									 :class="{curl:currentIndex==index}">
								<h3 @mouseenter="changeIndex(index)">
									<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
								</h3>
								<!--二三级分类-->
								<div class="item-list clearfix" :style="{display: currentIndex==index?'block':'none'}">
									<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName"
													 :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
											</dt>
											<dd>
												<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
															c3.categoryName
														}}</a>
												</em>
												<!--<em>
													<a href="">文学</a>
												</em>
												<em>
													<a href="">经管</a>
												</em>
												<em>
													<a href="">畅读VIP</a>
												</em>-->
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>

		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	//最好的引入方式，按需加载
	import throttle from "lodash/throttle";


	export default {
		name: "TypeNav",
		data() {
			return {
				currentIndex: -1,
				show: true
			}
		},
		//组件挂载完毕，可以向服务器发送请求
		mounted() {

			if (this.$route.path != '/home') {
				this.show = false;
			}
		},
		computed: {
			...mapState({
				//右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
				//注入一个参数state，其实即为大仓库中的数据
				categoryList: state => state.home.categoryList
			})
		},
		methods: {
			changeIndex: throttle(function (index) {
				this.currentIndex = index;
			}, 50),

			leaveIndex() {
				if (this.$route.path != '/home') {
					this.show = false;
				}
				this.currentIndex = -1;

			},

			goSearch(event) {
				//存在一些问题，事件委托，把全部的子节点的事件委托给父节点，
				//如何确定点击的一定是a标签？
				//即使能确定点击的是a标签，如何区分一级二级三级分类的标签

				//在子节点中a标签加上自定义属性data-categoryName,其余子节点没有
				let element = event.target;
				//获取到当前触发这个事件的节点，带有自定义属性的一定是a标签
				//节点有一个dataset属性，可以获取节点的自定义属性与属性值
				let {categoryname, category1id, category2id, category3id,} = element.dataset;
				/*let{categoryname}=element.dataset;*/
				if (categoryname) {
					//整理路由跳转的参数
					let location = {name: "search"};
					let query = {categoryName: categoryname};
					/*//一级、二级、三级的a标签
					if(category1id){
						query.category1Id=category1id;
					}else if (category2id){
						query.category2Id=category2id;
					}else {
						query.category3Id=category3id;
					}*/
					if (category1id) {
						query.category1Id = category1id;
						//一定是a标签：二级目录
					} else if (category2id) {
						query.category2Id = category2id;
						//一定是a标签：三级目录
					} else {
						query.category3Id = category3id;
					}
					//判断：如果路由器跳转时，带有params参数，捎带传递过去
					if (this.$route.params) {
						location.params = this.$route.params;
						//整理完参数
						location.query = query;
						//路由跳转
						this.$router.push(location);
					}
				}
			},

			enterShow() {
				this.show = true;
			}
		}
	}
</script>

<style scoped lang="less">
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}


					}

					.curl {
						background-color: skyblue;
					}
				}
			}

			//过渡动画样式
			//过渡动画开始状态（进入）
			.sort-enter {
				height: 0px;
			}

			//过渡动画结束状态（进入）
			.sort-enter-to {
				height: 461px;
			}

			//定义动画时间、速率
			.sort-enter-active {
				transition: all .3s linear;
			}

			//过渡动画开始状态（出去）
			.sort-leave {
				height: 461px;
			}

			//过渡动画结束状态（出去）
			.sort-leave-to {
				height: 0px;
			}

			//定义动画时间、速率
			.sort-leave-active {
				transition: all .1s linear;
			}
		}
	}
</style>