<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Agente extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('agentes_model');
//        $this->output->enable_profiler(TRUE);
        
    }
   public function verhomeagente(){
        $this->template->set_template('home');
        $data['page_body']='page-agente';
        $bancos=$this->agentes_model->get_bancos();
        $auxcant='Agentes de ';
        foreach($bancos as $banco){
                $auxcant.=$banco['va_nombre'].',';
        }
        $posaux=  strripos($auxcant, ',');
        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        
        $data['bcp']=$this->agentes_model->search_agentes(1);
        $data['scotianbank']=$this->agentes_model->search_agentes(2);
        $data['interbank']=$this->agentes_model->search_agentes(3);
        $data['bbva']=$this->agentes_model->search_agentes(4);
        $data['banconacion']=$this->agentes_model->search_agentes(5);
    
        $this->template->write_view('content', 'agente/verhomeagente', $data, TRUE); 
        $this->template->render();
//        $this->load->view('agente/verhomeagente');
    }
    public function index($categoria){
//        $this->session->set_userdata('language', $var);
//        $this->output->cache(100);
        $this->template->set_template('home');
        $this->load->helper(array('form','url'));   
        $this->load->library(array('form_validation','session'));
        $this->load->library('pagination');
       
        $data['distritos']=$this->agentes_model->get_ubigeo();
        $data['bancos']=$this->agentes_model->get_bancos();
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
            $urlfinal='/agente/'.$categoria;

        }
         $departamento=$this->input->get('departamento');
         $ubigeo=trim($this->input->get('distrito'));
         //cambio para que funcione x ruteo
         $data['categoria']=$categoria;
         $banco=($categoria=='buscar')?trim($this->input->get('banco')):$categoria;//empty($categoria)
         
        if($ubigeo || $banco){
            if(isset($ubigeo) || isset($banco)){
                    $ubigeo=$ubigeo?$this->agentes_model->get_iddistrito($ubigeo)->in_iddis:null;//$this->input->get('distrito');
                    $banco=$banco?$this->agentes_model->get_idbanco($banco)->in_id:null;
                    //$ubigeo=$this->agentes_model->distrito($ubigeo); 
                    $datasearch = $this->agentes_model->search_agentes($banco,$ubigeo,$porpagina,$page,true); 
                    $cuantos=$this->agentes_model->search_agentes($banco,$ubigeo);
            }
        }
       
        $bank=$this->agentes_model->get_bancos_name($banco);
        $data['ubigeo2']=$this->input->get('distrito');//$ubigeo;
        $data['banco2']=$bank->va_nombre;
        $data['total_busqueda'] = $cuantos;
        $data['agentes_search']=$datasearch;
        $data['seo_busqueda']=$data['ubigeo2']?$data['banco2'].':'.$data['ubigeo2']:$data['banco2'];
      
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
//        $choice = $config["total_rows"] / $config["per_page"];
//        $config["num_links"] = round($choice);    
        $data['links']=$this->pagination->create_links();
        
        //SEO
        $title=$data['banco2'].'-Agentes|ListaPeru.com';
        $cantidad=$this->agentes_model->cantbancoxUbigeo($banco,5);
        
        $auxcant=$data['banco2'].'-';
        foreach($cantidad as $cant){
                $auxcant.=$cant->ch_distrito.',';
        }
        $posaux=  strripos($auxcant, ',');
        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        $this->template->write('title', $title);    
        $this->template->write_view('content', 'agente/index', $data, TRUE); 
        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
    }
    
//    public function buscar2($categoria,$va){
//        if(empty($va)){
//            echo 'no hay';
//        }else{echo 'existe';}
//        var_dump($va);
//        var_dump($this->uri->segment(2));
//        var_dump($categoria);exit;
//    }
    
    
    public function agregar(){
//        var_dump($this->session->userdata("language"));Exit;
        $this->load->helper(array('form','url'));
        $this->load->library(array('form_validation','session'));
        $aa=$this->input->get();
        $data['title'] = 'agregar agente';
        $data['distritos']=$this->agentes_model->get_ubigeo();
        $data['bancos']=$this->agentes_model->get_bancos();
        
        if($_POST){
                $this->form_validation->set_rules('nombre', 'Nombre', 'required');
//                $this->form_validation->set_rules('horario', 'horario', 'required');
                $this->form_validation->set_rules('direccion', 'direccion', 'required');
                $this->form_validation->set_rules('banco', 'banco', 'required');
                $this->form_validation->set_rules('distrito', 'distrito', 'required');
        
                $ubigeo=$this->input->post('distrito');
                $ubigeo=$this->agentes_model->distritoGuardar($ubigeo);
                $data=array(
                    'va_nombre'=>$this->input->post('nombre'),
                    'va_direccion'=>$this->input->post('direccion'),
                    'va_horario'=>$this->input->post('horario'),
                    'ta_banco_in_id'=>$this->input->post('banco'),
                    'ta_ubigeo_in_id'=>$ubigeo,
                );
                if($this->form_validation->run()){
                   $this->agentes_model->agregar_agentes($data);
                   redirect('/agente/agregar?m=1','refresh');
                }else{
                    $this->session->set_flashdata('message', 'datos vacios');
                    redirect('/agente/agregar');
                }
        }

        $this->template->write_view('content', 'agente/agregar', $data, TRUE); 
        $this->template->render();
    }
}
