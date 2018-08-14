<template>
    <!-- <div class="modal"> -->


		<!-- 模态框（Modal） -->
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							{{operateName}}
						</h4>
					</div>
					<div class="modal-body row">
						<form class="form-horizontal" role="form">

							<div class="col-md-8 col-xs-8">

									<div class=" form-group">
										<label for="firstname" class="col-sm-3 control-label">清单名</label>
										<div class="col-sm-9">
											<input type="text" class="form-control" id="vediolistname" placeholder="不超过20个字">
										</div>
									</div>

										<div class=" form-group">
											<label for="firstname" class="col-sm-3 control-label">简介</label>
											<div class="col-sm-9">
												<textarea class="form-control" rows="3" id="summary"></textarea>
											</div>
										</div>
							</div>
								<div class="col-md-4 col-xs-4">
										<div class="thumbnail">
													<img :src="vediolist.coverimage" alt="" id="coverimg" class="updateimg">
										</div>

									<div class="form-group">
                    <label for="inputfile">文件输入</label>
                    <input type="file" id="inputfile" @change="imgHandler">
                  </div>
								</div>

						</form>
					</div>
						<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">取消
								</button>
								<button type="button" class="btn btn-info" @click="uploadToServer">确定</button>

						</div>

				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

    <!-- </div> -->
</template>



<script>
import bus from '@/components/bus.js'

export default {
  name: "modal",
  data() {
    return {
      file: "",
      // vediolist: {}，
      uploadIsOk: false,
      isUpload: false,
      _thisVediolist:{}
    };
  },
  props: {
    ModalTitle: {
      type: String,
      default: "警告"
    },
    ModalMsg: {
      type: String
    },
    operateName: {
      type: String
    },

    vediolist: {
      type: Object,
      default:{}
    }
  },
  mounted(){
    console.log(this.vediolist);
  },
  methods: {
    uploadToServer() {
      this._thisVediolist= this.vediolist;
      var zipFormData = new FormData();
      if (this.file != "") {
        zipFormData.append("file", this.file);

        var url = "http://localhost:8888/upload/singlefile";

        this.$http
          .post(url, zipFormData)
          .then(function(response) {
            var newmap = response.bodyText;
            this._thisVediolist.coverimage = newmap;
          }).then(function(){
            this.updListHander();
          })
          .catch(function(error) {
            alert("上传失败");
            console.log(error);
            window.location.reload();
          });
      }else{
        this.updListHander();
      }
    },
    imgHandler(e) {
      var oFReader = new FileReader();
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      oFReader.readAsDataURL(files[0]);

      this.file = files[0];

      oFReader.onloadend = function(oFRevent) {
        var src = oFRevent.target.result;
        $("#coverimg").attr("src", src);
      };
    },
    updListHander() {
      var _this = this;
      // var userid = sessionStorage.getItem("userid");
      var listname = $("#vediolistname").val();
      var summary = $("#summary").val();
      if (listname != "") {
        this._thisVediolist.listname = listname;
      }
      if (summary != "") {
        this._thisVediolist.summary = summary;
      }
      var url = "http://localhost:8888/vediolist/updatelist";

      this.$http.post(url, this._thisVediolist).then(function(response) {
        var newmap = response.body;
        _this._thisVediolist = newmap;


        // }
      }).then(function(){
         this.$emit("transfer", this._thisVediolist);
      });
    }
  }
};
</script>

<style>
</style>
