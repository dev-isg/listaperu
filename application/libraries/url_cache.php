<?php
class url_cache{
  private  $url=array();
public function __construct() {}
//  public function setUrl($url){
//      $this->url=$url;
////       self::$url=$url;        
//  }
//  public function getUrl(){
//      var_dump(self::$url);Exit;
//      return $this->url;//self::$url;
//  }
public function __get($name) {
    return $this->url[$name];
}

public function __set($name, $value) {
    $this->url[$name] = $value;
}
}
