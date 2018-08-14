<template>
<div class="collect">
    <!-- <attention v-bind:ModalTitle="ModalTitle" :ModalMsg="ModalMsg"  ></attention> -->

    <addList  :operateName="operateName" @transfer="refresh" :vediolist="vediolist"></addList>
    <div class="row">
      <!-- <navigator ref="navigator" @addlist="changeOperateName" ></navigator> -->

        <div class="col-md-8 col-xs-8">
             <div class="row">
                <div class="my_icon_top">
                   <div class="my_img_tit">

                            {{vediolist.listname}}

                    </div>

                    <div class="my_top_del" v-if="isself">
                      <a href="javascript:void(0);" @click="delInventoryConfirmHandler(vediolist.listid)" data-target="#attention" data-toggle="modal" alt="" width="10%">
                        <img src="@/assets/imgs/icon_clear.png">
					            </a>

                      <a href="javascript:void(0);" @click="editInventoryHandler" data-target="#addModal" data-toggle="modal" alt="" width="10%">
                        <img src="@/assets/imgs/icon_edit.png">
                      </a>
                    </div>

                    <div class="my_top_del"  v-else>
                       <div class="row subcriber_state"  @click="subStatelist()" style="margin-left:-180px;margin-top:77px">
                            <div class="sub_state">

                                  <span v-if="isSublist()" class="yiding">
                                      <img src="@/assets/imgs/icon_yiding.png" alt="button_sub">
                                  </span>

                                  <span v-else class="weiding">
                                      <img src="@/assets/imgs/icon_weiding.png" alt="button_sub">
                                  </span>


                              </div>
                              <div class="sub_num" style="background-color:white">{{vediolist.hot}}</div>
                              </div>
                     </div>
                </div>
                <div class="my_icon_center">
                    <img :src="vediolist.coverimage" alt="">
                </div>
                <div class="my_icon_bottom">

                   <div class="my_header_p1">


                        <div class="user_icon">
                            <img class="" src="https://img.neets.cc/user/avatar/4i4Mvdze1NSqJoKvz48G6w/1531965954605.png">
                        </div>
                        <span class="us_name">

                            {{vediolist.username}}

                        </span>

                        <span class="createtime">
                            {{vediolist.createtime}}
                        </span>

                    <!--<span class="us_time"></span>-->
	                </div>

                  <div  class="my_header_p1 my_summary">

                    <span>
                        {{vediolist.summary}}
                    </span>
                  </div>

                </div>
            </div>

            <div class="row">

                <div class="row">
                    <div class="col-md-6 col-xs-6 my_content">
                        <div class="row count">
                            共有{{listvedio.length}}条记录
                        </div>

                        <div v-if="listvedio.length!=0">
                          <div class="row each_subs" v-for="(vedio,index) in eachvedio" :key="vedio.vedioid">
                              <img class="thumbnail col-md-offset-1 col-xs-offset-1 col-md-2 col-xs-2" :src="vedio.vediopicture" alt="" width="15%"  @click="goToDetail(vedio.vedioid)">
                              <div class="each_content col-md-8 col-xs-8">
                                  <div class="row">
                                      <div class="col-md-6 col-xs-6" >
                                           <div class="content_head">
                                              <div class="vedio_name"  @click="goToDetail(vedio.vedioid)">
                                                  {{vedio.vedioname}}
                                              </div>
                                          </div>
                                            <div class="content_body">
                                                    <div class="now_episode">
                                                        <span v-if="vedio.isover ==1">连载</span>
                                                        <span v-else-if="vedio.isover ==2">完结</span>
                                                        <span v-else>未开播</span>
                                                    </div>
                                                    <div class="is_view">
                                                      <span v-if="vedio.isview==0">
                                                        尚未观看
                                                        </span>
                                                        <span v-else>
                                                          上一次观看第{{vedio.isview}}集
                                                        </span>



                                                    </div>
                                                    <div class="upd_time">
                                                      <span  v-if="vedio.categroy==3">
                                                          {{vedio.categroy}}
                                                      </span>
                                                      <span v-else>
                                                          {{vedio.updtime}}更新
                                                      </span>



                                                    </div>



                                            </div>
                                      </div>
                                      <div class="col-md-offset-4 col-xs-offset-4 col-md-2 col-xs-2" >
                                          <div class="_option">
                                              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                                <img src="@/assets/imgs/liebiao.png"  >
                                              </a>
                                              <ul class="dropdown-menu" style="min-width: 20px;" >


                                                  <li v-if="vedio.issub==1"><a href="javascript:void(0);" @click="subState(eachvedio,vedio,index)">取消订阅</a></li>
                                                  <li v-else><a href="javascript:void(0);" @click="subState(eachvedio,vedio,index)">订阅</a></li>

                                                  <li v-if="isself"><a href="javascript:void(0);" @click="putHandler(vedio)" data-target="#attention" data-toggle="modal" alt="" width="10%">移除清单</a></li>

                                              </ul>
                                         </div>
                                      </div>
                                  </div>





                              </div>

                          </div>



                          <div class="row each_subs">
                              <pageination :total="model.total" :size="model.size" :page="model.page" :changge="pageFn" >

                            </pageination>
                          </div>
                        </div>

                           <div v-else>
                              <div class="row each_subs" style="height:200px ">
                                      <div class="col-md-offset-1 col-xs-offset-1 col-md-4 col-xs-4">
                                        <img src="@/assets/imgs/home1.jpg" alt="" width="60%">
                                      </div>
                                      <div class="empty col-md-6 col-xs-6">
                                        空空如也
                                      </div>

                              </div>
                          </div>


                    </div>

                        <div class="col-md-3 col-xs-3 my_recommand">
                            <div class="row each_title">
                                <div class="recommand">新剧推荐</div>
                            </div>

                            <div class="each_recommand">

                                 <div class="row vedio" v-for="(vedio,index) in newVedios.slice(0,3)" :key="vedio.vedioid">
                                    <div class="col-md-5 col-xs-5 img">
                                    <a  class="thumbnail"  @click="goToDetail(vedio.vedioid)" >
                                        <img :src="vedio.picture"
                                            alt="通用的占位符缩略图">
                                    </a>
                                    </div>
                                    <div class="col-xs-7 col-md-7 msg">
                                      <span class="name"  @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</span>
                                      <br>
 <span class="summary" v-if="vedio.nowepisode!=0&& vedio.catagory!='电影'">更新至{{vedio.nowepisode}}集</span>
                                      <span class="summary" v-else>电影</span>
                                        <br>
                                       <div class="row subcriber_state" @click="subState(newVedios,vedio,index)">
                                        <div class="sub_state">

                                              <span v-if="isSub(vedio)" class="yiding">
                                                  <img src="@/assets/imgs/icon_yiding.png" alt="button_sub">
                                              </span>

                                              <span v-else class="weiding">
                                                  <img src="@/assets/imgs/icon_weiding.png" alt="button_sub">
                                              </span>


                                        </div>
                                        <div class="sub_num">{{vedio.subcribecount}}</div>
                                      </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</div>

