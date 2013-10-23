<?php
class Telefonos_model extends CI_Model{
    public function __construct() {
        $this->load->database();
    }
    
   public function get_telefonos(){
        $query=$this->db->get('ta_telef_emergencia');
//        var_dump($query->result_id->queryString);exit;
        return $query->result_array();
        
    }
    
   public function get_tipos(){
        $query=$this->db->get('ta_tipo_telf');
        return $query->result_object();
    }
    
    
   public function canttelfxUbigeo($idtelf, $limit = null,$order='canttelf DESC') {
       $this->db->cache_off();
        $this->db->select('count(ta_telef_emergencia.ta_ubigeo_in_id) as canttelf,
                   ta_ubigeo.ch_distrito,ta_telef_emergencia.va_direccion')
                ->from('ta_telef_emergencia')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_telef_emergencia.ta_ubigeo_in_id')
                ->where(array('ta_telef_emergencia.ta_tipo_telf_in_id' => $idtelf))
                ->group_by('ta_ubigeo.ch_distrito')
                ->order_by($order);
        
        $this->db->limit($limit);
        $query = $this->db->get();
//        var_dump($query->result_id->queryString);
        return $query->result_object();
    }
    

    public function search_telefonos($distrito=null,$tipo=null,$per_page = null, $page = null, $paginator = false){
        $this->db->cache_on();
        $this->db->select('ta_telef_emergencia.*,ta_ubigeo.*,ta_tipo_telf.va_nombre as nombre_tipo')->from('ta_telef_emergencia')
                ->join('ta_tipo_telf', 'ta_tipo_telf.in_id=ta_telef_emergencia.ta_tipo_telf_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_telef_emergencia.ta_ubigeo_in_id', 'left');
        if ($tipo != null) {
            $this->db->where('ta_telef_emergencia.ta_tipo_telf_in_id', $tipo);
        }
        if ($distrito != null) {
            $this->db->where('ta_ubigeo.in_iddis', $distrito);
        }
        
        if ($paginator == true) {
            if ($per_page != null) {
                 if($page > 0){
                        $offset = ($page + 0)*$per_page - $per_page;
                    }
                $this->db->limit($per_page, $offset);
            }
            $query = $this->db->get();
//            var_dump($query->result_id->queryString);Exit;
            return $query->result_object();
        } else {
            return $this->db->count_all_results();
        }
        
    }
    

    public function get_ubigeo(){
        $this->db->select('in_iddis,ch_distrito')->from('ta_ubigeo')
                ->where(array('ch_departamento'=>'LIMA','ch_provincia'=>'LIMA'))
                ->group_by('in_iddis')->order_by('ch_distrito ASC');
        $query=$this->db->get();
        $distrito = $query->result_array();
        $auxtipo=array();
        foreach($distrito as $tipo){
            $auxtipo[$tipo['in_iddis']] = $tipo['ch_distrito'];      
        }
        return $auxtipo;
    }
    
    public function get_iddistrito($nombre) {
         $this->db->select('in_iddis')->from('ta_ubigeo')
               ->where(array('ch_departamento'=>'LIMA','ch_provincia'=>'LIMA'))
               ->like('ch_distrito',$nombre)
               ->limit(1);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function get_idtipo($nombre){
        $this->db->select('in_id')->from('ta_tipo_telf')->like('va_nombre',$nombre);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function agregar_telefonos($telefono){
        $this->db->insert('ta_telef_emergencia', $telefono);
        $this->db->cache_delete_all();
    }
}
