<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo $nombre_tipo;?></a></li>
        </ul>
        <div class="large-12 columns ">
            <ul>
                <?php foreach($restaurante_search as $restaurante){ ?> 
                <li><a href="http://listadelsabor.com/buscar-por-distrito?q=restaurante: <?php echo str_replace('_', '+',  url_title_canonical($restaurante->va_nombre,'-',true));?>"><?php echo $restaurante->va_nombre;?> - <?php echo $restaurante->ch_distrito;?></a></li>
                            
                    <?php } ?>
            </ul>
         </div>
    </div>
</div>