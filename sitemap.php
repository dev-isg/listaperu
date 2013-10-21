<?php
class SiteMap
{ 
  public $sitemapFileName;//= "sitemap.xml";
  public $sitemapIndexFileName = "sitemap-index.xml";
  public $robotsFileName = "robots.txt";
  //public $maxURLsPerSitemap = 50000;
  //public $createGZipFile = false;
  private $_baseUrl;
  private $_basePath;
  private $_searchEngines = array(
                                  array("http://search.yahooapis.com/SiteExplorerService/V1/updateNotification?appid=USERID&url=",
                                        "http://search.yahooapis.com/SiteExplorerService/V1/ping?sitemap="),
                                  "http://www.google.com/webmasters/tools/ping?sitemap=",
                                  "http://submissions.ask.com/ping?sitemap=",
                                  "http://www.bing.com/webmaster/ping.aspx?siteMap="
                                  );
  private $_urls;
  private $_sitemaps;
  private $_sitemapIndex;
  private $_fileSitemap;
  private $_fileSitemapIndex;
  public function SiteMap ($baseUrl, $basePath = '')
  { 
    $this->_baseUrl= $baseUrl;
    $this->_basePath = $basePath;
  } //end function __constructor

  public function init ()
  { 
    $this->_openFileSitemapIndex();
    $this->_openFileSitemap();
//    echo $this->_fileSitemapIndex  .'-'.$this->sitemapFileName. PHP_EOL;exit;
  
//    fwrite($this->_fileSitemapIndex, "<sitemap><loc>{$this->_baseUrl}/{$this->sitemapFileName}</loc></sitemap>");
    
 } //end function init
  public function done ()
  { 
    $this->_closeFileSitemapIndex();
    $this->_closeFileSitemap();
  } //end function done
  
  function addUrl ($url, $lastModified = null, $changeFrequency = null, $priority = null,$image=null)
  { 
    fwrite($this->_fileSitemap, "<url>\n"
           . "\t<loc>".htmlspecialchars($url,ENT_QUOTES,'UTF-8')."</loc>\n" 
           . (($lastModified)?"\t<lastmod>$lastModified</lastmod>\n":'') 
           . (($changeFrequency)?"\t<changefreq>$changeFrequency</changefreq>\n":'') 
           . (($priority)?"\t<priority>$priority</priority>\n":'')
           . (($image)?"\t<image:image>\n\t\t<image:loc>$image</image:loc>\n\t</image:image>\n":'') 
           . "</url>\n");
  } //end function addUrl
  protected function _openFileSitemapIndex ()
  { 
    $this->_fileSitemapIndex = fopen($this->_basePath . $this->sitemapIndexFileName,'w');
    $sitemapIndexHeader = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
      . '<sitemapindex '."\n"
      . 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' . "\n"
      . 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9' . "\n" 
      . 'http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"' . "\n" 
      . 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    fwrite($this->_fileSitemapIndex, $sitemapIndexHeader);
  } //end function initFileSitemapIndex
  protected function _closeFileSitemapIndex ()
  { 
    fwrite($this->_fileSitemapIndex, "\n</sitemapindex>\n");
    fclose($this->_fileSitemapIndex);
  } //end function _closeFileSitemapIndex
  public function addSitemap ($filename)
  { 
    if ( $this->_fileSitemap ){  
      $this->_closeFileSitemap();
    } //end if $this->_fileSitemap
    fwrite($this->_fileSitemapIndex, "\n<sitemap><loc>{$this->_baseUrl}/$filename</loc></sitemap>");
    $this->sitemapFileName = $filename;
    $this->_openFileSitemap();
    return true;
  } //end function addSitemap
  
  protected function _openFileSitemap ()
  { 
    $sitemapHeader = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" 
      . '<urlset' ."\n" 
      . 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' . "\n" 
      . 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9' . "\n" 
      . 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"' . "\n" 
      . 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    $this->_fileSitemap = fopen($this->_basePath . $this->sitemapFileName,'w');
    fwrite($this->_fileSitemap, $sitemapHeader);
  } //end function initFileSitemap

  protected function _closeFileSitemap ()
  { 
    fwrite($this->_fileSitemap,"\n</urlset>\n");
    fclose($this->_fileSitemap);
  } //end function _closeFileSitemap  

