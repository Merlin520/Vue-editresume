var APP_ID = 'y9iSz4ngn5DBQckj4n7XPuK3-gzGzoHsz';
var APP_KEY = 'Ltk9Nr5hXYQVINQ5Pu2noYeU';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


Vue.component('editable-span', {
    props:['value'],
    template:
        `
        <span>
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" >
            <button v-on:click="editing = !editing">edit</button>
        </span>
        `,

    data(){
        return{
            editing:false,
        }
    }
});



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
        x(e){
          e.preventDefault();
          this.resume.name = e.target.innerText;
        }
    },
  });