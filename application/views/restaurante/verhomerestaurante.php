<div class="swipe_container" role="main" style="height:auto!important;">
	<a name="maincontent" id="maincontent"></a>
	<div class="swipe_panels tier1">
		<div class="swipe4 swipe_panel active_swipe" data-url="restaurante">
			<div class="large-12 columns row">
				<h2><i class="icon-food"></i> Listas de restaurantes</h2>

                <?php foreach ($tipocomidas as $tipocomida){ ?>
                    <?php 
                      if(strlen($tipocomida['va_nombre_tipo'])>30){
                       $str=trim(substr($tipocomida['va_nombre_tipo'], 0, 27));
                        $str.='...';
                       }else {$str=$tipocomida['va_nombre_tipo'];}
                       ?>
                <div class="large-3 columns tile">
					<a href="/restaurante/<?php echo url_title_canonical($tipocomida['va_nombre_tipo'],'spaceChar',true,array('suffix' => $tipocomida['in_id']));?>" class="restaurante secondary">
						<h3><?php echo htmlspecialchars($str, ENT_QUOTES, 'utf-8');?></h3>
 
                                                <span class="datatile span_center">
                                                <span class="dt_large"><span class="number_commas" style="font-size: 0.9em;">(<?php echo $tipocomida['numtot'];?>)</span></span>
                                                </span>
                                                <i class="icon-marina"></i>
					</a>
				</div>
                                <?php } ?>
			</div>
		</div>
	</div>
</div>