</template>
<script src="../assets/libs/pageination.js"></script>

<script>
import addList from "@/components/addList";
import navigator from "@/components/common/navigator";
import pageination from "vue_pageination";
import bus from "./bus.js";

export default {
  name: "collect",
  data() {
    return {
      isShow: true,
      add: false,
      isShowlike: true,
      operateName: "",
      isedit: false,
      ModalTitle: "警告",
      ModalMsg: "",
      newVedios: [],
      listvedio: [],
      eachvedio: [],
      model: {
        total: 100, //总条数
        size: 3, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      vediolist: {},
      subsVedios: [],
      isupdate: false,
      listid: 0,
      isself: true,
      collectlists: []
    };
  },
  components: {
    addList,
    navigator,
    pageination
  },
  mounted: function() {
    var listid = this.$route.params.listid;
    this.listid = this.$route.params.listid;
    this.isself = this.$route.params.isSelf;
    this.showlistvedio(listid);
    this.getAllColletlist();
    this.getAllSubs();
    this.getNewVedios();
  },

  watch: {
    $route(to, from) {
      var listid = to.params.listid;
      this.isself = to.params.isSelf;
      this.getAllColletlist();
      this.showlistvedio(listid);
    }
  },
  methods: {
    getAllColletlist() {
      var userid = sessionStorage.getItem("userid");
if(userid!=null){
      var url = "http://localhost:8888/vediolist/allcollect";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);

      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.collectlists = newmap;
        // console.log(this.subsVedios);
      });
}
    },
    subStatelist() {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
      if(userid!=null){
      var url = "http://localhost:8888/vediolist/collectVedio/" + userid;

      this.$http.post(url, this.vediolist).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          this.vediolist.hot = i;
          this.collectlists = newmap[i];
        }

        bus.$emit("refreshC");
        // this.getAllColletlist();
      });
      }
    },
    isSublist() {
      console.log(this.vediolist.listid);
      var flag = false;
      first: for (var j = 0; j < this.collectlists.length; j++) {
        if (this.vediolist.listid == this.collectlists[j].listid) {
          flag = true;
          break first;
        }
      }
      console.log(flag);
      return flag;
    },
    putHandler(vedio) {
      bus.$emit("empty", "确认将其移除清单?");
      bus.$emit("transfer", vedio.listvedioid);
      bus.$emit("idel", true);
      bus.$emit("isDelorRemove", true);
    },

    goToDetail(vedioid) {
      this.$router.push({
        path: "/subs/detail",
        name: "detail",
        params: {
          vedioid: vedioid
        }
      });
    },
    getAllSubs() {
      var userid = sessionStorage.getItem("userid");
      if(userid!=null){
      var url = "http://localhost:8888/subscirbe/getAllSubs";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);

      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.subsVedios = newmap;
      });
      }
    },
    getNewVedios() {
      var _this = this;
      var url = "http://localhost:8888/vedio/searchIsNew";
      this.$http.post(url).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          this.newCount = i;
          this.newVedios = newmap[i];

        }
      });
    },
    refresh(vediolist) {
      this.getAllSubs();
      this.getNewVedios();
      this.showlistvedio(vediolist.listid);
      bus.$emit("refresh");
      $("#addModal").modal("hide"); //手动开启
    },
    showlistvedio(listid) {
      this.getCertainOne(listid);
      var userid = sessionStorage.getItem("userid");
if(userid!=null){
      var url = "http://localhost:8888/vediolist/queryAllVedioBylistid";

      var zipFormData = new FormData();
      zipFormData.append("listid", listid);
      zipFormData.append("userid", userid);

      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;

        this.listvedio = newmap;
        this.model.total = this.listvedio.length;
        this.eachvedio = this.listvedio.slice(0, this.model.size);
      });
}
    },
    getCertainOne(listid) {
      var url = "http://localhost:8888/vediolist/getCertainOne";

      var zipFormData = new FormData();
      zipFormData.append("listid", listid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;

        this.vediolist = newmap;
      });
    },
    isSub(vedio) {
      var flag = false;
      first: for (var j = 0; j < this.subsVedios.length; j++) {
        if (vedio.vedioid == this.subsVedios[j].vedioid) {
          flag = true;
          break first;
        }
      }
      return flag;
    },
    subState(array, vedio, index) {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
      if(userid!=null){
      var url = "http://localhost:8888/subscirbe/subsVedio";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          vedio.subcribecount = i;
          array.splice(index, 1, vedio);
        }
        this.getAllSubs();
        this.showlistvedio(this.listid);
        this.getNewVedios();
      });
      }
    },
    changeOperateName() {
      this.operateName = "增加清单";
      this.isedit = false;
    },
    showlist() {
      if (this.isShow) {
        $(".selflist").hide();
        this.isShow = false;
      } else {
        $(".selflist").show();
        this.isShow = true;
      }
    },
    showlike() {
      if (this.isShowlike) {
        $(".likelist").hide();
        this.isShowlike = false;
      } else {
        $(".likelist").show();
        this.isShowlike = true;
      }
    },
    showedit() {
      var focus = $(".my_btns").css("display");
      if (focus == "block") $(".my_btns").css("display", "none");
      else $(".my_btns").css("display", "block");
    },
    changecss(e, index) {
      if (index == 1) {
        $("#new_view").addClass("active");
        $("#new_update").removeClass("active");
      } else {
        $("#new_update").addClass("active");
        $("#new_view").removeClass("active");
      }
    },
    delInventoryConfirmHandler(listid) {
      bus.$emit("empty", "您确认删除?");
      bus.$emit("transfer", listid);
      bus.$emit("idel", true);
      bus.$emit("isDelorRemove", false);
    },
    editInventoryHandler() {
      this.operateName = "修改清单";
      this.isedit = true;
    },
    pageFn(val) {
      this.model.page = val;
      if (val == Math.ceil(this.model.total / this.model.size)) {
        this.eachvedio = this.listvedio.slice(
          (val - 1) * this.model.size,
          this.listvedio.length
        );
      } else {
        this.eachvedio = this.listvedio.slice(
          (val - 1) * this.model.size,
          val * this.model.size
        );
      }
    }
  }
};
</script>
<style scoped>
.picright {
  margin-top: 7%;
  width: 60%;
  overflow: hidden;
  /* left: 0%; */
  margin-left: -10%;
  float: right;
}

