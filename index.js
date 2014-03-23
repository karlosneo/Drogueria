

    var idDomiclio = 0;
    var idEliminar = 0;
    var idObtener = 0;


    var app = {
        /**
        * Se crea el objeto global de la aplicación.
        * @name initialize
        * @event 
        */
        initialize: function() {
            this.bindEvents();
        },
        /**
         * Función encargada de registrar los eventos que utilizara la aplicación.
         * @function
         */
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        /**
         * Evento ejecutado por el ambiente phonegap indicando que todo esta cargado y listo para usarse.
         * @name onDeviceReady
         * @event
         */
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        /**
         * Función que propaga y uestra en consola cuando todo la inicialización esta lista..
         * @function
         */
        receivedEvent: function(id) {
            console.log('Evento recibido: ' + id);
        }
    };






        function createDb(tx) {
            tx.executeSql("DROP TABLE IF EXISTS usuarios");
            tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre VARCHAR( 80 )  NOT NULL, apellidos VARCHAR( 80 )  NOT NULL);");
            //tx.executeSql("INSERT INTO [perfil] ([experiencia], [ubicacion], [claves], [nombre], [correo], [total]) VALUES ('70', 'bogota', 'sistemas', 'sistemas andres', 'andresgarcia@misena.edu.co','0');");
            //tx.executeSql("INSERT INTO [perfil] ([experiencia], [ubicacion], [claves], [nombre], [total]) VALUES ('30', 'meta', 'ingeniero', 'ingeniero monica', '0');");
        }




    $('#indice').bind('pageinit', function(event) {
            

        var db = window.openDatabase("empleate", "1.0", "DB Empleate", 1000000);
        db.transaction(createDb, mensajeError);
            
    });









$('#nuevo').bind('pagebeforeshow', function(event) {


                $.ajax({
                   type: "GET",
                   async: false,
                   url: "http://www.fiestascuyabras.hol.es/empleate_servidor/index3.php/get/"+idUsuario,
                   success: function(data){

                    $("#detallesUsuario").html('');
                    $("#detallesUsuario").append( 
                                                  "<p>" + data.id + "<br>" 
                                                        + data.nombre + "<br>" 
                                                        + data.apellidos + "<br>" + "</p>");
                    

                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });







function mensajeError(error) {
    console.log(error);
}



$("#eliminarBtn").click(function() {
   alert(eliminarId);
    $.ajax({
        type: "GET",
        async: false,
        url: "http://www.drogueriasunidas.hol.es/obtenerdatos/index3.php/borrar/"+eliminarId,
                   success: function(data){
                   

                    if(data)
                        alert("El domicilio ha sido entregado!!");
                    else
                        alert("Error");


                   },
                   error: function () {
                        alert("Error");
                   } 

                });

});



 
$("#verificarBoton").click(function(e) {
            e.preventDefault();
            idDomiclio = parseInt(document.getElementById("codigo").value);
            
            $.ajax({
                   type: "GET",
                   async: false,
                   url: "http://www.drogueriasunidas.hol.es/obtenerdatos/index3.php/get/"+idDomiclio,
                   success: function(data){
console.log(data.Domicilio);
                    //var items = new Array();
                  if (data.Domicilio==undefined) {
                    $("#listarDomicilios").html('');
                    $("#listarDomicilios").append("<h4>El domicilio no existe o ya fue entregado</h4>");
                  }
                      
                    //llenamos la lista de datos remotos
                  else {
                    $("#listarDomicilios").html('');
                    $("#listarDomicilios").append("<h3>Codigo: "+ data.ID + "</h3>  <h4> Domicilio: " + data.Domicilio + "</h4>");
                  }
                    

                  
                    

                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });
 

 $("#cambiarBoton").click(function(e) {
            e.preventDefault();
idObtener = parseInt(document.getElementById("codigoeliminar").value);
            $.ajax({
                   type: "GET",
                   async: false,
                   url: "http://www.drogueriasunidas.hol.es/obtenerdatos/index3.php/get/"+idObtener,
                   success: function(data){

                    var items = new Array();

console.log(data.Domicilio);
                   if (data.Domicilio==undefined) {
                    $("#listarDomiciliosEliminar").html('');
                    $("#listarDomiciliosEliminar").append("<h4>El domicilio no existe o ya fue entregado</h4>");
                  }
                      
                    //llenamos la lista de datos remotos
                  else {
                    $("#listarDomiciliosEliminar").html('');
                    $("#listarDomiciliosEliminar").append('<li class="ui-li-has-alt" data-name="'+ parseInt(data.ID) +'"><a href="#nuevo" data-transition="slide" data-role="button" class="ui-btn">' 
                                                  + "<h4>" + data.Domicilio + "</h4>"
                                                  + "</a>" 
                                                  + '<a href="#"  data-name="'+  parseInt(data.ID) +'" class="delete ui-btn ui-btn-icon-notext ui-icon-action" data-rel="popup" data-icon="action" data-position-to="window" data-role="button" data-inline="true" title="Eliminar" data-transition="pop"></a>'
                                          +"</li>");
                  }
                    
                    $(".delete").on( "click", function() {
                        eliminarId = parseInt($(this).attr('data-name'));    
                        console.log(eliminarId);   
                        $.mobile.changePage( "#confirmarEstado", { role: "dialog" } );
                    });

             

                   },
                   error: function () {
                        alert("Error");
                   } 

                });

        });


$("#loginBoton").click(function(e) {
            e.preventDefault();
            nombre = document.getElementById("user").value;
            pass = document.getElementById("pass").value;
            console.log(nombre);
            console.log(pass);
            
            $.ajax({
                   type: "GET",
                   async: false,
                   url: "http://www.drogueriasunidas.hol.es/obtenerdatos/index3.php/login/"+nombre+"/"+pass,
                   success: function(data){
console.log("si entro");
                     $.mobile.changePage("#cambiarestado");

                  
                    

                   },
                   error: function () {
                        alert("Error login");
                   } 

                });

        });