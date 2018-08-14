<template>
<body>
         <div class="row">
        
          <div class="logon col-md-offset-4 col-xs-offset-4 col-md-4 col-xs-4" >
              
                      <form @submit.prevent role="form">
                          <div class="row">
                              <div class="form-group col-md-offset-3 col-xs-offset-3 col-md-6 col-xs-6">
                                  <label for="name">登录名</label>
                                  <input type="text" class="form-control" id="name" placeholder="用户名" v-model="mobile">
                              </div>
                          </div>
                          <div class="row">
                              <div class="form-group col-md-offset-3 col-xs-offset-3 col-md-6 col-xs-6">
                                  <label for="name">密码</label>
                                  <input type="password" class="form-control" id="password" placeholder="密码" v-model="password">
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-offset-3 col-xs-offset-3 col-md-3 col-xs-3">
                                <button type="submit" class="btn btn-primary" v-on:click="logon" data-target="#myModal" data-toggle="modal">登录</button>
                              </div>
                              <div class="col-md-3 col-xs-3">
                                <button type="submit" class="btn btn-danger" v-on:click="cancel">取消</button>
                              </div>
                          </div>
                      </form>
                
            </div>
      </div>
</body>
  
</template>

<script>
import modal from "@/components/common/modal";
export default {
  data() {
    return {
      mobile: "",
      password: ""
      // showModal:false,
    };
  },
  components: {
    modal: modal
  },
  methods: {
    logon() {
      // alert(this.mobile);
      var _this = this;
      var url = "http://localhost:8888/login";

      var zipFormData = new FormData();
      zipFormData.append("mobile", this.mobile);
      zipFormData.append("password", this.password);

      this.$http.post(url, zipFormData).then(function(response) {
        var user = response.body;
        // console.log(response.body);
        _this.$emit("getUser", user);
      });
    },
    cancel(){
       this.$emit("getUser", "cancel");
    }
  }
};
</script>

<style>
.logon {
  /* background-color: black; */
  padding: 5% 0;
  /* opacity: 0.9; */
  z-index: 1045;
  background: url("../assets/imgs/logBg.png");
  background-size: cover;
}
</style>
