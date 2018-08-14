<template>
  <div id="app"  v-cloak>
    <div id="bg"></div><!--遮罩-->
        <attention v-bind:ModalTitle="ModalTitle" :ModalMsg="ModalMsg" :listid="listid" :isdel="isdel" :delOrRemove="delOrRemove"></attention>

        <v-header  ref="head" @userlogon="showLogon"  @logout="logout" @empty="empty"></v-header>
        <modal  v-bind:ModalTitle="ModalTitle" v-bind:ModalMsg="ModalMsg"></modal>

        <logon v-show="isLogon" class="logon" @getUser="changeLogStatu" id="logon"></logon>

        <!-- <home @userlogon="showLogon" v-bind:isSuccess="isSuccess"></home> -->
        <router-view v-if="isRouterAlive"></router-view>
        <v-footer></v-footer>

  </div>
</template>

<script>
import header from "@/components/common/head";
import logon from "@/components/logon";
import modal from "@/components/common/modal";
import home from "@/components/HomePage";
import footer from "@/components/common/footer";
import attention from "@/components/common/attention";
import bus from "@/components/bus.js";
export default {
  name: "App",
  components: {
    "v-header": header,
    logon: logon,
    modal: modal,
    home: home,
    "v-footer": footer,
    attention: attention
  },

  created() {
    bus.$on("empty", ModalMsg => {
      //监听传值--机构名称
      this.ModalMsg = ModalMsg;
    });
    bus.$on("transfer", listid => {
      //监听传值--机构名称
      this.listid = listid;
    });
    bus.$on("idel", data => {
      //监听传值--机构名称
      this.isdel = data;
    });
    bus.$on("isDelorRemove", delOrRemove => {
      //监听传值--机构名称
      this.delOrRemove = delOrRemove;
    });
  },
  mounted: function() {
    var accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMzU4ODAzMDgxNiIsImlhdCI6MTUzMzg4MTI1Niwic3ViIjoidmVkaW9zaGFyZUAxNjMuY29tIiwiaXNzIjoid3d3LnZzdy5jb20iLCJleHAiOjMwNjc3NjI1MTN9.zOORYEmXmDjEoi9UdSBPvR19ZX9AxALcrO8Y6a4ncl8";
    var _this = this;
    var url = "http://localhost:8888/automiclogin?accessToken=" + accessToken;

    var vediouser = {};

    // zipFormData.append("mobile", this.mobile);
    // zipFormData.append("password", this.password);

    this.$http.post(url, vediouser).then(function(response) {
      var user = response.body;
      console.log(user);
      if (user.userid!=null) {

        this.$router.push({
          path: "/home",
          name: "home"
        });
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("user", JSON.stringify(user));
        this.$refs.head.getParams();
      }
    });
  },
  data() {
    return {
      isLogon: false,
      logStatus: false,
      user: {},
      isSuccess: false,
      ModalTitle: "警告",
      ModalMsg: "",
      isRouterAlive: true,
      listid: 0,
      isdel: false,
      delOrRemove: false,
      listvedioid: 0
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    empty(ModalMsg) {
      this.ModalMsg = ModalMsg;
    },
    showLogon: function(isLogon) {
      this.isLogon = isLogon;
      $("#bg").show();
    },
    changeLogStatu: function(user) {
      if (user == "cancel") {
        $("#bg").hide();
        $("#logon").hide();

        return false;
      } else if (user != "" && user != null) {
        this.user = user;
        this.isSuccess = true;
        this.isLogon = false;

        // console.log(this.isSuccess);
        $("#bg").hide();
        $("#logon").hide();
        (this.ModalTitle = "登录成功"), (this.ModalMsg = "3秒后自动关闭");
        setTimeout(function() {
          $("#myModal").modal("hide");
        }, 3000);

        this.$router.push({
          path: "/home",
          name: "home"
        });
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("user", JSON.stringify(user));
        this.$refs.head.getParams();
        this.reload();

        return true;
      } else {
        (this.ModalTitle = "登录失败"),
          (this.ModalMsg = "用户名或密码错误，3秒后自动关闭");

        setTimeout(function() {
          $("#myModal").modal("hide");
        }, 3000);
        return false;
      }
    },
    logout() {
      this.isSuccess = false;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
#app {
  font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC",
    "lucida grande", "lucida sans unicode", lucida, helvetica,
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background-color: whitesmoke;
}

#bg {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.5;
  filter: alpha(opacity=90);
}

.logon {
  position: fixed;
  top: 30%;
  /* left: 20%; */
}
</style>
