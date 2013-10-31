<?php

class Usuario_model extends CI_Model{
    
    public function __construct() {
        $this->load->database();    
    }
    
    public function verificarusuario(){
        $username = $this->security->xss_clean($this->input->post('username'));
	$password = $this->security->xss_clean($this->input->post('password'));
        $this->db->select()
                ->from('ta_usuario')
                ->where(array('va_nombre'=>$username,'va_contrasena'=>$password));
        $query=$this->db->get();
        if($query->num_rows==1){
            $row=$query->row();
             $data=array(
                 'in_id'=>$row->in_id,
                 'va_nombre'=>$row->va_nombre,
                 'va_contrasena'=>$row->va_contrasena,
                 'validate'=>true
             );
           $this->session->set_userdata($data);
           return true;
        }
    return false;
        
    }
    
    
}
