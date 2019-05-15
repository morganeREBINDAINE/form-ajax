<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Document</title>
   <style>
      form {
         margin-top: 20px;
      }
      input {
         display: block;
         margin: 5px auto;
      }

      button {
         margin: auto;
      display: block;
      }

      table {
          border-spacing: 0;
         border-collapse: collapse;
         margin: auto;
      }
      td {
         border: 1px solid black;
      }

      tbody {
         border: 1px solid black;
      }

      .hidden {
         display:none;
      }

      span {
         text-align: center;
         display: block;
      }
   </style>
</head>
<body>
   <form action="#" method="post" id="form">
      <input type="hidden" name="id" id="formId">
      <input type="text" name="nom" placeholder="nom" id="formNom">
      <input type="text" name="age" placeholder="age" id="formAge">
      <input type="submit">
   </form>
   <span id="message"></span>
   <table id="table">
      <tr>
         <td>nom</td>
         <td>age</td>
         <td>boutons</td>
      </tr>
   </table>
   <script src="script.js"></script>
</body>
</html>
