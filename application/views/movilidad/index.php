<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <ul class="breadcrumb">
          <li><a href="/<?php echo $this->uri->segment(0);?>">Inicio</a> <span class="divider">/</span></li>
          <li><a href="/<?php echo $this->uri->segment(1);?>"><?php echo $this->uri->segment(2);?></a></li>
        </ul>
        <div class="large-12 columns ">
<div class="nav-agente">
    <h2>Movilidades - <?php echo ucwords($categoria);?></h2>
<!--    <ul class="nav nav-tabs navdev">
        <li class="active"><a class="link" href="#">Mobilidades</a></li>
    </ul>-->
</div>

<form method="get" action="/movilidad/<?php echo $categoria;?>" class="form-inline form-horizontal">
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
    
    <?php if($mobilidad_search){?>
    <div class=""><p><?php echo $total_movilidad;?>- Resultado<?php if(count($mobilidad_search) > 1)echo 's';?> <?php if($tipo_movilidad)echo 'de '.ucwords($tipo_movilidad);?> <?php if($distrito_movilidad)echo 'en '.ucwords($distrito_movilidad);?></p></div>
    <h2>Lista de movilidades</h2>
            <table class="table table-striped table-bordered">
            <?php if (count($mobilidad_search) > 0) { ?>
                <thead>  
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Tipo</th>
                        <th>Distrito</th>
                    </tr>
                </thead>
                <?php foreach ($mobilidad_search as $news_item): ?>
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
    <?php }else { ?>
                    <div class=""><p>No hay resultados encontrados</p></div>
                <?php } ?>
                <p><?php echo $links;?> </p>
            </div>
        </div>
    </div>
</div>