.each_subs .empty {
  font-size: 16px;
  text-align: left;
  margin-top: 30px;
}
.my_icon_top {
  position: relative;
  height: 130px;
  width: 100%;
  overflow: hidden;
  background: url("../assets/imgs/tiaomu.png") center top;
  width: 80%;
}
.my_img_tit {
  color: #fff;
  font-size: 24px;
  margin-top: 80px;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.8);
  text-align: center;
  margin-left: 45%;
  text-align: left;
}

.my_icon_top .my_top_del {
  float: right;
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 5px;
  padding: 5px;
}
.my_icon_top .my_top_del a {
  cursor: pointer;
  margin: 3px;
}

.my_icon_center {
  position: absolute;
  left: 10%;
  top: 6%;
  border: 3px white solid;
}

.my_icon_center img {
  float: left;
  width: 200px;
  height: auto;
  max-height: 150px;
  /* left: 20%; */
}
.my_icon_bottom {
  /* padding-left: -120px; */
  width: 80%;
  min-height: 135px;
  background-color: white;
}

.my_header_p1 {
  padding-top: 15px;
  position: absolute;
  margin-left: 35%;
}
.user_icon {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #dedede;
}
.user_icon img {
  display: block;
  width: 100%;
  height: 100%;
}

._option {
  width: 40px;
  height: 40px;
  /* border-radius: 50px; */
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  /* border: 1px solid #dedede; */
}

