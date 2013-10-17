<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Movilidad extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('mobilidad_model');
        $this->load->model('agentes_model');

    }
   public function verhomemovilidad(){
        $this->template->set_template('home');
        $data['page_body']='page-mobilidad';
        $title= 'Servicio de Movilidades|ListaPeru.com';
        $this->template->write('title', $title);
        $this->template->write_view('content', 'movilidad/verhomemovilidad', $data, TRUE); 
        $this->template->render();
       
    }
    
   public function index($categoria){
        $this->template->set_template('home');
        $this->load->helper(array('form','url'));   
        $this->load->library(array('form_validation','session'));
        $this->load->library('pagination');
       
        $data['distritos']=$this->agentes_model->get_ubigeo();
        $data['tipos']=$this->mobilidad_model->get_tipos();
	$data['title'] = 'Ver agentes';
        
        $porpagina=10;
        if ($this->uri->segment(2) == 'buscar' || strpos($_SERVER['REQUEST_URI'], '?')) {
             $page=$this->input->get('page')?$this->input->get('page'):0;//($this->uri->segment(5))?$this->uri->segment(5):0;//
        }else{
            $page=$this->uri->segment(3);
        }
        $url = $_SERVER['REQUEST_URI'];
      
        if ($this->uri->segment(2) == 'buscar' || strpos($url, '?')) {
            $findpage = strpos($url, '&page');
            $newurl = substr($url, 0, $findpage);
            $urlfinal = $newurl ? $newurl : $url;
           
        } else{
            $urlfinal='/movilidad/'.$categoria;

        }

         $departamento=$this->input->get('departamento');
         $ubigeo=trim($this->input->get('distrito'));
         $data['distrito_movilidad']=$ubigeo;
         //cambio para que funcione x ruteo
         $data['categoria']=$categoria;
         $tipo=($categoria=='buscar')?trim($this->input->get('tipo')):$categoria;
         $data['tipo_movilidad']=$tipo;
        if($ubigeo || $tipo){
            if(isset($ubigeo) || isset($tipo)){
                    $ubigeo=$ubigeo?$this->agentes_model->get_iddistrito($ubigeo)->in_iddis:null;//$this->input->get('distrito');
                    $tipo=$tipo?$this->mobilidad_model->get_idtipo($tipo)->in_id:null;
                    $datasearch = $this->mobilidad_model->search_mobilidad($ubigeo,$tipo,$porpagina,$page,true); 
                    $cuantos=$this->mobilidad_model->search_mobilidad($ubigeo,$tipo);
            }
        }

            $data['mobilidad_search']=$datasearch;
            $data['total_movilidad']=$cuantos;
            
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
        $title=  ucwords($data['tipo_movilidad']).'|ListaPeru.com';
//        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        $this->template->write('title', $title);  
        $this->template->write_view('content', 'movilidad/index', $data, TRUE); 
        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
    }
    
    
    public function agregar(){
        $this->load->helper(array('form','url'));
        $this->load->library(array('form_validation','session'));
        $aa=$this->input->get();
        $data['title'] = 'agregar movilidad';
        $data['distritos']=$this->agentes_model->get_ubigeo();
        $data['tipos']=$this->mobilidad_model->get_tipos();
        
        if($_POST){
                $this->form_validation->set_rules('nombre', 'Nombre', 'required');
//                $this->form_validation->set_rules('horario', 'horario', 'required');
                $this->form_validation->set_rules('direccion', 'direccion', 'required');
                $this->form_validation->set_rules('tipo', 'tipo', 'required');
                $this->form_validation->set_rules('distrito', 'distrito', 'required');
        
                $ubigeo=$this->input->post('distrito');
                $ubigeo=$this->agentes_model->distritoGuardar($ubigeo);
                $data=array(
                    'va_nombre'=>$this->input->post('nombre'),
                    'va_direccion'=>$this->input->post('direccion'),
                    'va_telefono'=>$this->input->post('telefono'),
                    'ta_tipo_in_id'=>$this->input->post('tipo'),
                    'ta_ubigeo_in_id'=>$ubigeo,
                );
                if($this->form_validation->run()){
                   $this->mobilidad_model->agregar_mobilidad($data);
                   redirect('/movilidad/agregar?m=1','refresh');
                }else{
                    $this->session->set_flashdata('message', 'datos vacios');
                    redirect('/movilidad/agregar');
                }
        }

        $this->template->write_view('content', 'movilidad/agregar', $data, TRUE); 
        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
    }
}