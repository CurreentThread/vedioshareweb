<template>

    <div class="navigator">
            <updList  :operateName="operateName"></updList>

          <div class="col-md-offset-1 col-xs-offset-1 col-md-2 col-xs-2">
            <ul class="subul">
                <li>

                    <a href="#">
                        <img src="@/assets/imgs/shoucang.png" alt="" width="20%">
                        <!-- <span class="title">我的订阅</span>  -->
                        <router-link to="/subs/subscribe" >我的订阅</router-link>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="@/assets/imgs/history.png" alt="" width="20%">
                        <!-- <span class="title">观看历史</span> -->
                        <router-link to="/subs/history">观看历史</router-link>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:void(0);">
                         <img src="@/assets/imgs/list.png" alt="" width="20%">
                         <span class="title" @click="showlist" >我的清单</span>
                           <!-- <router-link >我的清单</router-link> -->
                    </a>
                    <span>
                        <img src="@/assets/imgs/add.png"  data-target="#updModal" data-toggle="modal" alt="" width="10%" @click="transfer">
                    </span>
                </li>

                     <span v-if="vediolist.length!=0" v-show="isShowList" id="self_list">


                        <li class="selflist" v-for="each in vediolist" :key="each.listid">
                            <a href="javascript:void(0);" @click="showlistvedio(each.listid,true)" >
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
                    </span>



                <li>
                    <a href="javascript:void(0);">
                        <img src="@/assets/imgs/like.png" alt="" width="20%">
                        <!-- <span class="title" @click="showlike">收藏清单</span> -->
                         <span class="title" @click="showlikelist" >收藏清单</span>

                    </a>
                </li>

                  <span v-if="collectlist.length!=0" v-show="isshowlike" id="collect_list">


                        <li class="likelist" v-for="each in collectlist" :key="each.listid">
                            <a href="javascript:void(0);" @click="showlistvedio(each.listid,false)">
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
                    </span>
            </ul>
        </div>
    </div>
</template>

<script>
import updList from "@/components/updateList";
import bus from "@/components/bus.js";

export default {
  name: "navigator",
  data() {
    return {
      vediolist: [],
      collectlist: [],
      isShowList: false,
      isshowlike: false,
      operateName: "增加清单",
      loginUser: {}
    };
  },
  created() {
    bus.$on("refresh", () => {
      //监听传值--机构名称
      this.queryvediolist();
      $("#updModal").modal("hide"); //手动开启
    });

    bus.$on("refreshC", () => {
      //监听传值--机构名称
      this.querycollectlist();
    });
  },
  mounted: function() {
    this.loginUser = JSON.parse(sessionStorage.getItem("user"));

    this.querycollectlist();
    this.queryvediolist();
  },

  watch: {
    $route(to, from) {
      this.queryvediolist();
    }
  },
  components: {
    updList
  },
  methods: {
    // refresh() {
    //   this.queryvediolist();
    //   $("#updModal").modal("hide"); //手动开启
    // },

    showlikelist() {
      if (this.loginUser == null) {
        $("#bg").show();
        $("#logon").show();
      } else {
        if ($("#collect_list").is(":hidden")) {
          $("#collect_list").slideDown(500);
        } else $("#collect_list").slideUp(500);
      }
    },
    showlist() {
      if (this.loginUser == null) {
        $("#bg").show();
        $("#logon").show();
      } else {
        if ($("#self_list").is(":hidden")) {
          $("#self_list").slideDown(500);
        } else $("#self_list").slideUp(500);
      }
    },
    transfer() {
      this.$emit("addlist", true);
    },
    showlistvedio(listid, isSelf) {
      this.$router.push({
        path: "/subs/collect",
        name: "collect",
        params: {
          listid: listid,
          isupdate: false,
          isSelf: isSelf
        }
      });
    },
    queryvediolist() {
      var userid = sessionStorage.getItem("userid");
      if(userid!=null){
      var url = "http://localhost:8888/vediolist/queryByUserid";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.vediolist = newmap;
      });
      }
    },
    querycollectlist() {
      var userid = sessionStorage.getItem("userid");
      if(userid!=null){
      var url = "http://localhost:8888/vediolist/allcollect";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.collectlist = newmap;
      });
      }
    }
  }
};
</script>

<style>
#collect_list {
  display: none;
}

#self_list {
  display: none;
}
.subul {
  list-style: none;
  font-size: 18px;
}
.subul li {
  padding-top: 20px;
  text-align: left;
}

.subul li a {
  color: black;
  text-decoration: none;
}
.subul li a:hover {
  color: brown;
}

.subul .selftitle {
  font-size: 13px;
  color: black;
}

.subul .vedionumber {
  font-size: 12px;
  color: darkgrey;
}

.pic {
  display: inline-block;
  height: auto;
  overflow: hidden;
  padding: 5px 0;
}
.pic img {
  max-width: 100%;
  max-height: 100%;
   min-width: 100%;
  min-height: 100%;
}

.picright {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
  /* left: 0%; */
}

.animate {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Chrome and Safari */
  -moz-backface-visibility: hidden; /* Firefox */
  -ms-backface-visibility: hidden; /* Internet Explorer */
}
</style>