._option img {
  display: block;
  width: 70%;
  height: 70%;
  margin: 6px;
}
.my_header_p1 .us_name {
  font-size: 14px;
  color: #333;
  margin-left: 5px;
}
.my_summary {
  width: 40%;
  font-size: 15px;
  text-align: left;
  margin-top: 50px;
}

.my_summary {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my_icon_bottom .createtime {
  color: #888;
  font-size: 12px;
}
.my_content {
  margin-top: 20px;
  left: 2%;
  background-color: white;
}
.count {
  position: absolute;
  left: 5%;
  color: black;
  font-size: 14px;
  font-weight: bolder;
}
.each_subs {
  margin-top: 4%;
  border-top: 1px gray dashed;
}
.each_subs img{
  cursor: pointer;
}

.my_content img {
  float: left;
  margin: 2% 0 0 2%;
}


.my_recommand .each_title {
  border-bottom: 1px gray dashed;
}
.my_content .each_title {
  margin-top: 5px;
}
.my_content .each_title .new_view {
  position: absolute;
  left: 0;
  /* float: left; */
}
.my_content .each_title {
  cursor: pointer;
  /* float: left; */
  color: silver;
}

.my_content .each_title .active {
  color: black;
  cursor: pointer;
}

.my_content .each_title .active:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 7px;
  background: #ffde02;
  bottom: -2px;
  z-index: 9;
  left: 0px;
  border-radius: 1px;
}
.my_content .each_title .new_update {
  position: absolute;
  left: 10%;

  /* float: left; */
}
.my_content .each_title .go_tosub {
  position: absolute;
  /* float: right; */
  right: 5%;
  top: 0%;
  color: steelblue;
  font-size: 12px;
}
.each_content {
  margin-top: 6%;
  text-align: left;
  /* margin-left: 5%; */
}
.each_content .vedio_name {
  color: black;
  font-weight: bolder;
  cursor: pointer;
}

