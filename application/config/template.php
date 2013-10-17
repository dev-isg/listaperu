<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
 
$template['active_template'] = 'default';
 
 
$template['default']['template'] = 'templates/home-template';//'template';
$template['default']['regions'] = array(
 'header' => array('content' => array('<h1>Templates en codeigniter</h1>')),
 'title',
 'content',
 'sidebar',
 'footer',//=>array('content' => array('<p id="copyright">Uno de piera</p>')),
);
$template['default']['parser'] = 'parser';
$template['default']['parser_method'] = 'parse';
$template['default']['parse_template'] = FALSE; 
 
//definimos una plantilla para el formulario de registro
$template['home']['template'] = 'templates/home-template';//'registro/registro';
$template['home']['regions'] = array(
 'header',
 'title',
 'content',
 'sidebar',
 'footer',
);
$template['home']['parser'] = 'parser';
$template['home']['parser_method'] = 'parse';
$template['default']['parse_template'] = FALSE;