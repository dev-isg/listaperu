<div class="row static-content" role="main" style="margin-top:-40px;">
    <a name="maincontent" id="maincontent"></a>
    <div class="modal_container">
        <div class="large-12 columns ">
            <div class="nav-agente">
                <h2><?php echo $movilidad[0]->va_nombre; ?></h2>
            </div>
                    <div id="main">
                        <p><?php echo $movilidad[0]->va_nombre_tipo; ?></p>
                        <label class="control-label" for="name">Teléfono</label>
                        <p><?php echo $movilidad[0]->va_telefono; ?></p>
                        <label class="control-label" for="name">Dirección</label>
                        <p><?php echo $movilidad[0]->va_direccion; ?></p>
                        <label class="control-label" for="name">Descripción</label>
                        <p><?php echo $movilidad[0]->va_descripcion; ?></p>
                    </div>
        </div>
    </div>
</div>