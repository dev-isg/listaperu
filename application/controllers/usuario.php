<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Usuario extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model('usuario_model');
    }
    
     public function index($msg = NULL) {
//        $this->load->library(array('form_validation'));
        // Load our view to be displayed
        // to the user
        if ($this->session->userdata("validate") === false) {
            $data['msg'] = $msg;
//            $this->form_validation->set_rules('username', 'username', 'required');
//            $this->form_validation->set_rules('password', 'password', 'required');
//            $this->form_validation->set_message('required', 'El campo %s es necesario');

//            if ($_POST) {
//                if ($this->form_validation->run() === FALSE) {
//                    $this->index();
//                } else {
//                    redirect('usuario/process');
//                }
//            }
            $this->load->view('usuario/login_view', $data);
        } else {
            redirect('/');
        }
    }
    
    public function process(){
        // Validate the user can login
        $result = $this->usuario_model->verificarusuario();
        // Now we verify the result
        if(! $result){
            // If user did not validate, then show them login page again
            $msg = '<font color=red>usuario/contraseña invalido(s).</font><br />';
            $this->index($msg);
//            redirect('/usuario');
        }else{
            // If user did validate, 
            // Send them to members area
//            $ref = $this->input->server('HTTP_REFERER', TRUE);
            //var_dump($_SERVER['HTTP_REFERER']);exit;
//            redirect($ref); 
            redirect('/agente/agregar');
        }        
    }
   public function do_logout(){
        $this->session->sess_destroy();
        redirect('/usuario');
    }
    
}
