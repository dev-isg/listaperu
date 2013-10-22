<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Institucion extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('institucion_model');
        $this->load->model('agentes_model');

    }
   public function verhomeinstitucion(){
        $this->template->set_template('home');
        $data['page_body']='page-institucion';
        $title= 'Instituciones Públicas|ListaPeru.com';
        $data['sunat']=$this->institucion_model->search_institucion(1);
        $data['reniec']=$this->institucion_model->search_institucion(2);
        
        $tipos=$this->institucion_model->get_tipo();
        foreach($tipos as $tipo){
                //para el metadesct
                $cantidad=$this->institucion_model->cantinstxUbigeo($tipo->in_id,2);
                $auxcant2='Dirección de '.$tipo->va_nombre.'-';
                foreach($cantidad as $cant){
                        $auxcant2.=$cant->ch_distrito.',';
                }
                $posaux2=  strripos($auxcant2, ',');
                $metades.=substr($auxcant2,0,$posaux2).'|';
        }
        $posaux3=  strripos($metades, '|'); 
        $data['descripcion']=  substr($metades,0,$posaux3).'|ListaPeru.com';
        
        $this->template->write('title', $title);
        $this->template->write_view('content', 'institucion/verhomeinstitucion', $data, TRUE); 
        $this->template->render();
//        $this->load->view('institucion/verhomeinstitucion');
    }
    
   public function index($categoria){
       
        $this->template->set_template('home');
        $this->load->helper(array('form','url'));   
        $this->load->library(array('form_validation','session'));
        $this->load->library('pagination');
        
        $data['distritos']=$this->institucion_model->get_ubigeo();
        
        $porpagina=10;
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
            $urlfinal='/institucion/'.$categoria;

        }

         $departamento=$this->input->get('departamento');
         $ubigeo=trim($this->input->get('distrito'));
         
         //cambio para que funcione x ruteo
         $data['categoria']=$categoria;
         $tipo=($categoria=='buscar')?trim($this->input->get('tipo')):$categoria;
         
         $data['ubigeo']=$ubigeo;
         $data['tipo']=$tipo;
        if($ubigeo || $tipo){
            if(isset($ubigeo)|| $tipo){
                    $ubigeo=$ubigeo?$this->agentes_model->get_iddistrito($ubigeo)->in_iddis:null;
                    $tipo=$tipo?$this->institucion_model->get_idtipo($tipo)->in_id:null;
                    $datasearch = $this->institucion_model->search_institucion($tipo,$ubigeo,$porpagina,$page,true); 
                    $cuantos=$this->institucion_model->search_institucion($tipo,$ubigeo);
            }
        }
//        var_dump($datasearch);Exit;
//        $data['ubigeo2']=$this->input->get('distrito');
        $data['institucion_search']=$datasearch;
        $data['total_busqueda'] = $cuantos;
        
            $config['base_url'] = $urlfinal;//base_url().'agente'.//base_url().'agente/'.$depa.'/'.$ubigeoid.'/'.$banco;//
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
        $title=  ucwords($data['tipo']).'|ListaPeru.com';
//        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        $this->template->write('title', $title);   
        $this->template->write_view('content', 'institucion/index', $data, TRUE); 
        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
    }
    
       public function agregar(){
        $this->load->helper(array('form','url'));
        $this->load->library(array('form_validation','session'));
        $data['title'] = 'agregar insticución';
    
        $data['distritos']=$this->agentes_model->get_ubigeo();
        $data['tipo']=$this->institucion_model->get_tipo();     
        if($_POST){
                $this->form_validation->set_rules('direccion', 'direccion', 'required');
                $this->form_validation->set_rules('nombre', 'nombre', 'required');
                $this->form_validation->set_rules('distrito', 'distrito', 'required');
        
                $ubigeo=$this->input->post('distrito');
                $ubigeo=$this->agentes_model->distritoGuardar($ubigeo);
                
                $data=array(
                    'va_nombre'=>$this->input->post('nombre'),
                    'va_direccion'=>$this->input->post('direccion'),
                    'ta_ubigeo_in_id'=>$ubigeo,
                    'ta_tipo_in_id'=>$this->input->post('tipo'),
                );
                if($this->form_validation->run()){
                   $this->institucion_model->agregar_institucion($data);
                   redirect('/institucion/agregar?m=1','refresh');
                }else{
                    $this->session->set_flashdata('message', 'datos vacios');
                    redirect('/institucion/agregar');
                }
        }

        $this->template->write_view('content', 'institucion/agregar', $data, TRUE); 
        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
    }
}