  public function send($yahooAppId = null) {
    if (!extension_loaded('curl'))
      throw new BadMethodCallException("cURL library is needed to do submission.");
    $sitemapFullURL = $this->_baseUrl.'/'.$this->sitemapIndexFileName;
    $searchEngines = $this->_searchEngines;
    $searchEngines[0] = isset($yahooAppId) ? str_replace("USERID", $yahooAppId, $searchEngines[0][0]) : $searchEngines[0][1];
    $result = array();
    for($i=0;$i<sizeof($searchEngines);$i++) {
      $submitSite = curl_init($searchEngines[$i].htmlspecialchars($sitemapFullURL,ENT_QUOTES,'UTF-8'));
// curl_setopt($submitSite, CURLOPT_HTTPPROXYTUNNEL, 1); 
// curl_setopt($submitSite, CURLOPT_PROXYPORT, 9090); 
// curl_setopt($submitSite, CURLOPT_PROXY, 'http://172.19.0.4:9090'); 
// curl_setopt($submitSite, CURLOPT_PROXYUSERPWD, 'pacmamhe:draco12'); 
      curl_setopt($submitSite, CURLOPT_RETURNTRANSFER, true);
      $responseContent = curl_exec($submitSite);
      $response = curl_getinfo($submitSite);
      $submitSiteShort = array_reverse(explode(".",parse_url($searchEngines[$i], PHP_URL_HOST)));
      $result[] = array("site" => $submitSiteShort[1].".".$submitSiteShort[0],
                        "fullsite "=> $searchEngines[$i].htmlspecialchars($sitemapFullURL, ENT_QUOTES,'UTF-8'),
                        "http_code" => $response['http_code'],
                        "message" => str_replace("\n", " ", strip_tags($responseContent)));
    }
    return $result;
  }

  public function updateRobots() {
    $sampleRobotsFile = "User-agent: *\nAllow: /";
    $sitemapFullURL = $this->_baseUrl.'/'.$this->sitemapIndexFileName;
    if (file_exists($this->_basePath . $this->robotsFileName)) {
      $robotsFile = explode("\n", file_get_contents($this->_basePath . $this->robotsFileName));
      $robotsFileContent = "";
      foreach($robotsFile as $key=>$value) {
        if(substr($value, 0, 8) == 'Sitemap:') unset($robotsFile[$key]);
        else $robotsFileContent .= $value."\n";
      }
      $robotsFileContent .= "Sitemap: $sitemapFullURL";
      file_put_contents($this->_basePath . $this->robotsFileName,$robotsFileContent);
    }
    else {
      $sampleRobotsFile = $sampleRobotsFile."\n\nSitemap: ".$sitemapFullURL;
      file_put_contents($this->_basePath . $this->robotsFileName, $sampleRobotsFile);
    }
  }
}//end class SiteMap


defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__)));//defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/..'));
//set_include_path(implode(PATH_SEPARATOR, array(
//    realpath(APPLICATION_PATH . '/vendor/zendframework/zendframework/library'),
//    get_include_path()
//)));



//require __DIR__.'/system/core/CodeIgniter.php';//__DIR__.'/../system/core/CodeIgniter.php';
//$CI  =&get_instance();
//$CI->load->helper('url');
$baseUrl='http://192.168.1.50:8082';//$CI->config->item('base_url');//'http://192.168.1.50:8082';//$config['host']['base'];
$time = explode(" ",microtime());
$time = $time[1];

$maxPerFile = 20000;
$agenteSitemapCount = 1;
$telefSitemapCount = 1;
$instiSitemapCount = 1;
$restaSitemapCount = 1;
$moviliSitemapCount = 1;
$entreSitemapCount = 1;
   
