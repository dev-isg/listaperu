<?php
class Institucion_model extends CI_Model{
    public function __construct() {
        $this->load->database();
    }
    
    public function get_tot(){
        $query=$this->db->get('ta_institucion');
        return $query->result_array();
        
    }
    
    public function search_institucion($tipo=null,$ubigeo=null,$per_page = null, $page = null, $paginator = false){
        $this->db->cache_on();
        $this->db->select('ta_institucion.*,
            ta_tipo_institucion.va_nombre as nombre_tipo,ta_ubigeo.ch_distrito')
                ->from('ta_institucion')
                ->join('ta_tipo_institucion', 'ta_tipo_institucion.in_id=ta_institucion.ta_tipo_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_institucion.ta_ubigeo_in_id', 'left');
       if ($tipo != null) {
            $this->db->where('ta_tipo_in_id', $tipo);
        }
        
        if ($ubigeo != null) {
            $this->db->where('ta_ubigeo.in_iddis', $ubigeo);
        }
        $this->db->order_by('ta_ubigeo.ch_distrito,ta_institucion.va_nombre ASC');
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
    
    public function get_tipo(){
        $query=$this->db->get('ta_tipo_institucion');
        return $query->result_object();

    }
    
     public function cantinstxUbigeo($idinst, $limit = null) {
        $this->db->select('count(ta_institucion.ta_ubigeo_in_id) as cantinst,
                   ta_ubigeo.ch_distrito')
                ->from('ta_institucion')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_institucion.ta_ubigeo_in_id')
                ->where(array('ta_institucion.ta_tipo_in_id' => $idinst))
                ->group_by('ta_ubigeo.ch_distrito')
                ->order_by('cantinst DESC');
        
        $this->db->limit($limit);
        $query = $this->db->get();
        return $query->result_object();
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
  public function get_idtipo($nombre) {
        $this->db->select('in_id')->from('ta_tipo_institucion')->like('va_nombre',$nombre);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function get_iddistrito($nombre) {
         $this->db->select('in_iddis')->from('ta_ubigeo')
               ->where(array('ch_departamento'=>'LIMA','ch_provincia'=>'LIMA'))
               ->like('ch_distrito',$nombre)
               ->limit(1);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function agregar_institucion($institucion){
        $this->db->insert('ta_institucion', $institucion);  
        $this->db->cache_delete_all();
    }
}