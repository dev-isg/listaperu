<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Restaurante extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('restaurantes_model');
    }
   public function verhomerestaurante(){
        $this->template->set_template('home');
        $data['page_body']='page-restaurante';
        $data['tipocomidas']=$this->restaurantes_model->get_tipocomida();
        $title= 'Restaurantes|ListaPeru.com';
        $this->template->write('title', $title);
        $this->template->write_view('content', 'restaurante/verhomerestaurante', $data, TRUE); 
        $this->template->render();
        
    }
    
//    public function index($categoria){
//        $this->template->set_template('home');
//        $data['restaurantes']=$this->restaurantes_model->get_restaurantes();
//        $this->template->write_view('content', 'restaurante/verhomerestaurante', $data, TRUE); 
//        $this->template->render();
//    }
    
     public function index($categoria){
        $this->template->set_template('home');
        $this->load->helper(array('form','url'));   
        $this->load->library(array('form_validation','session'));
        $this->load->library('pagination');
        
	$data['title'] = 'Ver agentes';
        
        $porpagina=100;
        if ($this->uri->segment(2) == 'buscar' || strpos($_SERVER['REQUEST_URI'], '?')) {
             $page=$this->input->get('page')?$this->input->get('page'):0;
        }else{
            $page=$this->uri->segment(3);
        }
        $url = $_SERVER['REQUEST_URI'];
      
        if ($this->uri->segment(2) == 'buscar' || strpos($url, '?')) {
            $findpage = strpos($url, '&page');
            $newurl = substr($url, 0, $findpage);
            $urlfinal = $newurl ? $newurl : $url;
           
        } else{
            $urlfinal='/agente/'.$categoria;

        }

         //cambio para que funcione x ruteo
         $data['categoria']=$categoria;
         
         $tipo=($categoria=='buscar')?trim($this->input->get('tipo')):$categoria;//empty($categoria)
         
        if($tipo){
            if( isset($tipo)){  
                    $nombre = explode('-', $tipo); 
                    $tipo = array_pop($nombre);
                    //no borrar
//                    $nombre = explode('-', $datos['nombre']); 
//                    $id = array_pop($nombre);
                    $auxtipo=$this->restaurantes_model->get_tipo($tipo);
//                    $tipo=$tipo?$auxtipo[0]['in_id']:null;
                    $datasearch = $this->restaurantes_model->search_restaurante($tipo,$porpagina,$page,true); 
                    $cuantos=$this->restaurantes_model->search_restaurante($tipo);
                   
            }
        }
        
        $data['nombre_tipo']=$auxtipo[0]['va_nombre_tipo'];     
        $data['restaurante_search']=$datasearch;

            $config['base_url'] = $urlfinal;
            $config['total_rows'] = $cuantos;
            $config['per_page'] = $porpagina;
            $config['uri_segment'] = 3;
            $config['num_links'] = 4;
            $config['first_link'] = 'Primero';
            $config['next_link'] = 'Siguiente';
            $config['prev_link'] = 'Anterior';
            $config['last_link'] = 'Último';
            $config['use_page_numbers'] = TRUE;
       
            $var=strpos($url, '?');
            if ($this->uri->segment(2) != 'buscar' && $var==false) {
                 $config['page_query_string'] = FALSE;
            }else{
                 $config['page_query_string'] = TRUE;
            }

            $config['query_string_segment'] = 'page';

            $this->pagination->initialize($config);
   
        $data['links']=$this->pagination->create_links();
         //SEO
        $title=  ucwords($data['nombre_tipo']).'|ListaPeru.com';
//        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        $this->template->write('title', $title);  
        
        $this->template->write_view('content', 'restaurante/index', $data, TRUE); 
        $this->template->render();
    }
}