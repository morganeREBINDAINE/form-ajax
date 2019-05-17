<?php 

require_once('sql.php');

if($_GET['t'] === 'addDatas') {
   $result = (new Sql())->add();
   echo json_encode($result);
   $line = $result['id'] .'|'. $result['nom'] .'|'. $result['age']."\r\n";
   $file = fopen('datas.txt', 'a+');
   $fileArray = file('datas.txt');
   array_unshift($fileArray, $line);
   file_put_contents('datas.txt', $fileArray);
   $fileArray = file('datas.txt');
}
else if ($_GET['t'] === 'getDatasFromDb') {
   echo json_encode((new Sql())->get());
}
else if ($_GET['t'] === 'getDatasFromTxt') {
   $fileArray = file('datas.txt');
   $array = [];
   foreach($fileArray as $line) {
      list($id, $nom, $age) = explode('|', $line);
      $array[] = ['id'=>$id, 'nom'=>$nom, 'age' => $age];
   }
   $array = array_reverse($array);
   echo json_encode($array);
}
else if ($_GET['t'] === 'editData') {
   echo json_encode((new Sql())->getFromId());
}
else if ($_GET['t'] === 'updateData') {
   echo json_encode((new Sql())->update());
   $line = $_POST['id'].'|'.$_POST['nom'].'|'.$_POST['age']."\r\n";
   $fileArray = file('datas.txt');
   foreach($fileArray as $ind=>$data) {
      if(substr($data, 0, 1) == $_POST['id']) {
         $fileArray[$ind] = $line;
      }
   }
   file_put_contents('datas.txt', $fileArray);

}
else if ($_GET['t'] === 'removeDatas') {
   (new Sql())->remove();
   $fileArray = file('datas.txt');
   foreach($fileArray as $ind=>$data) {
      $id = $_POST['id'];
      if(preg_match("#^$id#", $data)) {
         unset($fileArray[$ind]);
      }
   }
   file_put_contents('datas.txt', $fileArray);
   echo '.tr'.$_POST['id'];
}
else if ($_GET['t'] === 'getLine') {
   $datas = ['id'=>2, 'nom'=>'morgane', 'age'=>22];
   
}
