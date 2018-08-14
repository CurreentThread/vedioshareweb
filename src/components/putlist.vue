<template>
 	<div class="modal fade" id="putlist" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">


      <div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
						选择清单
						</h4>
					</div>
					<div class="modal-body row content">
					  <div class="col-md-offset-1 col-xs-offset-1 col-md-3 col-xs-3">
                 <div class="my_sub_info">
                    <div class="mu_sub_name">
                        {{vedioname}}
                    </div>
                    <br>
                    <br>
                    <a href="#" class="thumbnail">
                        <img :src="picture" class="vedio_img"
                            alt="通用的占位符缩略图">
                    </a>
                 </div>
              </div>
              <div class="col-md-6 col-xs-6 right_content">


                  <updList :id="fromdetail" :listid="listid" :operateName="operateName" @refreshlist="refreshlist"></updList>

                  <div>
                    <div class="add_icon row">
                      <img src="@/assets/imgs/addlist.png" alt="" class="col-md-offset-1 col-xs-offset-1"  @click="showModal">
                      <span class="add_tip">
                          新建清单
                      </span>
                    </div>

                    <div v-if="vediolist.length!=0">

                        <li class="selflist" v-for="each in vediolist" :key="each.listid">
                            <a href="javascript:void(0);" @click="putHander(each.listid)" >
                                <div class="row">
                                    <div class="pic col-md-offset-1 col-xs-offset-1 col-md-3 col-xs-3">
                                        <img :src="each.coverimage" alt="">
                                    </div>
                                    <div class="picright col-cd-8 col-xs-8">
                                        <span class="selftitle">{{each.listname}}</span>
                                        <br>
                                        <span class="vedionumber">{{each.count}}个条目</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                    </div>

                  </div>

              </div>
					</div>


				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>


</template>

<script>
import updList from "@/components/updateList";

export default {
  name: "putlist",
  components: {
    updList
  },
  data() {
    return {
      vedioid: 0,
      vediolist: [],
      operateName: "添加清单",
      vedioname: "",
      picture: "",
      fromdetail: "fromdetail",
      listid: "from_detail_list"
    };
  },
  mounted: function() {
    this.queryvediolist();
  },
  methods: {
    showModal() {
      $("#" + this.fromdetail).modal("show");
    },
    transfer(vedioid, vedioname, picture) {
      this.listid = vedioname;
      this.vedioid = vedioid;
      this.vedioname = vedioname;
      this.picture = picture;
    },
    refreshlist() {
      this.queryvediolist();
    },

    queryvediolist() {
      var userid = sessionStorage.getItem("userid");
      var url = "http://localhost:8888/vediolist/queryByUserid";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.vediolist = newmap;
      });}
    },
    putHander(listid) {

      var url = "http://localhost:8888/vediolist/putoIntolist";
      var zipFormData = new FormData();
      zipFormData.append("vedioid", this.vedioid);
      zipFormData.append("listid", listid);

      this.$http
        .post(url, zipFormData)
        .then(function(response) {
          var newmap = response.body;
          if (newmap == -1) {
            this.$emit("isexit", "该剧集已存在于清单中");
          } else {
            this.$emit("isexit", "添加成功");
          }
          // console.log(this.subsVedios);
        })
        .then(function() {
          this.queryvediolist();
        });
    }
  }
};
</script>

<style scoped>
.my_sub_info img {
  max-height: 150px;
  border: 3px white solid;
}

.my_sub_info .mu_sub_name {
  text-align: center;
  font-size: 13px;
  color: black;
  width: 100%;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.right_title {
  text-align: center;
  font-size: 15px;
  color: black;
  font-weight: bold;
}
.add_icon {
  margin-left: 0px;
}
.add_icon img {
  cursor: pointer;
  border: 3px #1296db solid;
  min-height: 40px;
  max-height: 50px;
  text-align: left;
  max-width: 60px;
  min-width: 50px;

  float: left;
  padding: 5px;
}

.add_icon .add_tip {
  padding: 10px;
  position: absolute;
  left: 35%;
}

.selflist {
  list-style-type: none;
}

.selflist a {
  text-decoration: none;
  color: black;
}

.pic {
  display: inline-block;
  height: auto;
  overflow: hidden;
  padding: 5px 0;
}
.pic img {
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;
}

.picright {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
  text-align: left;
  /* left: 0%; */
}

.picright .selftitle {
  font-size: 13px;
  color: black;
}

.picright .vedionumber {
  font-size: 11px;
  color: #888888;
}
</style>
