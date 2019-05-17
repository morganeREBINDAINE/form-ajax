(function(){
   var form = document.querySelector('#form')
   var message = document.querySelector('#message')
   var formId = document.querySelector('#formId')
   var nom = document.querySelector('#formNom')
   var age = document.querySelector('#formAge')

   var actionButtons = function() {
      var edit = document.querySelectorAll('.edit')
      edit.forEach(function (btn) {
         btn.addEventListener('click', onEdit)
      })
      var remove = document.querySelectorAll('.remove')
      remove.forEach(function (btn) {
         btn.addEventListener('click', onRemove)
      })
   }

   var onEdit = function (event) {
      event.preventDefault()
      message.textContent = ''
      var id = this.getAttribute('href')
      var xml = new XMLHttpRequest()
      xml.onreadystatechange = function () {
         if (xml.readyState === 4 && xml.status === 200) {
            var response = JSON.parse(xml.responseText)
            form.querySelector('#formId').value = response.id
            form.querySelector('#formNom').value = response.nom
            form.querySelector('#formAge').value = response.age

         }
      }
      xml.open('POST', 'ajax.php?t=editData', true)
      var formdata = new FormData()
      formdata.append('id', id)
      xml.send(formdata)
   }

   var onRemove = function (event) {
      event.preventDefault()
      message.textContent = ''
      var id = this.getAttribute('href')
      var xml = new XMLHttpRequest()
      xml.onreadystatechange = function () {
         if (xml.readyState === 4 && xml.status === 200) {
            var trs= document.querySelectorAll(xml.responseText)
            trs.forEach(function(tr){
               tr.remove()
            })
            empty()
            message.textContent = 'Datas has been removed'
         }
      }
      xml.open('POST', 'ajax.php?t=removeDatas', true)
      var formdata = new FormData()
      formdata.append('id', id)
      xml.send(formdata)
   }

   var createTr = function (data) {
      let tr = document.createElement('tr')
      // tr.setAttribute('class', 'tr' + data.id)
      tr.classList.add('datas','tr'+data.id)
      let td = `<td class="nom">${data.nom}</td>
             <td class="age">${data.age}</td>
             <td><a href="${data.id}" class="edit">edit</a> <a href="${data.id}" class="remove">remove</a></td>`
      tr.innerHTML = td
      return tr
   }

   var getDatasFromTxt = function() {
      $.ajax({
         url: 'ajax.php?t=getDatasFromTxt',
         type: 'GET',
         dataType: 'json',
         success: function(datas){
            $.each(datas, function(index, obj){
               var tr = createTr(obj)
               $('#table2').append($(tr))
            })
            actionButtons()
         }
      })
   }

   var getDatasFromDb = function () {
      var datas = document.querySelectorAll('.datas')
      datas.forEach(function(data){
         data.remove()
      })
      xml = new XMLHttpRequest()
      xml.onreadystatechange = function () {
         if (xml.readyState === 4 && xml.status === 200) {
            var response = JSON.parse(xml.responseText)
            if(response.error){
               var spans = document.querySelectorAll('.messageTable')
               spans.forEach(function(span){
                  span.innerHTML = response.error
               })
            }
            else {
               response.forEach(function (data) {
                  var tr = createTr(data)
                  document.querySelector('#table').appendChild(tr)
               })
               actionButtons()
            }
         }
      }
      xml.open('GET', 'ajax.php?t=getDatasFromDb', true)
      xml.send()
      
   }

   var addDatas = function (event) {
      event.preventDefault()
      message.textContent = ''
      var inputs = form.querySelectorAll('input:not(:first-child)')
      for(var i=0;i<inputs.length;i++){
         if (inputs[i].value == ''){
            message.innerHTML = 'Please fill all fields'
            return
         }
      }
      if (/\d/.test(nom.value) || nom.value.length < 2) {
         message.textContent = 'Name invalid'
         return
      }
      if (isNaN(+(age.value)) || +(age.value) <= 0 || /\./.test(+(age.value))) {
         message.textContent = 'Age invalid'
         return
      }











      if (form.querySelector('#formId').value === '') {
         xml = new XMLHttpRequest()
         xml.onreadystatechange = function () {
            if (xml.readyState === 4 && xml.status === 200) {
               var data = JSON.parse(xml.responseText)
               console.log(data)
               var tr = createTr(data)
                document.querySelector('#table').appendChild(tr)
                var tr2 = createTr(data)
                document.querySelector('#table2').appendChild(tr2)

               actionButtons()

               message.innerHTML = 'Data sended successfully'
            }
         }
         xml.open('POST', 'ajax.php?t=addDatas', true)
         var formdata = new FormData(form)
         xml.send(formdata)













      } 
      else {
         xml = new XMLHttpRequest()
         xml.onreadystatechange = function () {
            if (xml.readyState === 4 && xml.status === 200) {
               console.log(xml.response)
               var data = JSON.parse(xml.responseText)
               var rows = document.querySelectorAll('.tr' + data.id)
               rows.forEach(function(row){
                  row.querySelector('.nom').innerHTML = data.nom
                  row.querySelector('.age').innerHTML = data.age
               })
               message.textContent = 'Datas has been edited'
            }
         }
         xml.open('POST', 'ajax.php?t=updateData', true)
         var formdata = new FormData(form)
         xml.send(formdata)
      }
      getDatasFromDb()
      getDatasFromTxt()
   }

   document.querySelector('#text_button').addEventListener('click', function () {
      var text = document.querySelector('#text')
      text.style.display === 'block' ? text.style.display = 'none' : text.style.display = 'block'
   })
   var empty = function empty(e) {
      if (!e == undefined) {
         e.preventDefault()
      }
      nom.value = ''
      age.value = ''
      document.querySelector('#formId').value = ''
   }

   document.querySelector('#empty').addEventListener('click', empty)

   document.querySelector('#js').addEventListener('click', addDatas)
   getDatasFromDb()
   getDatasFromTxt()

})()
