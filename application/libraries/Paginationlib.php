<?php
class Paginationlib {
    //put your code here
    function __construct() {
         $this->ci =& get_instance();
    }
 
    public function initPagination($base_url,$total_rows){
        $config['per_page']          = 1;
        $config['uri_segment']       = 3;
        $config['base_url']          = base_url().$base_url;
        $config['total_rows']        = $total_rows;
        $config['use_page_numbers']  = TRUE;
        
        $config['first_tag_open'] = $config['last_tag_open']= $config['next_tag_open']= $config['prev_tag_open'] = $config['num_tag_open'] = '
';
        $config['first_tag_close'] = $config['last_tag_close']= $config['next_tag_close']= $config['prev_tag_close'] = $config['num_tag_close'] = '';
        
        $config['cur_tag_open'] = "
";
        $config['cur_tag_close'] = "
";
        
        $this->ci->pagination->initialize($config);
        return $config;    
    }
    
}