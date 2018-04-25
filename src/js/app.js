let app = new Vue({

    el: '#app',
    data: {
        editingName:false,
        loginVisible:false,
        signUpVisible:false,
        resume:{
            name:'姓名',
            gender:'男',
            birthday:'19930121',
            jobTitle:'前端开发',
            phone:'12312312541234',
            email:'23124@12313.com'
        },

        login: {
          email:'',
          password:''
        },
        signUp: {
            email:'',
            password:''
        }
    },

    methods: {
        onEdit(key,value){
            this.resume[key] = value;
        },

        onLogin(e){
            console.log(this.login);
            AV.User.logIn(this.login.email, this.login.password).then(function (user) {
                console.log(user);
            }, function (error) {
               if(error.code === 211){
                    alert('邮箱不存在')
               }else if(error.code === 210){
                    alert('邮箱密码不匹配')
               }

            });
        },

        onSignUp(e){
            console.log(this.signUp);
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email);
            // 设置密码
            user.setPassword(this.signUp.password);
            // 设置邮箱
            user.setEmail(this.signUp.email);
            user.signUp().then(function (user) {
                console.log(user);
            }, function (error) {
            });


        },

        onClickSave(){

            let currentUser = AV.User.current();

            if (!currentUser) {
                this.loginVisible = true;
            }
            else {
                this.saveResume()
            }
        },


        saveResume(){
            let {id} = AV.User.current();

            // 第一个参数是 className，第二个参数是 objectId
            let user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save();
        },

    },


});