.each_content .content_body {
  color: darkgray;
  margin-top: 10%;
  font-weight: bolder;
  /* margin-left: 5%; */
}

.my_sub_msg {
  /* position: relative; */
  margin-left: 70%;
  margin-top: 5%;
}
.my_sub_msg .my_sub_tip {
  display: inline-block;
  padding: 4px 8px;
  background: #fab9b4;
  vertical-align: middle;
  color: #fff;
  text-align: center;
  font-size: 12px;
  line-height: 13px;
  border-radius: 2px;
  position: relative;
  left: 5px;
}
.my_sub_msg .my_sub_btn {
  position: relative;
  display: inline-block;
  width: 21px;
  height: 21px;
  background: url(../assets/imgs/icon.png);
  background-position: -37px -270px;
  margin-left: 3px;
  vertical-align: middle;
  z-index: 99;
  cursor: pointer;
}
.my_sub_msg .my_btns {
  position: absolute;
  top: 30px;
  display: none;
  left: -72px;
  width: 100px;
  background: #fff;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  border: 1px solid #dedede;
  -webkit-filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  border-radius: 2px;
  padding: 3px 0;
  z-index: 8;
}
.my_sub_msg .my_btns .icon_san {
  position: absolute;
  top: -17px;
  right: 8px;
  width: 0;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #dedede transparent;
}
.my_sub_msg .my_btns .icon_san:before {
  content: "";
  position: absolute;
  top: -7px;
  left: -8px;
  width: 0;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}
.my_sub_msg .my_btns .my_btn_li {
  text-align: center;
  color: #333;
  width: 100%;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
}

.my_recommand {
  margin-top: 20px;
  margin-left: 5%;
  /* width: %; */
  color: black;
  background-color: white;
}

.my_recommand .recommand {
  font-weight: bolder;
  font-size: 16px;
  margin-bottom: 4%;
}

.my_recommand .each_recommand .vedio {
  background-color: white;
  box-shadow: 2px 2px 2px mistyrose;
  margin-left: 2px;
  margin-top: 3px;
}
.my_recommand .each_recommand .msg {
  margin: 5% -6%;
  text-align: left;
}
.my_recommand .each_recommand .msg .name {
  border-bottom: 1px rgb(222, 222, 222) dashed;
  /* margin-left: -20%; */
  color: black;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  /* top: 80%; */
}
.my_recommand .each_recommand .msg .summary {
  font-size: 12px;

  /* top: 80%; */
}
.my_recommand .each_recommand .img {
  margin-left: -5%;
  cursor: pointer;
}

.subcriber_state {
  position: absolute;
  left: 23%;
  font-size: 0;
  cursor: pointer;
  height: 24px;
  overflow: hidden;
}
.subcriber_state .sub_state {
  float: left;
  background: #ff6160;
  height: 100%;
  line-height: 1;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ff6160;
  border-radius: 2px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.subcriber_state .sub_num {
  display: inline-block;
  height: 100%;
  font-size: 12px;
  padding: 5px 4px;
  color: #ff6160;
  line-height: 1;
  border: 1px solid #ff6160;
  border-radius: 2px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.subcriber_state .sub_state img {
  position: relative;
  top: -1px;
}

.my_sub_msg .user_icon_1 {
  margin-left: 60%;
  width: 40px;
  height: 40px;
  /* border-radius: 50px; */
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  /* border: 1px solid #dedede; */
}

.my_sub_msg .user_icon_1 img {
  display: block;
  width: 70%;
  height: 70%;
  margin: 6px;
}
</style>
