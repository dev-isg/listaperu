<?php

class Agentes_model extends CI_Model{
    public function __construct() {
        $this->load->database();
    }
    
   public function get_tot(){
        $this->db->get('ta_agentes');
        return $this->db->count_all_results();
    }
    public function get_agentes(){
        $query=$this->db->get('ta_agentes');
        return $query->result_array();
    }
    
   public function get_agentes_tot(){
        $this->db->select('ta_agentes.*,ta_banco.va_nombre as nombre_banco,ta_ubigeo.ch_distrito')
                ->from('ta_agentes')
                ->join('ta_banco', 'ta_banco.in_id=ta_agentes.ta_banco_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_agentes.ta_ubigeo_in_id', 'left')
                ->order_by('RAND()')
                ->limit(20);
        $query=$this->db->get();
        return $query->result_array();
    }
    
  public function get_bancos(){
//                    $this->db->cache_on();
//        $query1 = $this->db->query('SELECT * FROM ta_banco');
//        VAR_DUMP($query1);exit;
        $query=$this->db->get('ta_banco');
        return $query->result_array();
        
        
    }
    
  public function get_idbanco($nombre){
        $this->db->select('in_id')->from('ta_banco')->like('va_nombre',$nombre);
        $query=$this->db->get();
        return $query->row_object();
  }
    
 public function get_bancos_name($id){
        $this->db->select('va_nombre')->from('ta_banco')->where(array('in_id'=>$id));
        $query=$this->db->get();
//        var_dump($query->result_id->queryString);Exit;
        return $query->row_object();
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
    public function distrito($id) {
        $auxtipo=$this->get_ubigeo();
        foreach($auxtipo as $key=>$value){
            if($key==$id){
            $auxdistrito=$auxtipo[$key];
            }
        }
        return $auxdistrito;
    }
    
   public function get_iddistrito($nombre) {
         $this->db->select('in_iddis')->from('ta_ubigeo')
               ->where(array('ch_departamento'=>'LIMA','ch_provincia'=>'LIMA'))
               ->like('ch_distrito',$nombre)
                ->limit(1);
        $query=$this->db->get();
//          var_dump($query->result_id->queryString);Exit;
        return $query->row_object();
    }
    
    public function distritoGuardar($id) {
        $this->db->select('in_id,in_iddis,ch_distrito')->from('ta_ubigeo')
                ->where(array('ch_departamento'=>'LIMA','ch_provincia'=>'LIMA'))
                ->group_by('in_iddis');
        $query=$this->db->get();
        $distritos = $query->result_array();
        foreach($distritos as $distrito){
            if($distrito['in_iddis']==$id){
                $auxdistrito=$distrito['in_id'];
            }
        }
        
        return $auxdistrito;
    }
    
    public function search_agentes($banco = null, $ubigeo = null, $per_page = null, $page = null, $paginator = false) {
        $this->db->cache_on();
        $this->db->select('ta_agentes.*,ta_banco.va_nombre as nombre_banco,ta_ubigeo.ch_distrito')
                ->from('ta_agentes')
                ->join('ta_banco', 'ta_banco.in_id=ta_agentes.ta_banco_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_agentes.ta_ubigeo_in_id', 'left');
        if ($banco != null) {
            $this->db->where('ta_banco_in_id', $banco);
        }
        if ($ubigeo != null) {
            $this->db->where('ta_ubigeo.in_iddis', $ubigeo);
        }
            $this->db->order_by('ta_ubigeo.ch_distrito,ta_agentes.va_nombre ASC');
        if ($paginator == true) {
            if ($per_page != null) {
                 if($page > 0){
                        $offset = ($page + 0)*$per_page - $per_page;
                    }
                $this->db->limit($per_page, $offset);
            }
                           
                
           $query = $this->db->get();
//           print_r((array)$query->result_object);
//           $this->db->query($query->result_id->queryString);
//           
            //obtener string del query: $query->result_id->queryString
//            var_dump($query->result_id->queryString);Exit;
            return $query->result_object();
        } else {
            return $this->db->count_all_results();
        }
    }
    
   public function cantbancoxUbigeo($idbanco, $limit = null,$order='cantagentes DESC') {
//       $num=$this->search_agentes($idbanco);
//       $aleatorio=rand(0,$num-10);
//       var_dump($aleatorio);Exit;
       $this->db->cache_off();
        $this->db->select('count(ta_agentes.ta_ubigeo_in_id) as cantagentes,
                   ta_ubigeo.ch_distrito,ta_agentes.va_direccion')
                ->from('ta_agentes')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_agentes.ta_ubigeo_in_id')
                ->where(array('ta_agentes.ta_banco_in_id' => $idbanco))
                ->group_by('ta_ubigeo.ch_distrito')
                ->order_by($order);
        
        $this->db->limit($limit);
        $query = $this->db->get();
//        var_dump($query->result_id->queryString);
        return $query->result_object();
    }
    
    public function agregar_agentes($agente){
        $this->db->insert('ta_agentes', $agente);
        $this->db->cache_delete_all();
        
    }
}
