<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller' . EXT);

//var_dump(__DIR__.'\\..\\libraries\\REST_Controller.php');
//var_dump(APPPATH.'libraries/REST_Controller.php');Exit;
class Servicio_rest extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('agentes_model');
    }

    public function agentes_get() {

        if (!$this->get('id')) {
            //url probar:http://192.168.1.50:8082/servicio_rest/agentes/format/json
            $agentelista = $this->agentes_model->get_agentes();
        } else {
            //http://192.168.1.50:8082/servicio_rest/agentes/format/json?id=2033 or
//            http://192.168.1.50:8082/servicio_rest/agentes/id/2033/format/json
            $agentelista = $this->agentes_model->get_ficha_agentes($this->get('id'));
        }
        $this->response($agentelista, 200);
        $data = array('returned: ' . $this->get('id'));
        $this->response($data);
    }

    public function agentes_put() {
        //uri http://192.168.1.50:8082/servicio_rest/agentes/format/json
//        $key = self::_generate_key();
//        self::_insert_key($key);
        
        $result = $this->agentes_model->agregar_agentes(array(
            'in_id' => $this->put('id'),
            'va_nombre' => $this->put('nombre'),
            'va_direccion' => $this->put('direccion'),
            'va_horario' => $this->put('horario'),
            'ta_banco_in_id' => $this->put('banco'),
            'ta_ubigeo_in_id' => $this->put('ubigeo')
                ));

        if ($result === FALSE) {
            $this->response(array('status' => 0, 'error' => 'no se pudo actualizar'), 500);
        } else {
            $this->response(array('status' => 1), 201);
        }
//        $data = array('returnedput: '. $this->put('id'));  
        $this->response($data);
    }

    public function agentes_post() {
//     http://192.168.1.50:8082/servicio_rest/agentes/format/json
        $result = $this->agentes_model->agregar_agentes(array(
//                    'in_id'=>$this->post('id'),
            'va_nombre' => $this->post('nombre'),
            'va_direccion' => $this->post('direccion'),
            'va_horario' => $this->post('horario'),
            'ta_banco_in_id' => $this->post('banco'),
            'ta_ubigeo_in_id' => $this->post('ubigeo')
                ));

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
//        $data = array('returned: '. $this->post('id'));  
//        $this->response($data); 
    }

    public function agentes_delete() {

        $data = array('returned: ' . $this->post('id'));
        $this->response($data);
    }

    private function _generate_key() {
        do {
            $salt = do_hash(time() . mt_rand());
            $new_key = substr($salt, 0, config_item('rest_key_length'));
        }

        // Already in the DB? Fail. Try again
        while (self::_key_exists($new_key));

        return $new_key;
    }
    
    private function _key_exists($key)
    {
            return $this->db->where(config_item('rest_key_column'), $key)->count_all_results(config_item('rest_keys_table')) > 0;
    }
    
    	private function _insert_key($key, $data)
	{
		
		$data[config_item('rest_key_column')] = $key;
//		$data['date_created'] = function_exists('now') ? now() : time();

		return $this->db->set($data)->insert(config_item('rest_keys_table'));
	}

}
