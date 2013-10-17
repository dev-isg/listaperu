<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Home extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('agentes_model');
        $this->load->model('restaurantes_model');
        $this->load->model('institucion_model');
        $this->load->model('telefonos_model');
        $this->load->model('mobilidad_model');
        $this->load->model('entretenimiento_model');
    }

    public function index(){
//        $this->load->view('home/index');
        $this->template->set_template('home');
        $data['tot_agentes']=count($this->agentes_model->get_agentes());
        $data['tot_restaurantes']=count($this->restaurantes_model->get_tot());
        $data['tot_instituciones']=count($this->institucion_model->get_tot());
        $data['tot_telefono']=count($this->telefonos_model->get_telefonos());
        $data['tot_mobilidad']=count($this->mobilidad_model->get_mobilidad());
        $data['tot_entretenimiento']=count($this->entretenimiento_model->get_entretenimiento());
        $this->template->write_view('content', 'home/index', $data, TRUE); 
//        $this->template->write_view('footer', 'templates/footer'); 
        $this->template->render();
        
    }
    
    public function terminos(){
        $this->template->set_template('home');
        $this->template->write_view('content', 'home/terminos', array(), TRUE); 
        $this->template->render();
        
    }
    
   public function acerca(){
        $this->template->set_template('home');
        $this->template->write_view('content', 'home/acerca', array(), TRUE); 
        $this->template->render();
        
    }
}
