<?php 

require_once('sql.php');

if($_GET['t'] === 'addDatas') {
   echo json_encode((new Sql())->add());
}
else if ($_GET['t'] === 'getDatas') {
   echo json_encode((new Sql())->get());
}
else if ($_GET['t'] === 'editData') {
   echo json_encode((new Sql())->getFromId());
}
else if ($_GET['t'] === 'updateData') {
   echo json_encode((new Sql())->update());
}
else if ($_GET['t'] === 'removeDatas') {
   (new Sql())->remove();
   echo '#tr'.$_POST['id'];
}
