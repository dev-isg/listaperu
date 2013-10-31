<?php
class Mobilidad_model extends CI_Model{
    public function __construct() {
        $this->load->database();

    }
       public function get_mobilidad(){
        $query=$this->db->get('ta_mobilidad');
        return $query->result_array();
        
    }
    
    public function get_descripcion($id){
        $this->db->select('ta_mobilidad.*,ta_tipo_mobilidad.va_nombre as va_nombre_tipo')
                ->from('ta_mobilidad')
                ->join('ta_tipo_mobilidad','ta_tipo_mobilidad.in_id=ta_mobilidad.ta_tipo_in_id','left')
                ->where(array('ta_mobilidad.in_id'=>$id));
        $query=$this->db->get();
//        var_dump($query->result_id->queryString);exit;
        return $query->result();
    }
    
    public function search_mobilidad($distrito=null,$tipo=null,$per_page = null, $page = null, $paginator = false){
        $this->db->cache_on();
        $this->db->select('ta_mobilidad.*,ta_tipo_mobilidad.va_nombre as va_nombre_tipo,ta_ubigeo.ch_distrito')
                ->from('ta_mobilidad')
                ->join('ta_tipo_mobilidad', 'ta_tipo_mobilidad.in_id=ta_mobilidad.ta_tipo_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_mobilidad.ta_ubigeo_in_id', 'left');
        if ($tipo != null) {
            $this->db->where('ta_mobilidad.ta_tipo_in_id', $tipo);
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
            return $query->result_object();
        } else {
            return $this->db->count_all_results();
        }
        
    }
    /*
     * @params limite
     * Obtiene el random de movilidades
     * @return array object
     */
    public function cantidad_random($tipo,$limit,$order){
        $this->db->cache_off();
        $this->db->select('ta_mobilidad.*,ta_tipo_mobilidad.va_nombre as va_nombre_tipo,ta_ubigeo.ch_distrito')
                ->from('ta_mobilidad')
                ->join('ta_tipo_mobilidad', 'ta_tipo_mobilidad.in_id=ta_mobilidad.ta_tipo_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_mobilidad.ta_ubigeo_in_id', 'left');

            $this->db->where('ta_mobilidad.ta_tipo_in_id', $tipo);
            $this->db->order_by($order);
            $this->db->limit($limit);
            $query = $this->db->get();
//            var_dump($query->result_id->queryString);Exit;
            return $query->result_object();
        
    }
    
    public function get_tipos(){
        $query=$this->db->get('ta_tipo_mobilidad');
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
        $this->db->select('in_id')->from('ta_tipo_mobilidad')->like('va_nombre',$nombre);
        $query=$this->db->get();
        return $query->row_object();
    }
    
    public function agregar_mobilidad($mobilidad){
        $this->db->insert('ta_mobilidad', $mobilidad);   
        $this->db->cache_delete_all();
    }
}
