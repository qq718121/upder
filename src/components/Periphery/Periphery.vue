<template>
    <div class="Periphery">

      <p class="title">周边配套简报</p>
      <el-form ref="form" :model="form" label-width="240px">
        <el-form-item label="简报提交人" required>
          <el-input v-model="form.submitMan" style="width:220px"></el-input>
          <span class="warn-msg">请填写您的真实姓名</span>
        </el-form-item> 

        <el-form-item label="楼盘名称" required>
          <el-select
                  v-model="form.buidingId"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="searchLoading">
            <el-option
                    v-for="(item,index) in buidingList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
            </el-option>
          </el-select>
          <span class="warn-msg">请填写楼盘名称</span>
        </el-form-item>
        
        <hr/>

        <el-form-item label="周边配套评分" required>
          <el-input v-model="form.overallScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-200之间的数字 )</span>
        </el-form-item>

        <el-form-item label="推荐点" required>
          <el-input v-model="form.recommendItem " type="string" style="width:220px" placeholder="例：“周边环境优越”"></el-input>
          <span class="warn-msg">请填写楼盘评分项突出部分（2-8字）</span>
        </el-form-item>

        <el-form-item label="交通便利评分" required>
          <el-input v-model="form.vehicleScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="周边环境评分" required>
          <el-input v-model="form.environmentScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="教育配套评分" required>
          <el-input v-model="form.educationScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="医疗配套评分" required>
          <el-input v-model="form.medicalTreatmentScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="商业配套评分" required>
          <el-input v-model="form.commerceScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>

        <el-form-item label="不利因素评分" required>
          <el-input v-model="form.unfavorableFactorsScore" type="number" style="width:220px"></el-input>
          <span class="warn-msg">( 请输入0-100之间的数字 )</span>
        </el-form-item>
        
        <el-form-item label="周边配套总体评价" required>
          <quill-editor ref="myTextEditor"
          v-model="form.overallAppraise"
          :options="editorOption"
          style="width:100%;">
          </quill-editor>
        </el-form-item>

        <!-- wwww -->
        <hr/>

        <el-form-item label="【周边交通】简评" required>
          <el-input v-model="form.vehicleAppraise" type="textarea" placeholder="请输入针对周边交通的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边交通】详细评价" required>
          <el-input v-model="form.vehicleAppraiseDesc" type="textarea" placeholder="请输入针对周边交通的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边交通配图">

            <!--<ImgUploader-->
                    <!--:btnId="btnList[index]"-->
                    <!--:backgroundPicUrl="preImgSrcList[index].preImgSrc"-->
                    <!--@previewImg="previewImg(index)"-->
                    <!--@deleteImg="deleteImg(index)"-->
                    <!--@imgUploader="imgUploader(index)"-->
            <!--/>-->
        </el-form-item>
        <hr/>
        
        <el-form-item label="【周边环境】简评" required>
          <el-input v-model="form.environmentAppraise" type="textarea" placeholder="请输入针对周边环境的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【周边环境】详细评价" required>
          <el-input v-model="form.environmentAppraiseDesc" type="textarea" placeholder="请输入针对周边环境的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="周边环境配图">


        </el-form-item>
        <hr/>

        <el-form-item label="【教育配套】简评" required>
          <el-input v-model="form.educationAppraise" type="textarea" placeholder="请输入针对教育配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【教育配套详细评价" required>
          <el-input v-model="form.educationAppraiseDesc" type="textarea" placeholder="请输入针对教育配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="教育配套配图">


        </el-form-item>
        <hr/>

        <el-form-item label="【医疗配套】简评" required>
          <el-input v-model="form.medicalTreatmentAppraise" type="textarea" placeholder="请输入针对医疗配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【医疗配套】详细评价" required>
          <el-input v-model="form.medicalTreatmentAppraiseDesc" type="textarea" placeholder="请输入针对医疗配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="医疗配套配图">


        </el-form-item>
        <hr/>

        <el-form-item label="【商业配套】简评" required>
          <el-input v-model="form.commerceAppraise" type="textarea" placeholder="请输入针对商业配套的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【商业配套】详细评价" required>
          <el-input v-model="form.commerceAppraiseDesc" type="textarea" placeholder="请输入针对商业配套的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="商业配套配图">

        </el-form-item>
        <hr/>

        <el-form-item label="【不利因素】简评" required>
          <el-input v-model="form.unfavorableFactorsAppraise" type="textarea" placeholder="请输入针对不利因素的简评（10-30字）"></el-input>
        </el-form-item>

        <el-form-item label="【不利因素】详细评价" required>
          <el-input v-model="form.unfavorableFactorsAppraiseDesc" type="textarea" placeholder="请输入针对不利因素的详细评价（10-300字）"></el-input>
        </el-form-item>

        <el-form-item label="不利因素配图">

            <ImgUploader
                    :btnId="btnList[index]"
                    :backgroundPicUrl="preImgSrcList[index].preImgSrc"
                    @previewImg="previewImg(index)"
                    @deleteImg="deleteImg(index)"
                    @imgUploader="imgUploader(index)"
            />

        </el-form-item>
        <hr/>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import uploader from '../../common/uploader.js'
    import ImgUploader from '../Common/ImgUploader/ImgUploader'
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    Vue.use(VueQuillEditor);
export default {
    name:'Periphery',
    components:{
            ImgUploader
    },
    data() {
      return {
          num_buidingId:'',
          buidingList:[],
          searchLoading:false,
        editorOption:{ 
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘周边配套的总评3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption2:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【外立面】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        editorOption3:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘【大堂】简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },

        editorOption4:{
          toolbar: '#toolbar',
          placeholder: '请输入针对本楼盘户型一简要描述3-300字',
          readOnly: false,
          theme: 'snow'
        },
        tableData1:[
          {data:'数值'}
        ],
        constructionList:[
          {key:1,value:'95%-100%'},
          {key:2,value:'90%-95%'},
          {key:3,value:'85%-90%'},
          {key:4,value:'80%-85%'},
          {key:5,value:'75%-80%'},
          {key:6,value:'70%-75%'},
          {key:7,value:'65%-70%'},
          {key:8,value:'60%-65%'},
          {key:9,value:'55%-60%'},
          {key:10,value:'50%-55%'},
        ],
        facadeMaterialList:[
          {key:1,value:'石材为主涂料为辅'},
          {key:2,value:'纯石料'},
          {key:3,value:'涂料为主石料为辅'},
          {key:4,value:'纯涂料'},
        ],
          btnList: ['upbtn0', 'upbtn1', 'upbtn2', 'upbtn3', 'upbtn4', 'upbtn5', 'upbtn6', 'upbtn7', 'upbtn8', 'upbtn9'],
          preImgSrcList: [{preImgSrc: ''}],
          uploaderList: [{uploader: null}],
        form: {

            submitMan: '',
          buildingName: '',
            overallScore:'',
            recommendItem:'',
            vehicleScore:'',
          environmentScore:'',
          educationScore:'',
            medicalTreatmentScore:'',
            commerceScore:'',
            unfavorableFactorsScore:'',
            overallAppraise:'',

            vehicleAppraise:'',
            vehicleAppraiseDesc:'',
          trafficImg:'',
            environmentAppraise:'',
            environmentAppraiseDesc:'',
          environmentImg:'',
            educationAppraise:'',
            educationAppraiseDesc:'',
          educationImg:'',
            medicalTreatmentAppraise:'',
            medicalTreatmentAppraiseDesc:'',
          medicalImg:'',
            commerceAppraise:'',
            commerceAppraiseDesc:'',
          businessImg:'',
            unfavorableFactorsAppraise:'',
            unfavorableFactorsAppraiseDesc:'',
          disadvantageImg:'',
            buidingId:''
        }
      };
    },
    mounted(){

        this.getdata();
        this.initUploader(0);
    },
    methods: {
      addImg(){
        this.form.imageList.push({desc:'',imgUrl:''})
      },
      onSubmit(){
        
      },
      back(){
        this.$router.push('/briefinglist')
      },
        getdata(){
            let _this = this,
                body = {
                    id: this.$route.query.id
                };
            _this.is_loading_tab=true;
            this.$http('/buidingPeripheralSupporting/queryById',{body},{},{},'post').then(function(res){

                if(res.data.code=='0'){
                    _this.form=res.data.response;
                    _this.src = _this.form.commerceAppraiseUrl;
                    _this.src = _this.form.educationAppraiseUrl;
                    _this.src = _this.form.environmentAppraiseUrl;
                    _this.src = _this.form.medicalTreatmentAppraiseUrl;
                    _this.src = _this.form.unfavorableFactorsAppraiseUrl;
                    _this.preImgSrcList[0].preImgSrc = _this.form.vehicleAppraiseUrl;
                    console.log( _this.form);

                    _this.all_house_list(_this.form.buidingId);
                }else if(res.data.code==300){
                    _this.$router.push('/login')
                }else{
                    _this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                _this.is_loading_tab=false;
            }).catch(function(err){
                _this.is_loading_tab=false;
                console.log(err)
            })
        },
        //模糊搜索
        remoteMethod(val){
            let _this = this,
                body = {buildingName: val};
            this.searchLoading = true;
            this.$http( this.$url.url_http + '/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
                _this.searchLoading = false;
                if (res.data.code == 0) {

                    _this.buidingList = res.data.response;

                } else if (res.data.code == 300) {
                    _this.$router.push('/login')
                } else {
                    _this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            }).catch(function (err) {
                _this.searchLoading = false;
                console.log(err)
            })
        },
        all_house_list(id){
            let _this = this,
                body = {buildingName: ''};
            this.searchLoading = true;
            this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
                _this.searchLoading = false;
                let data = res.data.response;
                for (let item in data) {
                    if (data[item].key == id) {
                        _this.form.buidingId = data[item].value;
                        _this.num_buidingId = data[item].key;
                    }
                }
            }).catch(function (err) {
                _this.searchLoading = false;
                console.log(err)
            })
        },
        //初始化上传插件对象
        initUploader(index){

            let _this = this,
                btnName = 'upbtn' + index;
            uploader(function (src) {
                _this.preImgSrcList[index].preImgSrc = src;
            }, function (key) {
                _this.form.houseTypeList[index].houseTypePicUrl = key;
            }, function () {
                _this.preImgSrcList[index].preImgSrc = '';
            }, function (uploader) {
                _this.uploaderList[index].uploader = uploader;
            }, btnName)
        },
        //预览上传图
        previewImg(index){

            this.dialogImgSrc = this.preImgSrcList[index].preImgSrc;
            this.dialogVisible = true;
        },
        //删除图片
        deleteImg(index){

            this.preImgSrcList[index].preImgSrc = '';
            this.form.houseTypeList[index].houseTypePicUrl = ''

        },
        //开始上传
        imgUploader(index){

//            this.initUploader(index);

            if (this.uploaderList[index].uploader == null) {
                return;
            }
            this.uploaderList[index].uploader.start()
        },

    }
  }
</script>

<style scoped>
  .Periphery .title{
    font-size: 24px;
    font-weight: bold;
    color: #0D263F;
    text-align: center;
  }
  .Periphery{
    width: 700px;
    margin: 0 auto;
  }
  .warn-msg{font-size: 12px;color: #777;padding-left: 10px}
  
</style>
<style>
  .el-table td, .el-table th.is-leaf{text-align: center;font-size: 12px;}
  .el-table .el-input__inner{border: none}
</style>