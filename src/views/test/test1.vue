<template>
    <div>
        <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="90px" >
            <el-form-item label="商品图片"  prop="goodsImage" :required="true" style="text-align:left;">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8088/users/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" style="width: 100px; height: 100px" class="avatar">
                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <el-icon style="width: 100px; height: 100px" class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>
<script >
    import {ref, reactive, defineComponent, computed} from "vue";
    import { ElMessage } from 'element-plus'
    import {personReq} from "@/api/request";
    import { Plus } from '@element-plus/icons-vue'
    export default {
        data() {
            return {
                imageUrl:'',
                formData:{
                    goodsImage:''
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(file)
                console.log(res)
                this.imageUrl = URL.createObjectURL(file.raw);
                imageUrl.value = res.message
                this.formData.goodsImage = res.message;
            },
            beforeAvatarUpload(file) { // 上传前的方法,限制上传的大小,还有格式
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('图片大小不能超过2MB!')
                    return false
                } else if (file.type !== 'image/jpg' && file.type !== 'image/png') {
                    ElMessage.error('请选择图片类型的文件！')
                    return false
                }
                return true
            }
        }
    }
</script>
