<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo $this->uri->segment(2);?></a></li>
        </ul>
        <div class="large-12 columns ">
            <div class="nav-agente">
                <h2>Teléfonos de emergencia - <?php echo ucwords($categoria);?></h2>
            </div>

            <form method="get" action="/telefono/<?php echo $categoria;?>" class="form-inline form-horizontal">
                <div class="control-group">
                  <label class="control-label aa" for="inputDep">Departamento:</label>
                  <div class="controls bb">
                    <select name="departamento">
                        <option>Lima</option>
                    </select>
                  </div>
                </div>
                 <?php if($categoria!='hospitales'){?>
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
                <?php } ?>
                <!--<div class="control-group">
                  <label class="control-label aa" for="inputBan">Tipo:</label>
                  <div class="controls bb">
                    <select name="tipo">
                        <option value="">--Seleccionar--</option>
                        <?php foreach ($tipos as $tipo): ?>
                            <option value="<?php echo $tipo['va_nombre'] ?>"><?php echo $tipo['va_nombre'] ?></option>
                        <?php endforeach ?>
                    </select>
                    <?php echo form_error('tipo'); ?>
                  </div>
                </div>-->
                <div class="control-group">
                  <div class="controls bb">
                    <input type="submit" class="btn btn-primary" value="Buscar"/> 
                  </div>
                </div>
            </form>
            <div id="main">
                <?php if($telefono_search){?>
                <div class=""><p>Mostrando <?php echo count($telefono_search).' de '.$total_busqueda?> Resultado<?php if(count($telefono_search) > 1)echo 's';?> <?php if($tipo2)echo 'de '.ucwords($tipo2);?>  <?php if($ubigeo2)echo 'en '.ucwords($ubigeo2);?></p></div>
                <h2>Lista de teléfonos</h2>
                        <table class="table table-striped table-bordered">
                        <?php if (count($telefono_search) > 0) { ?>
                            <thead>  
                                <tr>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <?php if($categoria!='hospitales'){?>
                                    <th>Distrito</th>
                                    <?php }?>
                                </tr>
                            </thead>
                            <?php foreach ($telefono_search as $news_item): ?>
                                <tr>
                                    <td><?php if($news_item->va_nombre){echo $news_item->va_nombre; }?></td>
                                    <td><?php if($news_item->va_telefono){echo $news_item->va_telefono; }?></td>
                                    <td><?php if($news_item->va_direccion){echo $news_item->va_direccion; }?></td>
                                   <?php if($news_item->ch_distrito){?> <td><?php echo $news_item->ch_distrito; ?></td><?php }?>
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
