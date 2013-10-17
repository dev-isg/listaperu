<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/
#$route['default_controller'] = 'pages/view';
#ruteo de listas
$route['page'] = 'page/view/about';
//$route['agente/(:any)'] = 'agente/buscar2/$1/$2';//$route['agente/(:any)'] = 'agente/buscar/$1/$2';
$route['agente/(:any)'] = 'agente/index/$1';//$route['agente/buscar/(:any)'] = 'agente/index/$1';//$route['agente(/:any)'] = 'agente/index';
$route['telefono/(:any)'] = 'telefono/index/$1';//$route['telefono/buscar'] = 'telefono/index';
$route['institucion/(:any)'] = 'institucion/index/$1';//$route['institucion/buscar'] = 'institucion/index';
$route['movilidad/(:any)'] = 'movilidad/index/$1';//$route['movilidad/buscar'] = 'mobilidad/index';
$route['entretenimiento/(:any)'] = 'entretenimiento/index/$1';//$route['entretenimiento/buscar'] = 'entretenimiento/index';
$route['restaurante/(:any)'] = 'restaurante/index/$1';
#ruteo de vistas home
$route['agente'] = 'agente/verhomeagente';
$route['telefono'] = 'telefono/verhometelefono';
$route['institucion'] = 'institucion/verhomeinstitucion';
$route['movilidad'] = 'movilidad/verhomemovilidad';
$route['entretenimiento'] = 'entretenimiento/verhomeentretenimiento';
$route['restaurante'] = 'restaurante/verhomerestaurante';
#ruteo de agregar
$route['agente/agregar'] = 'agente/agregar/$1';//agregar/(:any)
$route['telefono/agregar'] = 'telefono/agregar/$1';
$route['institucion/agregar'] = 'institucion/agregar/$1';
$route['movilidad/agregar'] = 'movilidad/agregar/$1';
$route['entretenimiento/agregar'] = 'entretenimiento/agregar/$1';

$route['default_controller'] ='home/index';//'agente/index'; //"welcome";
$route['terminos'] = 'home/terminos';
$route['acerca'] = 'home/acerca';
$route['404_override'] = '';
//$route['sitemap\.xml'] = 'sitemap_index';


/* End of file routes.php */
/* Location: ./application/config/routes.php */