let app = new Vue({

    el: '#app',
    data: {
        editingName:false,
        loginVisible:false,
        signUpVisible:false,
        currentUser:{
            objectId:undefined,
            email:'',
        },

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

        hasLogin(){
          return !!this.currentUser.objectId
        },



        onLogin(e){

            AV.User.logIn(this.login.email, this.login.password).then( (user) =>{

                // this.currentUser = {
                //     id:user.id,
                //     email:user.attributes.email
                // }
                // debugger
                //
                user = user.toJSON();
                // console.log(user);
                // debugger;
                this.currentUser.objectId=user.objectId;
                this.currentUser.email=user.email;
                this.loginVisible = false


            }, (error) =>{
               if(error.code === 211){
                    alert('邮箱不存在')
               }else if(error.code === 210){
                    alert('邮箱密码不匹配')
               }

            });
        },

        onLogout(e){
            AV.User.logOut();
            alert('注销成功！');
            window.location.reload();//刷新页面
        },

        onSignUp(e){

            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email);
            // 设置密码
            user.setPassword(this.signUp.password);
            // 设置邮箱
            user.setEmail(this.signUp.email);
            user.signUp().then( (user) => {
                alert('注册成功');
                user = user.toJSON();
                this.currentUser.objectId=user.objectId;
                this.currentUser.email=user.email;
                this.signUpVisible = false
            },  (error) => {
                // console.dir(error);
                alert(error.rawMessage)
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
            let {objectId} = AV.User.current().toJSON();

            // 第一个参数是 className，第二个参数是 objectId
            let user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save();
        },

    },


});


let  currentUser = AV.User.current();
if(currentUser){
    app.currentUser = currentUser.toJSON()//JSON文档
    console.log(currentUser)
}























