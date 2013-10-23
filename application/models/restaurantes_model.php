<?php
class Restaurantes_model extends CI_Model{
public $db2;
    public function __construct() {
        parent::__construct();
       $this->db2=$this->load->database('acomer', TRUE);
    }
    
   public function get_tot(){
        $this->db2->select('ta_restaurante.*')->from('ta_restaurante')
                ->where(array('en_estado'=>'activo'));
        $query=$this->db2->get();
//          var_dump($query->result_id->queryString);Exit;
        return $query->result_array();
    }
    
    
    public function get_tipocomida($order='va_nombre_tipo',$des='asc'){
        $this->db2->select('ta_tipo_comida.*,count(ta_restaurante.ta_tipo_comida_in_id) as numtot')
                ->from('ta_tipo_comida')
                ->join('ta_restaurante', 'ta_tipo_comida.in_id=ta_restaurante.ta_tipo_comida_in_id', 'left')
                ->where('va_nombre_tipo != "vacio" 
                        and ta_restaurante.en_estado="activo"
                        and  ta_restaurante.ta_tipo_comida_in_id >0')
                ->group_by('ta_restaurante.ta_tipo_comida_in_id ')
                ->order_by($order,$des);

        $query=$this->db2->get();
        return $query->result_array();
    }
    
   public function getcant_tipocomida($limit,$order='numtot',$des='desc'){
        $this->db2->select('ta_tipo_comida.*,count(ta_restaurante.ta_tipo_comida_in_id) as numtot')
                ->from('ta_tipo_comida')
                ->join('ta_restaurante', 'ta_tipo_comida.in_id=ta_restaurante.ta_tipo_comida_in_id', 'left')
                ->where('va_nombre_tipo != "vacio" 
                        and ta_restaurante.en_estado="activo"
                        and  ta_restaurante.ta_tipo_comida_in_id >0')
                ->group_by('ta_restaurante.ta_tipo_comida_in_id ')
                ->order_by($order,$des);
        $this->db2->limit($limit);
        $query=$this->db2->get();
//        var_dump($query->result_id->queryString);Exit;
        return $query->result_object();
    }
    
    public function getcant_restaurante($limit){
        $this->db2->select('ta_local.*,count(ta_local.ta_restaurante_in_id) as numtot,ta_ubigeo.ch_distrito')
                ->from('ta_local')
                ->join('ta_ubigeo','ta_ubigeo.in_id=ta_local.ta_ubigeo_in_id','left')
//                ->where('ta_restaurante.en_estado="activo"')
                ->group_by('ta_local.ta_restaurante_in_id')
                ->order_by('numtot desc');
        $this->db2->limit($limit);
        $query=$this->db2->get();
//        var_dump($query->result_id->queryString);Exit;
        return $query->result_object();
    } 
    
   public function getcant_platos($limit,$order='numtot',$des='desc'){
        $this->db2->select('ta_tipo_comida.*,count(ta_restaurante.ta_tipo_comida_in_id) as numtot')
                ->from('ta_tipo_comida')
                ->join('ta_restaurante', 'ta_tipo_comida.in_id=ta_restaurante.ta_tipo_comida_in_id', 'left')
                ->where('va_nombre_tipo != "vacio" 
                        and ta_restaurante.en_estado="activo"
                        and  ta_restaurante.ta_tipo_comida_in_id >0')
                ->group_by('ta_restaurante.ta_tipo_comida_in_id ')
                ->order_by($order,$des);
        $this->db2->limit($limit);
        $query=$this->db2->get();
//        var_dump($query->result_id->queryString);Exit;
        return $query->result_object();
    }
        
    public function get_tipo($id){
         $this->db2->select()->from('ta_tipo_comida')
                 ->where(array('in_id'=>$id));
                //->like('va_nombre_tipo',$nombre)->limit(1);;
        $query=$this->db2->get();
//        var_dump($query->result_id->queryString);Exit;
        return $query->result_array();
    }
    
    public function search_restaurante($tipo,$per_page = null, $page = null, $paginator = false){
        $this->db2->cache_on();
        $this->db2->select('ta_restaurante.*,ta_ubigeo.ch_distrito')->from('ta_restaurante')
                ->join('ta_local', 'ta_restaurante.in_id=ta_local.ta_restaurante_in_id', 'left')
                ->join('ta_ubigeo', 'ta_ubigeo.in_id=ta_local.ta_ubigeo_in_id', 'left')
                ->where(array('ta_tipo_comida_in_id'=>$tipo,'en_estado'=>'activo'))
                ->group_by('ta_restaurante.in_id ')
                 ->order_by("ta_restaurante.va_nombre", "asc");

         if ($paginator == true) {
            if ($per_page != null) {
                 if($page > 0){
                        $offset = ($page + 0)*$per_page - $per_page;
                    }
                $this->db2->limit($per_page, $offset);
            }
            $query = $this->db2->get();
//            var_dump($query->result_id->queryString);Exit;
            return $query->result_object();
        } else {
            return $this->db2->count_all_results();
        }
        
    }
}
