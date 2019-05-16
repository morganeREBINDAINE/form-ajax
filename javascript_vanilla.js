var form = document.querySelector('#form')
var message = document.querySelector('#message')
var nom = document.querySelector('#formNom')
var age = document.querySelector('#formAge')

var onEdit = function(event) {
   event.preventDefault()
   message.textContent = ''
   // console.log(this)
   var id = this.getAttribute('href')
   var xml = new XMLHttpRequest()
   xml.onreadystatechange = function() {
      if(xml.readyState === 4 && xml.status === 200){
         var response=JSON.parse(xml.responseText)
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

var onRemove = function(event) {
   event.preventDefault()
   message.textContent = ''
   var id = this.getAttribute('href')
   var xml = new XMLHttpRequest()
   xml.onreadystatechange = function() {
      if(xml.readyState === 4 && xml.status === 200) {
         document.querySelector(xml.responseText).remove()
          message.textContent = 'Datas has been removed'
      }
   }
   xml.open('POST', 'ajax.php?t=removeDatas', true)
   var formdata = new FormData()
   formdata.append('id', id)
   xml.send(formdata)
}

var addTr = function(data) {
   let tr = document.createElement('tr')
   tr.setAttribute('id', 'tr'+data.id)
   let td = `<td class="nom">${data.nom}</td>
             <td class="age">${data.age}</td>
             <td><a href="${data.id}" class="edit">edit</a> <a href="${data.id}" class="remove">remove</a></td>`
   tr.innerHTML = td
   document.querySelector('#table').appendChild(tr)

   var edit = document.querySelectorAll('.edit')
   edit.forEach(function(btn){
      btn.addEventListener('click', onEdit)
   })
   var remove = document.querySelectorAll('.remove')
   remove.forEach(function (btn) {
      btn.addEventListener('click', onRemove)
   })

}

var getDatas = function() {
   xml = new XMLHttpRequest()
   xml.onreadystatechange = function() {
      if(xml.readyState === 4 && xml.status ===200) {
         // console.log(xml.responseText)
         var response = JSON.parse(xml.responseText)
         response.forEach(function(data){
            addTr(data)
         })
      }
   }
   xml.open('GET', 'ajax.php?t=getDatas', true)
   xml.send()
}

var addDatas = function(event) {
   event.preventDefault()
   var inputs = form.querySelectorAll('input:not(:first-child):not(:last-child)')
   message.textContent = ''
   inputs.forEach(function(input){
      if(input.value === ''){
         message.textContent = 'You have to fill all fields'
         return
      }
   })
   if(isNaN(+(age.value))) {
      message.textContent = 'Please enter a valid number for age'
      return
   }
   if(/\d/.test(nom.value)) {
      message.textContent = 'Name should not contains number(s)'
      return
   }
   if (form.querySelector('#formId').value === ''){
      xml = new XMLHttpRequest()
      xml.onreadystatechange = function() {
         if(xml.readyState === 4 && xml.status === 200) {
            console.log(xml.response)
            var data = JSON.parse(xml.responseText)
            addTr(data)
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
            var row = document.querySelector('#tr'+data.id)
            row.querySelector('.nom').innerHTML = data.nom
            row.querySelector('.age').innerHTML = data.age
            message.textContent = 'Datas has been edited'
         }
      }
      xml.open('POST', 'ajax.php?t=updateData', true)
      var formdata = new FormData(form)
      xml.send(formdata)
   }
   age.value = ''
   nom.value = ''
}

form.addEventListener('submit', addDatas)
getDatas()
