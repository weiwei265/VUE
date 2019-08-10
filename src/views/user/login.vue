<template>
    <div class="page user-login" v-loading="loadingBool">
        <div class="user-form">
            <el-form ref="refForm" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户账号" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import * as api from './api';
export default {
    data () {
        return {
            loadingBool: false,
            form: {
                username: '',
                password: ''
            },
            rules: {
                'username': { required: true },
                'password': { required: true }
            }
        };
    },
    methods: {
        submitForm () {
            // 请求接口
            this.$refs['refForm'].validate((valid, model) => {
                console.log(valid, model);
                if (valid) {
                    this.loadingBool = true;
                    // 这个接口返回格式不正确 {code: 状态码, message: 提示消息, data: 数据 }
                    api.testApi({}).then(res => {
                        console.log(res);
                        this.loadingBool = false;
                        if (res.code === 0) {
                            //
                            this.$message.success('登录成功');
                            // sessionStorage来存储 token，登录凭证
                            // this.$session.set('token', 123123123);
                            // this.$session.set('username', 'liwei');
                        }
                    });
                }
            });
        }
    }
};
</script>
<style lang="less">
.user-login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .user-form {
        width: 500px;
        border: 1px solid #eee;
        padding: 50px;
    }
}
</style>
