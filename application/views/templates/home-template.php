<!DOCTYPE html>
<!--[if IE 7]> <html class="no-js lt-ie9 ie7" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]> <html class="no-js" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html class="no-js" lang="en-us"> <!--<![endif]-->
  <head>    
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta charset="utf-8" />
    <title><?php if($title){echo $title;}else{echo 'Listado de todos los lugares que necesites ir. Emergencia, ocio y más. | ListaPeru.com';}?></title>
    
    <meta name="keywords" content="comisarias,bancos,bcp,agentes bcp,cajeros bcp,viabcp,via bcp,interbank,banco interbank,agentes interbank,globalnet,agentes de bancos,scotiabank,banco continental,bbva,banco bbva,bbva continental,banco de la nacion,sunat,reniec,onpe,aduanas,discamec,inei,bcr,congreso,cofide,essalud,inabif,inabec,jne,osiptel,pronaa,promperu,sat,senamhi,policia nacional,bomberos,bomberos peru,hospitales,mudanzas,mudanzas en lima,taxi,taxi seguro,restaurantes,restaurantes en lima,instituciones publicas,instituciones del estado,taxi lima,discotecas en lima,aura,drama,ophera,bares,cineplanet,cines en lima,cinemark,uvk,cartelera,cine star,cinepolis,cine.">
    <meta name="description" content="<?php if($descripcion){echo $descripcion;}else{echo 'Miles de Usuarios buscan diariamente teléfonos de emergencia, restaurantes, bancos,  instituciones públicas, taxis, discotecas y mucho más.';} ?>">
    
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta content='on' http-equiv='cleartype' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=yes" /> 
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="" />
    <meta property="og:description" content="" />
    <meta property="og:locale" content="" />
    <meta property="og:site_name" content="" />
    <meta name="apple-mobile-web-app-title" content="" />
    <meta name="application-name" content="" />
    <!-- Windows 8 Tile Image -->
    <meta name="msapplication-TileImage" content="/assets/icons/windows-tile-icon.png" />
    <meta name="msapplication-TileColor" content="#63C1C7" />
    
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/foundation.min.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/normalize.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/style.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/page_styles.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/font-awesome.min.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/font-awesome-ie7.min.css");?>" />
    <link rel="stylesheet" href="<?php echo base_url(ASSETS."css/fontello.css");?>" />  
    <link rel='stylesheet' href="<?php echo base_url(ASSETS."css/print.css");?>" type="text/css" media="print" />
    
    <script src="<?php echo base_url(ASSETS."js/jquery-1.9.1.min.js");?>"></script>    
    <script src="<?php echo base_url(ASSETS."js/jquery.noty.js");?>"></script> 
    <script src="<?php echo base_url(ASSETS."js/jquery.noty-inline.js");?>"></script>
    <script src="<?php echo base_url(ASSETS."js/jquery.noty-default.js");?>"></script>
    <!--[if (gte IE 9) | (!IE)]><!-->  
    <script src="<?php echo base_url(ASSETS."js/custom.modernizr.js");?>"></script>
    <script src="<?php echo base_url(ASSETS."js/foundation.min.js");?>"></script>
    <script src="<?php echo base_url(ASSETS."js/script.js");?>"></script> 
    <script src="<?php echo base_url(ASSETS."js/jquery.touchSwipe.js");?>"></script>
    <script src="<?php echo base_url(ASSETS."js/jquery.qtip.min.js");?>"></script>
    <script src="<?php echo base_url(ASSETS."js/jquery.cookie.js");?>"></script> 
      <script>
      $(document).foundation();
    </script>
    <!--<![endif]-->
    <!--[if lte IE 8]>
    <link rel="stylesheet" href="<?php echo base_url(ASSETS.'css/ie.css');?>">
    <script>
      /* function notification(data) {
        var alert_dismissed = getCookie('alert_dismissed');
        var alert_array = data.feed.entry[0].content.$t.split(', ');
        var background = alert_array[0].replace('background: ', '');
        var begindate = new Date(alert_array[1].replace('begindate: ', '')).getTime() / 1000;
        var enddate = (new Date(alert_array[2].replace('enddate: ', '')).getTime() / 1000) + 86399;
        var active = alert_array[3].replace('active: ', '');
        var timenow = Math.round(+new Date()/1000);
        if(alert_dismissed == undefined) {
          alert_dismissed = 0;
        }
        if(active == 1) {
          if(timenow >= begindate && timenow <= enddate) {
            if(alert_dismissed != 1) {
              var noty = $('#alert_container').noty({
                closeWith: ['button'],
                type: background, 
                layout: 'top',
                text: '<div class="alert"><i class="icon-warning-sign"></i> <span>' + data.feed.entry[0].title.$t + '</span></div>',
                callback: {
                  onClose: function() {
                    setCookie('alert_dismissed', 1, 1);
                  }
                }
              })
            }
          }
        }
      }
      
      function setCookie(c_name,value,exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
      }
      
      function getCookie(c_name)
      {
      var c_value = document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");
      if (c_start == -1)
        {
        c_start = c_value.indexOf(c_name + "=");
        }
      if (c_start == -1)
        {
        c_value = null;
        }
      else
        {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
      c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start,c_end));
      }
      return c_value;
      } */
    </script>
    <![endif]-->
    <!--[if IE 7]>
    <link rel="stylesheet" href="<?php echo base_url(ASSETS.'css/fontello-ie7.css');?>">
    <![endif]-->
    <!-- <script>
      var script = document.createElement('script');
      script.src = 'https://spreadsheets.google.com/feeds/list/0AqMRoZWv5mnwdGFVNWNwVnhoRnlSS3gxQWhJM2ZqZkE/od6/public/basic?alt=json-in-script&callback=notification';
      
      document.getElementsByTagName('head')[0].appendChild(script);
    </script> -->
  </head>
  <body class="<?php if($page_body){ echo $page_body;}else{echo 'page-official-website-of-the-aloha-state';}?>" data-site-url='' data-bg="<?php echo base_url(ASSETS.'images/backgrounds/background-0.jpg');?>" data-parent="">
  <a href="/?mode=screenreader" class="accessibility screenreader_mode">Si usa un lector de pantalla, por favor presione enter.</a>
  <a href="#maincontent" class="accessibility">Ir directamente al contenido.</a>
    <a name="top"></a>
  <div class="row" id="alert_container"></div>
  <div class="header" role="banner">
    <div class="row">
      <div class="large-4 small-12 columns">
        <div class="site_title">
          <h1><a href="/" class="large-12 small-6 columns light-bg">ListaPerú.com</a></h1>
          <div class="mobile_buttons small-6 columns">
            <a href="#" class="mobile_search small-6 columns"><i class="icon-search"></i><span class="text_ind">Buscar</span></a>
            <a href="#" class="mobile_nav small-6 columns"><i class="icon-align-justify"><span class="text_ind">Menu</span></i></a>
          </div>
          <span class="site_tagline large-12 small-12 columns light-bg">Donde encontrarás de todo</span>
        </div> <!-- .site_title -->
      </div>
      <div class="large-8 small-12 columns nav_container">
        <ul class="navigation" role="navigation">
          <li><a href="/agente"><span><i class="icon-credit-card"></i> Agentes de bancos</span></a></li>
          <li><a href="/telefono"><span><i class="icon-phone"></i> Teléfonos de emergencia</span></a></li>
          <li><a href="/institucion"><span><i class="icon-sitemap"></i> Instituciones públicas</span></a></li>
          <li><a href="/restaurante"><span><i class="icon-food"></i> Listas de restaurantes</span></a></li>
          <li><a href="/movilidad"><span><i class="icon-truck"></i> Servicio de movilidades</span></a></li>
          <li><a href="/entretenimiento"><span><i class="icon-music"></i> Lugares de entretenimiento</span></a></li>
        </ul>
      </div> <!-- .large-7 columns -->
      <!--<div class="header_search">
        <div class="large-10 small-10 columns">
          <form action="/page/search/" method="get" id="header_search_form">
            <input type="search" name="hq" id="hq" class="usagov-search-autocomplete" placeholder="Search All Hawai&#699;i Government" title="Search Hawaii Government" role="search" autocomplete="off" x-webkit-speech />
            <input type="hidden" name="page" value="1" />
          </form>
        </div>
        <div class="large-2 small-2 columns">
            <a href="/page/search/" class="header_search_button"><i class="icon-search"></i><span class="text_ind">Search</span></a>
        </div>
      </div>-->
    </div> <!-- .row -->
  </div> <!-- .header -->

  <?php echo $content ?>
               
    <div class="footer" role="contentinfo">
      <div class="row">
        <ul class="footer_main_links">
          <!--<li><a href="#"><i class="icon-info-sign"></i><span>Ayuda</span></a></li>-->
          <!-- <li><a href=""><i class="icon-comments"></i><span>Chat</span></a></li> -->
          <li><a href="/acerca"><i class="icon-asterisk"></i><span>Acerca de ListaPeru</span></a></li>
          <li><a href="/terminos"><i class="icon-print"></i><span>Términos y condiciones</span></a></li>
          <li><a href="#footer_share" id="footer_share_button" class="footer_bubble_button"><i class="icon-share"></i><span>Compartir</span></a></li>
          <!--<li class="footer_mobile_hide"><a href="#footer_settings" id="footer_settings_button" class="footer_bubble_button"><i class="icon-cog"></i><span>Settings</span></a></li>-->
          <!--<li id="footer_more"><a href="#" id="footer_more"><i class="icon-plus"></i><span>More</span></a></li>-->
          <li id="hawaii_time">
            <span class="h_time"></span>
            <span class="h_location"></span>
            <span class="h_date"></span>
          </li>
        </ul>
      </div> <!-- .row -->
      
      <div class="footer_bubble" id="footer_share">
        <span>Compartir:</span>
        <ul class="small-block-grid-3">
          <li><a href="#" class="site_button" target="_blank"><i class="icon-facebook-sign"></i><br />Facebook</a></li>
          <li><a href="#" class="site_button" target="_blank"><i class="icon-twitter"></i><br />Twitter</a></li>
          <li><a href="#" class="site_button" target="_blank"><i class="icon-google-plus-sign"></i><br />Google+</a></li>
        </ul>
      </div>
      <!--<div class="footer_bubble" id="footer_settings">
        <span>Font Size:</span>
        <ul class="small-block-grid-3">
          <li><a href="#" class="site_button text_resize text_smaller">a -</a></li>
          <li><a href="#" class="site_button text_resize text_reset">Reset</a></li>
          <li><a href="#" class="site_button text_resize text_larger">A +</a></li>
        </ul>
        <br />
        <span>Day/Night:</span>
        <ul class="small-block-grid-3">
          <li><a href="#" class="site_button time_mode day_mode">Day</a></li>
          <li><a href="#" class="site_button time_mode reset_time_mode">Reset</a></li>
          <li><a href="#" class="site_button time_mode night_mode">Night</a></li>
        </ul>
      </div>-->
    </div> <!-- .footer -->
    <div id="modal" class="reveal-modal">
      <div id="modal_content" class="row">
        <div class="loading_image"><img src="<?php echo base_url(ASSETS.'images/loading.gif');?>" alt="loading icon" /></div>
      </div>
      <a class="close_modal"><i class="icon-remove-circle"></i> <span>Close</span></a>
    </div>
    <div class="bubble_bg"></div>
    <!-- Old Browsers -->
    <script type="text/javascript"> 
    var $buoop = {vs:{i:8,f:3.6,o:10.6,s:4,n:9}} 
    $buoop.ol = window.onload; 
    window.onload=function(){ 
     try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
     var e = document.createElement("script"); 
     e.setAttribute("type", "text/javascript"); 
     e.setAttribute("src", "<?php echo base_url(ASSETS.'js/update.js');?>"); 
     document.body.appendChild(e); 
    } 
    </script> 
  </body>
</html>
