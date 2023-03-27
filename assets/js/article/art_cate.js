$(function () {
  var layer = layui.layer

  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别的按钮绑定点击事件
  $('#btnAddCate').on('click', function () {
    layer.open({
      area: ['500px', '250px'],
      type: 1,
      title: '在线调试',
      content: $('#dialog-add').html()
    })
  })
  // 通过代理的形式，为form-add表单绑定submit事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    console.log(111)
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  
  //通过代理的形式，为btn-edit按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click','.btn-edit',function(){
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type:1,
      area:['500px','250px'],
      title:'添加文章分类',
      content:$('#dialog-edit').html()
    })
    
    
  })
  
  // 通过代理的形式,为删除的按钮绑定点击事件
  $('tbody').on('click','btn-delete',function(){
    console.log('ok')
  })
  
  
  
})