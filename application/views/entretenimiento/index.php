<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo $this->uri->segment(2);?></a></li>
        </ul>
        <div class="large-12 columns ">
            <div class="nav-agente">
                <h2>Entretenimiento</h2>
            </div>

            <form method="get" action="/entretenimiento/<?php echo $categoria; ?>" class="form-inline form-horizontal">
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
                <!--    <div class="control-group">
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
                <p><?php echo $links; ?> </p>
                <?php if ($entretenimiento_search) { ?>
                    <div class=""><p><?php echo count($entretenimiento_search) ?>- Resultado<?php if (count($entretenimiento_search) > 0) echo 's'; ?> <?php if($entret_tipo)echo ' de '.ucwords($entret_tipo); ?> <?php if($ubigeo)echo ' en '.ucwords($ubigeo); ?></p></div>
                    <h2>Lista de lugares</h2>
                    <table class="table table-striped table-bordered">
                        <?php if (count($entretenimiento_search) > 0) { ?>
                            <thead>  
                                <tr>
                                    <th>Nombre</th>
                                    <th>Direccion</th>
                                    <th>Tipo</th>
                                    <th>Distrito</th>
                                </tr>
                            </thead>
                            <?php foreach ($entretenimiento_search as $news_item): ?>
                                <tr>
                                    <td><?php echo $news_item->va_nombre; ?></td>
                                    <td><?php echo $news_item->va_direccion; ?></td>
                                    <td><?php echo $news_item->va_nombre_tipo; ?></td>
                                    <td><?php echo $news_item->ch_distrito; ?></td>
                                </tr>
                            <?php endforeach ?>
                        <?php }else { ?>
                            <div class=""><p>No hay resultados encontrados</p></div>
                        <?php } ?>
                    </table>
                <?php } else { ?>
                    <div class=""><p>No hay resultados encontrados</p></div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>