<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller' . EXT);

//var_dump(__DIR__.'\\..\\libraries\\REST_Controller.php');
//var_dump(APPPATH.'libraries/REST_Controller.php');Exit;
class Servicio_json extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('agentes_model');
        $this->load->model('institucion_model');
    }

    public function agentes() {
                header('Content-type: application/x-javascript');
                header("Status: 200");
                
        if (!$this->input->get('id')) {
            //url probar:http://192.168.1.50:8082/servicio_rest/agentes/format/json
            $agentelista = $this->agentes_model->get_agentes();
        } else {
            //http://192.168.1.50:8082/servicio_rest/agentes/format/json?id=2033 or
//            http://192.168.1.50:8082/servicio_rest/agentes/id/2033/format/json
            $agentelista = $this->agentes_model->get_ficha_agentes($this->input->get('id'));
        }
        
//            echo "jsonpCallback(".json_encode($agentelista).")";
//            exit();
        $this -> output -> set_content_type('application/json');
        $this -> output -> set_output("jsonpCallback(".json_encode($agentelista).")");
    }

    
    public function distrito(){
        $listadistritos=$this->agentes_model->get_ubigeo_json();
//        $this->response($listadistritos, 200);
        $this -> output -> set_content_type('application/json');
        $this -> output -> set_output("jsonpCallback(".json_encode($listadistritos).")");
    }
    
    public function buscaragente(){
       $listaagentes=$this->agentes_model->search_agentes_mobil($this->input->get('idbank',1),$this->input->get('id'));
       
       if(count($listaagentes)>0){
             $this -> output -> set_content_type('application/json');
            $this -> output -> set_output("jsonpCallback(".json_encode(array('result'=>$listaagentes,'code'=>'1')).")");
//       $this->response(array('result'=>$listaagentes,'code'=>'1'),200);
       }else{
            $this -> output -> set_content_type('application/json');
            $this -> output -> set_output("jsonpCallback(".json_encode(array('result'=>$listaagentes,'code' => '0')).")");
//           $this->response(array('result'=>0,'msge'=>'no se encontro resultado(s)'),404);
//       $this->response(array('result'=>$listaagentes,'code' => '0'));    
       }
    }
     public function buscarinstitucion(){
       $listainstituc=$this->institucion_model->search_institucion_movil($this->input->get('idinst',1),$this->input->get('iddis'));
       
       if(count($listainstituc)>0){
             $this -> output -> set_content_type('application/json');
            $this -> output -> set_output("jsonpCallback(".json_encode(array('result'=>$listainstituc,'code'=>'1')).")");
       }else{
            $this -> output -> set_content_type('application/json');
            $this -> output -> set_output("jsonpCallback(".json_encode(array('result'=>$listainstituc,'code' => '0')).")");

       }

    }
}