$sm = new SiteMap($baseUrl, APPLICATION_PATH.'/');//new SiteMap($baseUrl, APPLICATION_PATH .'/public/');
$sm->sitemapIndexFileName = 'sitemap_index.xml';
//$sm->sitemapFileName = 'agente'.str_pad($agenteSitemapCount,2,'0',STR_PAD_LEFT).'_sitemap.xml';
$sm->init();
        try {
	  	$conn = new PDO('mysql:host=192.168.1.50;dbname=bd_listaperu','kevin', '123456',  
                        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $conn->exec("set names utf8"); 
	} catch(\PDOException $e) {
	  echo 'Error: ' . $e->getMessage();
	 }
//       //agentes...
         $sm->addSitemap('agente' . str_pad($agenteSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
       $data1 = $conn->query("SELECT va_nombre FROM ta_banco");
       $data1->setFetchMode(PDO::FETCH_OBJ);
       $resultado1=$data1->fetchAll();
       require_once(__DIR__.'/application/helpers/my_url_helper.php');//require_once(__DIR__.'/../application/helpers/my_url_helper.php');
        foreach ($resultado1 as $value1) {
           $sm->addUrl($baseUrl . '/agente/' .url_title_canonical($value1->va_nombre, '_',true),date('c'),'weekly');
         }
         
         
        //telefonos
         $sm->addSitemap('telefono' . str_pad($telefSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
       $data2 = $conn->query("SELECT va_nombre FROM ta_tipo_telf");
       $data2->setFetchMode(PDO::FETCH_OBJ);
       $resultado2=$data2->fetchAll();
       require_once(__DIR__.'/application/helpers/my_url_helper.php');//require_once(__DIR__.'/../application/helpers/my_url_helper.php');
        foreach ($resultado2 as $value2) {
           $sm->addUrl($baseUrl . '/telefono/' .url_title_canonical($value2->va_nombre, '_',true),date('c'),'weekly');
         }
         
        
        //institucion
         $sm->addSitemap('institucion' . str_pad($instiSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
       $data3 = $conn->query("SELECT va_nombre FROM ta_tipo_institucion");
       $data3->setFetchMode(PDO::FETCH_OBJ);
       $resultado3=$data3->fetchAll();
       require_once(__DIR__.'/application/helpers/my_url_helper.php');//require_once(__DIR__.'/../application/helpers/my_url_helper.php');
        foreach ($resultado3 as $value3) {
           $sm->addUrl($baseUrl . '/institucion/' .url_title_canonical($value3->va_nombre, '_',true),date('c'),'weekly');
         }
         
       
        //movilidad
        $sm->addSitemap('movilidad' . str_pad($moviliSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
       $data4 = $conn->query("SELECT va_nombre FROM ta_tipo_mobilidad");
       $data4->setFetchMode(PDO::FETCH_OBJ);
       $resultado4=$data4->fetchAll();
        require_once(__DIR__.'/application/helpers/my_url_helper.php');//       require_once(__DIR__.'/../application/helpers/my_url_helper.php');
        foreach ($resultado4 as $value4) {
           $sm->addUrl($baseUrl . '/movilidad/' .url_title_canonical($value4->va_nombre, '_',true),date('c'),'weekly');
         }
         
         
        //entretenimiento
         $sm->addSitemap('entretenimiento' . str_pad($entreSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
       $data5 = $conn->query("SELECT va_nombre FROM ta_tipo_entretenimiento");
       $data5->setFetchMode(PDO::FETCH_OBJ);
       $resultado5=$data5->fetchAll();
        require_once(__DIR__.'/application/helpers/my_url_helper.php');//       require_once(__DIR__.'/../application/helpers/my_url_helper.php');
        foreach ($resultado5 as $value5) {
           $sm->addUrl($baseUrl . '/entretenimiento/' .url_title_canonical($value5->va_nombre, '_',true),date('c'),'weekly');
         }
         
        
         //restaurantes
 
          try {
	  	$connres = new PDO('mysql:host=192.168.1.50;dbname=listadelsabor2','kevin', '123456',  
                        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                $connres->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $connres->exec("set names utf8"); 
                $sm->sitemapFileName = 'restaurante'.str_pad($agenteSitemapCount,2,'0',STR_PAD_LEFT).'_sitemap.xml';
  
                 $data6 = $connres->query("SELECT ta_tipo_comida.* 
                                FROM ta_tipo_comida 
                                LEFT JOIN ta_restaurante ON ta_tipo_comida.in_id=ta_restaurante.ta_tipo_comida_in_id 
                                WHERE va_nombre_tipo != 'vacio'
                                AND ta_restaurante.en_estado='activo'
                                AND ta_restaurante.ta_tipo_comida_in_id >0 
                                GROUP BY ta_restaurante.ta_tipo_comida_in_id 
                                ORDER BY va_nombre_tipo ASC");
                $data6->setFetchMode(PDO::FETCH_OBJ);
                $resultado6=$data6->fetchAll();
                
                $sm->addSitemap('restaurante' . str_pad($restaSitemapCount, 2, '0', STR_PAD_LEFT) . '_sitemap.xml');
                
                 require_once(__DIR__.'/application/helpers/my_url_helper.php');//                require_once(__DIR__.'/../application/helpers/my_url_helper.php');
                 foreach ($resultado6 as $value6) {
                    $sm->addUrl($baseUrl . '/restaurante/' .url_title_canonical($value6->va_nombre_tipo, 'spaceChar',
                                            true,array('suffix' => $value6->in_id)),date('c'),'weekly');
                    
                    
                  }
                  

	} catch(\PDOException $e) {
	  echo 'Error: ' . $e->getMessage();
	 }
         
$sm->updateRobots();
$result = $sm->send();
print_r($result);
$sm->done();

echo "\nUso de memoria: " . number_format(memory_get_peak_usage()/(1024*1024),2)."MB\n";
$time2 = explode(" ",microtime());
$time2 = $time2[1];
echo "\nTiempo de ejecución: " . number_format($time2-$time)."s\n";


die();