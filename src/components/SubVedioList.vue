<template>

	<div class="modal fade" id="subList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							{{vedioname}}
						</h4>
					</div>
					<div class="modal-body">
						<div class="row diversity_l">
                            <ul>

                                <li v-for="url in urls" :key="url.subvedioid" v-if="url.vediolink!=null">
                                    <a :href="url.vediolink" class="clearfix" target="_blank" @click="addWatch(url)">

                                        <div class="icon_video"></div>

                                        <div class="diveristy_txt">
                                            <p class="p1"> {{url.subvedioname}}第{{url.episodenum}}集</p>
                                            <div class="tags" v-if="url.fromwhere=='美剧天堂'">
                                                <div class="tag">迅雷下载</div>

                                            </div>
                                             <div class="tags" v-else>
                                                 <div class="tag">无广告</div>
                                                <div class="tag">在线播放</div>

                                            </div>
                                        </div>

                                         <div class="fromwhere">
                                            <p class="p1"> {{url.fromwhere}} </p>
                                        </div>
                                    </a>
                                </li>



                                <li>
                                    <a style="padding:8px 12px 9px 12px;" @click="_addURL(subvedioid)" class="clearfix div_add">
                                        +添加链接
                                    </a>
                                </li>
			</ul>
                        </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>

					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
</template>
<script>
export default {
  name: "subList",
  data() {
    return {
      urls: []
    };
  },
  props: {
    episode: {
      type: Number,
      default: 0
    },
    vedioname: {
      type: String,
      default: ""
    },
    vedioid: {
      type: Number,
      default: 0
    }
  },
  watch: {
    episode: function() {
      this.getAllUrl();
    }
  },
  methods: {
    addWatch(subvedio) {
      var userid = sessionStorage.getItem("userid");
if(userid!=null){
      var url = "http://localhost:8888/history/addhistory";
      var zipFormData = new FormData();
      zipFormData.append("vedioid", subvedio.vedioid);
      zipFormData.append("userid", userid);
      zipFormData.append("isview",subvedio.episodenum);
      zipFormData.append("vedioname",subvedio.subvedioname);

      this.$http.post(url,zipFormData).then(function(response) {
            this.$emit('refresh');
      });}
    },
    getAllUrl() {
      var url =
        "http://localhost:8888/subvedio/getAllUrl/" +
        this.episode +
        "/" +
        this.vedioid;

      this.$http.post(url).then(function(response) {
        var newmap = response.body;

        console.log(newmap);
        this.urls = newmap;
      });
      //   this.model.page = 1;
    },
    _addURL(subId) {}
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  text-decoration: none;
}
.diversity_l li {
  list-style: none;
  width: 100%;
}
.diversity_l li a {
  background: #f7faf9;
  display: block;
  padding: 11px 12px 12px 12px;
  border-radius: 2px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #fff;
  color: #3f7cc1;
}

.diversity_l li a:hover {
  background: lemonchiffon;
}

.diversity_l li a .icon_video {
  width: 40px;
  height: 40px;
  background: url("../assets/imgs/player.png");
  background-position: 0 -130px;
  float: left;
}
.diversity_l li a .diveristy_txt {
  float: left;
  margin-left: 12px;
}
.diversity_l li a .diveristy_txt .p1 {
  width: 280px;
  font-size: 15px;
  color: #333;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.fromwhere {
  float: right;
}
.diversity_l li a .tags {
  margin-top: 6px;
  text-align: left;
}
.diversity_l li a .tags .tag {
  padding: 2px 6px 3px 6px;
  font-size: 11px;
  display: inline-block;
  border-radius: 2px;
  line-height: 1;
  border: 1px solid #3f7cc1;
  color: #3f7cc1;
  margin-right: 5px;
}
.diversity_window
  .compilation_pop_con
  .diversity_con
  .diversity_l
  li
  a
  .tags
  .tag {
  padding: 2px 6px 3px 6px;
  font-size: 11px;
  display: inline-block;
  border-radius: 2px;
  line-height: 1;
  border: 1px solid #3f7cc1;
  color: #3f7cc1;
  margin-right: 5px;
}
</style>
