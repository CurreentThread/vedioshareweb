<template>
        <div class="hello" id="head">
              <!-- <attention v-bind:ModalTitle="ModalTitle" :ModalMsg="ModalMsg"  ></attention> -->

            <div class="row">
                <div class="col-md-3 col-xs-3">
                    <img class='logo' src="@/assets/imgs/logo.png" style="">

                </div>
                <div class="col-md-5 col-xs-5">
                    <ol class="breadcrumb">

                        <li class="active"> <router-link to='/home'>首页</router-link></li>
                        <li class="#"><router-link to="/subs/subscribe" >我的订阅</router-link></li>
                        <li class="#"> <router-link :to="{name:'type',params:{catagory:0,region:0}}">分类</router-link></li>
                        <li class="#"><router-link to='/slot'>我的足迹</router-link></li>
                        <li class="#"><a href="">APP</a></li>
                    </ol>
                </div>

                 <div class="col-md-4 col-xs-4">
                     <div class="row">
                         <div class="col-md-7 col-xs-7">
                            <form class="bs-example bs-example-form" role="form">
                                <div class="row">
                                    <div class="col-md-12 col-xs-12">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="剧名" id="vedioName">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default" type="button" @click="exportFuzzyWord">Go</button>
                                            </span>
                                        </div><!-- /input-group -->
                                    </div><!-- /.col-lg-6 -->
                                    <!-- <div class="col-md-2 col-xs-2">
                                        <img src="@/assets/imgs/user.png" class="img-circle logo" alt="Cinque Terre">

                                    </div> -->
                                    <br>

                                </div><!-- /.row -->
                            </form>
                        </div>
                        <div class="col-md-3 col-xs-3">
                            <div v-if=isSuccess class="user_icon">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                              <img src="@/assets/imgs/user.png"  >
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">{{loginUser.username}}</a></li>
                                <li><a href="#">手机号</a></li>
                                <li><a href="#" v-on:click="logout">退出</a></li>

                            </ul>
                            </div>
                            <div v-else>
                               <button id="fat-btn" class="btn btn-primary" data-loading-text="Loading..."
                                    type="button" v-on:click="login"> 登录
                                </button>
                            </div>

                        </div>
                      </div>

                </div>



            </div>


        </div>
</template>

<script>
import attention from "@/components/common/attention";

export default {
  name: "hello",
  components: {
    attention
  },
  data() {
    return {
      loginUser: {},
      isSuccess: false,
      ModalTitle: "警告",
      ModalMsg: ""
      //   isShow: this.isSuccess
    };
  },
  inject: ["reload"],

  // watch: {
  //   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
  //   user: function(){
  //       this.getParams(this.user);
  //   }
  // },
  mounted: function() {
    this.getParams();
  },

  methods: {
    getParams() {
      var userid = sessionStorage.getItem("userid");

      this.loginUser = JSON.parse(sessionStorage.getItem("user"));
      if (userid != null) {
        this.isSuccess = true;
      }
    },
    login() {
      $("#bg").show();
      $("#logon").show();
    },
    logout() {
      //   this.isSuccess = false;
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("user");

      this.$emit("logout", false);
      this.isSuccess = false;
      this.reload();
    },
    exportFuzzyWord() {
      var fuzzyWord = $("#vedioName").val();
      console.log(fuzzyWord);
      if (fuzzyWord == "") {

        this.$emit('empty', "请输入搜索内容");
                bus.$emit('idel',false);

        $("#attention").modal("show"); //手动开启
        return;
      }

      //跳转路由
      //  this.$emit("exportFuzzyWord",fuzzyWord);
      this.$router.push({
        path: "/search",
        name: "search",
        params: {
          fuzzyWord: fuzzyWord
        }
      });
    }
  }
};
</script>

<style scoped>
#head {
  font-size: 16px;
  font-weight: bolder;
  background-color: white;
  border-bottom: 1px solid grey;
  box-shadow: 3px 3px 5px #888888;
}
#head a {
  color: grey;
}
#head a:hover {
  color: black;
}
.logo {
  width: 30%;
  height: 30%;
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
</style>
