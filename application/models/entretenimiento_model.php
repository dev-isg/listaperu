<?php
class Entretenimiento_model extends CI_Model{
    public function __construct() {
        $this->load->database();

    }
    
    public function get_entretenimiento() {
        $query=$this->db->get('ta_entretenimiento');
        return $query->result_array();
        
    }
    
    public function search_entretenimiento($distrito=null,$tipo=null,$per_page = null, $page = null, $paginator = false){
        $this->db->cache_on();
        $this->db->select('ta_entretenimiento.*,ta_tipo_entretenimiento.va_nombre as va_nombre_tipo,ta_ubigeo.ch_distrito')
                ->from('ta_entretenimiento')
                ->join('ta_tipo_entretenimiento', 'ta_tipo_entretenimiento.in_id=ta_entretenimiento.ta_tipo_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_entretenimiento.ta_ubigeo_in_id', 'left');
        if ($tipo != null) {
            $this->db->where('ta_entretenimiento.ta_tipo_in_id', $tipo);
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
//            return $query->result_array();
        } else {
            return $this->db->count_all_results();
        }
        
    }
    
    public function get_tipos(){
        $query=$this->db->get('ta_tipo_entretenimiento');
        return $query->result_array();
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
        $this->db->select('in_id')->from('ta_tipo_entretenimiento')->like('va_nombre',$nombre);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function agregar_entretenimiento($entretenimiento){
        $this->db->insert('ta_entretenimiento', $entretenimiento); 
        $this->db->cache_delete_all();
    }
}
