let app = new Vue({

    el: '#app',
    data: {
        editingName:false,
        loginVisible:false,
        signUpVisible:false,
        shareVisible:false,
        skinPickerVisible:false,
        shareLink:'',
        currentUser:{
            objectId:undefined,
            email:'',
        },

        previewUser:{
          objectId:undefined,
        },

        previewResume:{},

        resume:{
            name:'姓名',
            gender:'男',
            birthday:'19930121',
            jobTitle:'前端开发',
            phone:'12312312541234',
            email:'23124@12313.com',
            skills:[
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'},
                {name:'请填写技能名称',description:'请填写技能描述'},
            ],
            projects:[
                {name:'请填写名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'},
                {name:'请填写名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'},
            ],
        },



        // login: {
        //   email:'',
        //   password:''
        // },

        // signUp: {
        //     email:'',
        //     password:''
        // },

        // shareLink: '不知道',
        mode:'edit',//'preview'


    },

        computed:{
            displayResume(){
                return this.mode === 'preview' ? this.previewResume : this.resume
            }
        },

        watch:{
        'currentUser.objectId':function(newValue,oldValue){
             if(newValue){
                 this.getResume(this.currentUser).then((resume)=>this.resume=resume)
                }
            }
        },

    methods: {

        onShare(){
          if(this.hasLogin()){
              this.shareVisible =  true
          }else {
              alert('请先登录')
          }
        },

        onLogin(user){
          this.currentUser.objectId = user.objectId;
          this.currentUser.email = user.email;
          this.loginVisible = false
        },

        onEdit(key,value){
            let regex = /\[(\d+)\]/g;
            key = key.replace(regex,(match,number)=>`.${number}`);
            //key = skills.0.name
            keys = key.split('.');
            let result = this.resume;
            for(let i = 0;i<key.length;i++){
                if(i===keys.length-1){
                    result[keys[i]] = value;
                }else {
                    result = result[keys[i]]
                }
                //以下注释不可删
                //result = this.resume
                //keys = ['skills','0','name']
                //i = 0  result === result['skills'] === this.resume.skills
                //i = 1  result === result['0'] === this.resume.skills.0
                //i = 2  result === result['name'] === this.resume.skills.0.name
                //result === this.resume['skills']['0']['name']
            }
            // result = value;
                //this.resume['skills']['0']['name'] = value
        },

        hasLogin(){
          return !!this.currentUser.objectId
        },



        // onLogin(e){
        //
        //     AV.User.logIn(this.login.email, this.login.password).then( (user) =>{
        //
        //         // this.currentUser = {
        //         //     id:user.id,
        //         //     email:user.attributes.email
        //         // }
        //         // debugger
        //         //
        //         user = user.toJSON();
        //         // console.log(user);
        //         // debugger;
        //         this.currentUser.objectId=user.objectId;
        //         this.currentUser.email=user.email;
        //         this.loginVisible = false
        //
        //
        //     }, (error) =>{
        //        if(error.code === 211){
        //             alert('邮箱不存在')
        //        }else if(error.code === 210){
        //             alert('邮箱密码不匹配')
        //        }
        //
        //     });
        // },

        onLogout(e){
            AV.User.logOut();
            alert('注销成功！');
            window.location.reload();//刷新页面
        },

        // onSignUp(e){
        //
        //     // 新建 AVUser 对象实例
        //     const user = new AV.User();
        //     // 设置用户名
        //     user.setUsername(this.signUp.email);
        //     // 设置密码
        //     user.setPassword(this.signUp.password);
        //     // 设置邮箱
        //     user.setEmail(this.signUp.email);
        //     user.signUp().then( (user) => {
        //         alert('注册成功');
        //         user = user.toJSON();
        //         this.currentUser.objectId=user.objectId;
        //         this.currentUser.email=user.email;
        //         this.signUpVisible = false
        //     },  (error) => {
        //         // console.dir(error);
        //         alert(error.rawMessage)
        //     });
        // },

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
            user.save().then(()=>{
                alert('保存成功')
            },()=>{
                alert('保存失败')
            })
        },

        getResume(user){
            let query = new AV.Query('User');
            return query.get(user.objectId).then( (user) => {
                let resume = user.toJSON().resume;
                // this.resume = resume
                //如果右边有属性，则将其赋给左边；反之，则保留左边原始属性
                // Object.assign(this.resume,resume);写死
                return resume //返回后自行赋值
            },  (error) => {
                // 异常处理
            });
        },

        addSkill(){
            this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },

        removeSkill(index){
            this.resume.skills.splice(index,1)
        },

        addProject(){
            this.resume.projects.push( {name:'请填写名称',link:'http://...',keywords:'请填写关键词',description:'请详细描述'})
        },

        removeProject(index){
            this.resume.projects.splice(index,1)
        },

        print(){
          window.print()
        },

        // setTheme(name){
        //     document.body.className = name
        // }

    }
});


        //获取当前用户
        let  currentUser = AV.User.current();
        if(currentUser){
            app.currentUser = currentUser.toJSON();//JSON文档
            app.shareLink = location.origin + location.pathname +'?user_id='+app.currentUser.objectId;//不能有空格
            app.getResume(app.currentUser).then(resume => {
                app.resume = resume
            })
        }

        //获取预览用户id
        let search = location.search;
        let regex = /user_id=([^&]+)/;
        let matches = search.match(regex);
        let userId;
        if(matches){
            userId = matches[1];
            app.mode = 'preview';
            app.getResume({objectId:userId}).then(resume => {
                app.previewResume = resume
            })
        }

        if(userId){
            app.getResume({objectId:userId})
        }else {

        }
























