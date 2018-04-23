var app = new Vue({

    el: '#app',
    data: {
        editingName:false,
        resume:{
            name:'姓名',
            gender:'男',
            birthday:'19930121',
            jobTitle:'前端开发',
            phone:'12312312541234',
            email:'23124@12313.com'
        }
    },

    methods: {
        onEdit(key,value){
            this.resume[key] = value;
        }
    },
});