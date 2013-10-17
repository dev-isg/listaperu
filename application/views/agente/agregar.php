<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <div class="large-12 columns ">
            <h2>Agregar Agentes</h2>
            <?php if ($this->session->flashdata('message')) : ?>
                <p><?php echo $this->session->flashdata('message') ?></p>
            <?php endif; ?>

            <form class="form-horizontal" action="/agente/agregar" method="post">
                <div class="control-group">
                    <label class="control-label" for="name">Nombre</label>
                    <div class="controls">
                        <input type="text" name="nombre" />
                        <?php echo form_error('nombre'); ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="horario">Horario</label>
                    <div class="controls">
                        <input type="text" name="horario" />        
                        <?php echo form_error('horario'); ?>
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
                    <label class="control-label" for="banco">Bancos</label>
                    <div class="controls">
                        <select name="banco">
                            <option value="">--Seleccionar--</option>
                            <?php foreach ($bancos as $banco): ?>
                                <option value="<?php echo $banco['in_id'] ?>"><?php echo $banco['va_nombre'] ?></option>
                            <?php endforeach ?>
                        </select>
                        <?php echo form_error('banco'); ?>
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
                    <div class=""><p>Agente guardado correctamente</p></div>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
</div>