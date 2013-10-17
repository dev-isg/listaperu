<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo ucwords($banco2);?></a></li>
        </ul>
        <div class="large-12 columns ">
            <div class="nav-agente">
                <h2>Agentes - <?php echo ucwords($banco2);?></h2>
            </div>

            <form method="get" action="/agente/<?php echo $categoria;?>" class="form-inline form-horizontal" style="margin-top:20px;">
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
                <!--<div class="control-group">
                  <label class="control-label aa" for="inputBan">Banco:</label>
                  <div class="controls bb">
                    <select name="banco">
                        <option value="">--Seleccionar--</option>
                        <?php foreach ($bancos as $banco): ?>
                            <option value="<?php echo $banco['va_nombre'] ?>"><?php echo $banco['va_nombre'] ?></option>
                        <?php endforeach ?>
                    </select>
                    <?php echo form_error('banco'); ?>
                  </div>
                </div>-->
                <div class="control-group">
                  <div class="controls bb">
                    <input type="submit" class="btn btn-primary" value="Buscar"/> 
                  </div>
                </div>
            </form>
            <div id="main">
                <?php if($agentes_search){?>
                <div class=""><p><?php echo $total_busqueda;?>- Resultado<?php if(count($agentes_search) > 1)echo 's';?> <?php if($banco2)echo 'de '.ucwords($banco2);?> <?php if($ubigeo2)echo 'en '.ucwords($ubigeo2);?></p></div>
                <h2>Lista de agentes</h2>
                        <table class="table table-striped table-bordered">
                        <?php if (count($agentes_search) > 0) { ?>
                            <thead> 
                                <tr>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <!--<th>Horario</th>-->
                                    <th>Banco</th>
                                    <th>Distrito</th>
                                </tr>
                            </thead>
                            <?php foreach ($agentes_search as $news_item): ?>
                                <tr>
                                    <td><?php echo $news_item->va_nombre; ?></td>
                                    <td><?php echo $news_item->va_direccion; ?></td>
                                    <!--<td><?php echo $news_item->va_horario; ?></td>-->
                                    <td><?php echo $news_item->nombre_banco; ?></td>
                                    <td><?php echo $news_item->ch_distrito; ?></td>
                                </tr>
                            <?php endforeach ?>
                            <?php }else { ?>
                                <div class=""><p>No hay resultados encontrados</p></div>
                            <?php } ?>
                        </table>
                <?php }else { ?>
                <div class=""><p>No hay resultados encontrados</p></div>
            <?php } ?>
                <p><?php echo $links;//$this->pagination->create_links();//?> </p>
            </div>
        </div>
    </div>
</div>