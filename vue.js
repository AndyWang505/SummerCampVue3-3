Vue.createApp({
  data() {
    return {
      text: 'what are you going to do?',
      data: [],
      temp: {},
      listItem: false,
      status:"all",
    };
  },
  computed: {
    filter() {
      switch (this.status) {
        case 'undone':
          return this.data.filter((item) => item.itemcheck===1);
        case 'done':
          return this.data.filter((item) => item.itemcheck===2);
        default:
          return this.data;
      }
    }
  },
  methods: {
    addItem(){
      if(this.text == ''){
        alert('Please enter content.');
      }else{
        this.data.push({
          id: this.data.length + 1,
          text: this.text,
          itemcheck: 1,
          listItem: false,
        });
        this.text = '';
      }
    },
    removeItem(item){
      const index = this.data.findIndex(obj=>obj.id === item.id);
      this.data.splice(index,1);
    },
    checkBox(item){
      const index = this.data.findIndex(obj=>obj.id === item.id);
      if(this.data[index].itemcheck < 2){
        this.data[index].itemcheck++;
      }else{this.data[index].itemcheck = 1;}
    },
    editItem(item){
      const editItem = this.data.findIndex(obj=>obj.id === item.id); //editItem該編輯索引
      this.temp = {...item};
      this.data[editItem].listItem = true;
    },
    doneEdit(item) {
      const index = this.data.findIndex(obj => obj.id === this.temp.id);
      const editItem = this.data.findIndex(obj=>obj.id === item.id);
      this.data[index] = this.temp;
      this.temp = {};
      this.data[editItem].listItem = false;
    },
    cancelEdit(item){
      const editItem = this.data.findIndex(obj=>obj.id === item.id);
      this.data[editItem].listItem = false;
    },
    removeAll(){
      this.data = [];
    }
  },
}).mount('#app');