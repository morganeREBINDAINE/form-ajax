<?php
class Sql 
{
   private $db;

   public function __construct() {
      $db = new PDO('mysql:host=localhost;dbname=utilisateur;charset=utf8', 'root', '');
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      $this->db = $db;
   }

   function add() {
      extract($_POST);
      $table = "CREATE TABLE IF NOT EXISTS `data`(
                        `id` INT AUTO_INCREMENT NOT NULL,
                        `nom` VARCHAR(255) NOT NULL,
                        `age` INT NOT NULL,
                        PRIMARY KEY (`id`)
                     ) CHARACTER SET utf8 COLLATE utf8_general_ci";
      $req = $this->db->prepare('INSERT INTO data(nom, age) VALUES(:nom, :age)');
      $this->db->exec($table);
      $result = $req->execute([':nom'=>$nom, ':age'=>$age]);
      if($result) {
         $req = $this->db->query('SELECT * FROM data WHERE id='.$this->db->lastInsertId());
         return $req->fetch();
      }
      return false;
   }

   function get() {
      try {
         $req = $this->db->query('SELECT * FROM data ORDER BY id');
         return $req->fetchAll();
      }
      catch(PDOException $e) {
         return ['error' => 'There is no datas yet'];
      }
   }

   function getFromId() {
      $req=$this->db->prepare('SELECT * FROM data WHERE id=:id');
      $r=$req->execute([':id' => $_POST['id']]);
      return $r ? $req->fetch() : false;
   }

   function update() {
      extract($_POST);
      $req=$this->db->prepare('UPDATE data SET nom=:nom, age=:age WHERE id=:id');
      $result = $req->execute([':nom'=>$nom, ':age'=>$age, ':id'=>$id]);
      if($result) {
         $req=$this->db->query('SELECT * FROM data WHERE id='.$id);
         return $req->fetch();
      }
   }

   function remove() {
      $req=$this->db->prepare('DELETE FROM data WHERE id=:id');
      $req->execute(['id'=>$_POST['id']]);
   }
}
