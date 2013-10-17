<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <div class="large-12 columns ">
            <h2>Agregar Entretenimiento</h2>
            <?php if ($this->session->flashdata('message')) : ?>
                <p><?php echo $this->session->flashdata('message') ?></p>
            <?php endif; ?>

            <form class="form-horizontal" action="/entretenimiento/agregar" method="post">
                <div class="control-group">
                    <label class="control-label" for="name">Nombre</label>
                    <div class="controls">
                        <input type="text" name="nombre" />
                        <?php echo form_error('nombre'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="telefono">Teléfono</label>
                    <div class="controls">
                        <input type="text" name="telefono" />        
                        <?php echo form_error('telefono'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="direccion">Dirección</label>
                    <div class="controls">
                        <input type="text" name="direccion" />
                        <?php echo form_error('direccion'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="depa">Departamento</label>
                    <div class="controls">
                        <select name="depa">
                            <option>Lima</option>
                        </select></br>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="distrito">Distrito</label>
                    <div class="controls">
                        <select name="distrito">
                            <option value="">--Seleccionar--</option>
                            <?php foreach ($distritos as $key => $value): ?>
                                <option value="<?php echo $key ?>"><?php echo $value ?></option>
                            <?php endforeach ?>
                        </select></br>
                        <?php echo form_error('distrito'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="tipo">Tipo</label>
                    <div class="controls">
                        <select name="tipo">
                            <option value="">--Seleccionar--</option>
                            <?php foreach ($tipos as $tipo): ?>
                                <option value="<?php echo $tipo['in_id'] ?>"><?php echo $tipo['va_nombre'] ?></option>
                            <?php endforeach ?>
                        </select>
                        <?php echo form_error('tipo'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">&nbsp</label>
                    <div class="controls">
                        <input type="submit" class="btn btn-primary" value="Agregar Agente"/> 
                    </div>
                </div>
            </form>
            <?php if ($_GET['m']) { ?>
                <?php if ($_GET['m'] == 1) { ?>
                    <div class=""><p>Se ha guardado correctamente</p></div>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
</div>