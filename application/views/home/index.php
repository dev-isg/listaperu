<div class="swipe_container" role="main" style="margin-top:-40px;">
	<a name="maincontent" id="maincontent"></a>
	<div class="swipe_panels tier1">
			<div class="swipe0 swipe_panel active_swipe" data-url="home">
				<h2 style="text-indent: -5000px; height: 0;">Official Website of the Aloha State</h2>
				<div class="row">
					<div class="welcome_container">
						<div class="welcome_message">
							Bienvenido!
						</div>
					</div>
					<!--<div class="weather_panel_container tile">
						<a href="/visitors/weather/" class="modal">
							<div class="weather_panels">
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">O&#699;ahu</span>
						    				<span class="w_condition">Partly Cloudy</span>
						    				<span class="w_temp">76.0&deg; F (24.4&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
			    			
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">Maui</span>
						    				<span class="w_condition">Light Showers Rain and Breezy</span>
						    				<span class="w_temp">75.0&deg; F (24.0&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
			    			
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">Kaua&#699;i</span>
						    				<span class="w_condition">Mostly Cloudy</span>
						    				<span class="w_temp">78.0&deg; F (25.6&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
			    			
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">Hawai&#699;i</span>
						    				<span class="w_condition">Light Rain</span>
						    				<span class="w_temp">70.0&deg; F (21.1&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
			    			
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">L&#257;na&#699;i</span>
						    				<span class="w_condition">Fair</span>
						    				<span class="w_temp">66.0&deg; F (18.8&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
			    			
			    				<div class="weather_panel">
					    			<div class="weather_content">
						    			<span class="w_icon"> </span>
						    			<div class="w_info">
						    				<span class="w_title">Moloka&#699;i</span>
						    				<span class="w_condition">Fair</span>
						    				<span class="w_temp">74.0&deg; F (23.3&deg; C)</span>
						    			</div>	
					    			</div>
					    		</div>
				    			
							</div>
						</a>
					</div>-->
					<div class="large-6 columns large-centered home_search_container">
						<div class="home_search">
							<!--<div class="large-10 small-10 columns">
								<form action="/page/search/" method="get" id="home_search_form">
									<input type="search" name="q" id="q" class="usagov-search-autocomplete" placeholder="Buscar en ListaPerú" title="Buscar en ListaPerú" autocomplete="off" x-webkit-speech />
									<input type="hidden" name="page" value="1" />
								</form>
							</div>
							<div class="large-2 small-2 columns">
								<a href="page/search/" class="home_search_button"><i class="icon-search"></i><span class="text_ind">Burcar</span></a>
							</div>-->
						</div>
					</div>
					<div class="large-12 columns home_tiles" style="margin-top:2em;">
						<div class="large-4 columns tile">
							<a href="/agente" class="business primary">
								<h3>Lista de agentes</h3>
								<!-- <i class='icon-leaf'> </i> -->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_agentes;?></span> agentes</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
						<div class="large-4 columns tile">
							<a href="/restaurante" class="restaurante primary">
								<h3>Lista de restaurantes</h3>
								<!--<i class='icon2-book-open'> </i>-->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_restaurantes;?></span> restaurantes</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
						<div class="large-4 columns tile">
							<a href="/institucion" class="residents primary">
								<h3>Lista de instituciones</h3>
								<!--<i class='icon2-book-open'> </i>-->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_instituciones;?></span> instituciones</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
						<div class="large-4 columns tile">
							<a href="/telefono" class="government primary">
								<h3>Teléfonos de emergencia</h3>
								<!--<i class='icon2-book-open'> </i>-->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_telefono;?></span> teléfonos</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
						<div class="large-4 columns tile">
							<a href="/movilidad" class="visitors primary">
								<h3>Servicios de movilidades</h3>
								<!--<i class='icon2-book-open'> </i>-->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_mobilidad;?></span> servicios</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
						<div class="large-4 columns tile">
							<a href="/entretenimiento" class="entretenimiento primary">
								<h3>Lugares de entretenimiento</h3>
								<!--<i class='icon2-book-open'> </i>-->
								<div id="popular_services_panel_container">
									<div class="panel-dev">
										<span class="datatile span_right">
						    				<span class="dt_large"><span class="number_commas" style="font-size: 1.3em;"><?php echo $tot_entretenimiento;?></span> lugares</span>
						    				<span class="dt_small" style="padding-bottom: 0.5em;">ya registrados</span>
					    				</span>
									</div>
								</div>
							</a>
						</div>
					</div>
					<!-- <div class="large-12 columns home_search_results"></div> -->
				</div>
			</div>

	</div>
</div>