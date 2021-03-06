<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Entretenimiento extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('entretenimiento_model');
        $this->load->model('agentes_model');
    }

    public function verhomeentretenimiento() {
        $this->template->set_template('home');
        $data['page_body'] = 'page-mobilidad';
        $title = 'Lugares de Entretenimiento|ListaPeru.com';
        $data['cantdisco'] = $this->entretenimiento_model->search_entretenimiento(null, 1);
        $data['cantbares'] = $this->entretenimiento_model->search_entretenimiento(null, 2);
        $data['cantcines'] = $this->entretenimiento_model->search_entretenimiento(null, 4);
        
        $tipoentret=$this->entretenimiento_model->get_tipos();
//        var_dump($tipoentret);Exit;
        foreach ($tipoentret as $tipo) {
            $auxcant.='Dirección y Teléfonos de '.ucwords($tipo['va_nombre']).'-';
        }
        $posaux=  strrpos($auxcant, '-');
        $data['descripcion']=  substr($auxcant, 0, $posaux).'|ListaPeru.com';
        $this->template->write('title', $title);
        $this->template->write_view('content', 'entretenimiento/verhomeentretenimiento', $data, TRUE);
        $this->template->render();
//        $this->load->view('entretenimiento/verhomeentretenimiento');
    }

    public function index($categoria) {
        $this->template->set_template('home');
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'session'));
        $this->load->library('pagination');

        $data['distritos'] = $this->agentes_model->get_ubigeo();
        $data['tipos'] = $this->entretenimiento_model->get_tipos();
        $data['title'] = 'Ver agentes';

        $porpagina = 10;
        if ($this->uri->segment(2) == 'buscar' || strpos($_SERVER['REQUEST_URI'], '?')) {
            $page = $this->input->get('page') ? $this->input->get('page') : 0;
        } else {
            $page = $this->uri->segment(3);
        }

        $url = $_SERVER['REQUEST_URI'];
        if ($this->uri->segment(2) == 'buscar' || strpos($url, '?')) {
            $findpage = strpos($url, '&page');
            $newurl = substr($url, 0, $findpage);
            $urlfinal = $newurl ? $newurl : $url;
        } else {
            $urlfinal = '/entretenimiento/' . $categoria;
        }

        $departamento = $this->input->get('departamento');
        $ubigeo = trim($this->input->get('distrito'));
        //cambio para que funcione x ruteo
        $data['categoria'] = $categoria;
        $tipo = ($categoria == 'buscar') ? trim($this->input->get('tipo')) : $categoria;
        $data['entret_tipo'] = $tipo;
        $data['ubigeo'] = $ubigeo;
        
        if ($ubigeo || $tipo) {
            if (isset($ubigeo) || isset($tipo)) {
                $ubigeo = $ubigeo ? $this->agentes_model->get_iddistrito($ubigeo)->in_iddis : null; //$this->input->get('distrito');
                $tipo = $tipo ? $this->entretenimiento_model->get_idtipo($tipo)->in_id : null;
                $datasearch = $this->entretenimiento_model->search_entretenimiento($ubigeo, $tipo, $porpagina, $page, true);
                $cuantos = $this->entretenimiento_model->search_entretenimiento($ubigeo, $tipo);
            }
        }

        $data['entretenimiento_search'] = $datasearch;
        $data['total_busqueda'] = $cuantos;

        $config['base_url'] = $urlfinal;
        $config['total_rows'] = $cuantos;
        $config['per_page'] = $porpagina;
        $config['uri_segment'] = 3;
        $config['num_links'] = 4;
        $config['first_link'] = 'Primero';
        $config['next_link'] = 'Siguiente';
        $config['prev_link'] = 'Anterior';
        $config['last_link'] = 'Último';
        $config['use_page_numbers'] = TRUE;
        $var = strpos($url, '?');
        if ($this->uri->segment(2) != 'buscar' && $var == false) {
            $config['page_query_string'] = FALSE;
        } else {
            $config['page_query_string'] = TRUE;
        }
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);

        $data['links'] = $this->pagination->create_links();

        //SEO
        $title = ucwords($data['entret_tipo']) . '|ListaPeru.com';
        $entretecantid=$this->entretenimiento_model->cantidad_random($tipo,10,'rand()');
        $auxcant=ucwords($data['entret_tipo']).'|';
        foreach ($entretecantid as $entret) {
            $auxcant.=$entret->va_direccion.'-'.$entret->ch_distrito.',';
        }
        $posaux=  strripos($auxcant, ',');
        $data['descripcion']=  substr($auxcant,0,$posaux).'|ListaPeru.com';
        $this->template->write('title', $title);
        $this->template->write_view('content', 'entretenimiento/index', $data, TRUE);
        $this->template->write_view('footer', 'templates/footer');
        $this->template->render();
    }

    public function agregar() {
        if(! $this->session->userdata("validate")){
            redirect('/usuario');
        }
        
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('form_validation', 'session'));
        $aa = $this->input->get();
        $data['title'] = 'agregar mobilidad';
        $data['distritos'] = $this->agentes_model->get_ubigeo();
        $data['tipos'] = $this->entretenimiento_model->get_tipos();

        if ($_POST) {
            $this->form_validation->set_rules('nombre', 'Nombre', 'required');
            $this->form_validation->set_rules('direccion', 'direccion', 'required');
            $this->form_validation->set_rules('tipo', 'tipo', 'required');
            $this->form_validation->set_rules('distrito', 'distrito', 'required');

            $ubigeo = $this->input->post('distrito');
            $ubigeo = $this->agentes_model->distritoGuardar($ubigeo);
            $data = array(
                'va_nombre' => $this->input->post('nombre'),
                'va_direccion' => $this->input->post('direccion'),
                'va_telefono' => $this->input->post('telefono'),
                'ta_tipo_in_id' => $this->input->post('tipo'),
                'ta_ubigeo_in_id' => $ubigeo,
            );
            if ($this->form_validation->run()) {

                $this->entretenimiento_model->agregar_entretenimiento($data);
                redirect('/entretenimiento/agregar?m=1', 'refresh');
            } else {
                $this->session->set_flashdata('message', 'datos vacios');
                redirect('/entretenimiento/agregar');
            }
        }

        $this->template->write_view('content', 'entretenimiento/agregar', $data, TRUE);
        $this->template->write_view('footer', 'templates/footer');
        $this->template->render();
    }

}