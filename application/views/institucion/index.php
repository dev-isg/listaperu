<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo $this->uri->segment(2);?></a></li>
        </ul>
        <div class="large-12 columns ">
            <div class="nav-agente">
                <h2>Institución - <?php echo ucwords($tipo);?></h2>
<!--                <ul class="nav nav-tabs navdev">
                    <li class="active"><a class="link" href="#">Teléfonos de emergencia</a></li>
                </ul>-->
            </div>

            <form method="get" action="/institucion/<?php echo $categoria;?>" class="form-inline form-horizontal">
                <div class="control-group">
                  <label class="control-label aa" for="inputDep">Departamento:</label>
                  <div class="controls bb">
                    <select name="departamento">
                        <option>Lima</option>
                    </select>
                  </div>
                </div>
               
                <div class="control-group">
                  <label class="control-label aa" for="inputDis">Distrito:</label>
                  <div class="controls bb">
                    <select name="distrito">
                        <option value="">--Seleccionar--</option>
                        <?php foreach ($distritos as $key => $value): ?>
                            <option value="<?php echo $value ?>"><?php echo $value ?></option>
                        <?php endforeach ?>
                    </select>
                    <?php echo form_error('distrito'); ?>
                  </div>
                </div>
                 
                <div class="control-group">
                  <div class="controls bb">
                    <input type="submit" class="btn btn-primary" value="Buscar"/> 
                  </div>
                </div>
            </form>
            <div id="main">
                <?php if($institucion_search){?>
                <div class=""><p>Mostrando <?php echo count($institucion_search).' de '.$total_busqueda?> Resultado<?php if(count($institucion_search) > 0)echo 's';?> <?php if($tipo)echo ' de '.ucwords($tipo);?> <?php if($ubigeo)echo ' en '.ucwords($ubigeo);?></p></div>
                <h2>Lista de instituciones</h2>
                        <table class="table table-striped table-bordered">
                        <?php if (count($institucion_search) > 0) { ?>
                            <thead>  
                                <tr>
                                        <th>Nombre</th>
                                        <th>Dirección</th>
                                        <?php if($categoria=='sunat'){?>
                                        <th>Atención</th>
                                        <?php }?>
                                        <th>Distrito</th>
                                </tr>
                            </thead>
                            <?php foreach ($institucion_search as $news_item): ?>
                                <tr>
                                    <td><?php if($news_item->va_nombre)echo $news_item->va_nombre; ?></td>
                                    <td><?php if($news_item->va_direccion)echo $news_item->va_direccion; ?></td>
                                  <?php  if($news_item->va_horario){?><td><?php echo $news_item->va_horario; ?></td><?php }?>
                                    <td><?php if($news_item->ch_distrito)echo $news_item->ch_distrito; ?></td>
                                </tr>
                            <?php endforeach ?>
                            <?php }else { ?>
                                <div class=""><p>No hay resultados encontrados</p></div>
                            <?php } ?>
                        </table>
                <?php }else { ?>
                <div class=""><p>No hay resultados encontrados</p></div>
            <?php } ?>
            <p><?php echo $links;?> </p>
            </div>
        </div>
    </div>
</div>