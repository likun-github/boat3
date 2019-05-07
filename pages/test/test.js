Page({
  data: {
    items: [{
      name: 'USA',
      value: '美国',
      checked: false
    }, {
      name: 'CHN',
      value: '美国',
      checked: true
    }, {
      name: 'BRA',
      value: '巴西',
      checked: false
    }, {
      name: 'JPN',
      value: '日本',
      checked: false
    }, {
      name: 'ENG',
      value: '英国',
      checked: false
    }, {
      name: 'FRA',
      value: '法国',
      checked: false
    }, ],
    aa: 'CHN'
  },
  bindtap1: function(e) {
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.aa) {
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);          
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
        console.log("-----:", items);
        // this.setData(this.data.items[i]); 
      }
    }
    this.setData({
      items: items
    });
  },
  radioChange: function(e) {
    // for(var i = 0;i<this.data.items.length;i++){  
    //   if (this.data.items[i].checked){  //     // console.log('radio发生change事件，携带value值为：', this.data.items[i].name)  //   }  // }    
    this.data.aa = e.detail.value;
    console.log(this.data.aa);
  }
})