(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    // Direcionar para pagina de cadastro ao clicar no botão...
    $(document).on("click", ".uib_w_4", function(evt)
    {
        $.ui.loadContent("#pgCadastro",false,false,"slide");   
    });

        /* button  #btnCadastrar */
    $(document).on("click", "#btnCadastrar", function(evt)
    {
        if($("#campoNome").val() == "" 
           || $("#campoIdade").val() == "" 
           || $("#campoSexo").val() == "" 
           || $("#campoTelefone").val() == ""
           || $("#campoEmail").val() == "" ){
            alert("Todos Campos são obrigatórios!");
            return;
        }
        // Dados do cliente a ser cadastrado...
        var registro = {
                "NOME": $("#campoNome").val(),
                "IDADE": $("#campoIdade").val(),
                "SEXO": $("#campoSexo").val(),    
                "TELEFONE": $("#campoTelefone").val(),
                "EMAIL": $("#campoEmail").val(),                
            };
        
        // Cadastrar cliente...
        dati.insert("cliente", registro, function(codigo){
            
            // Mensagem de sucesso!
            navigator.notification.alert("Cliente #"+codigo+" cadastrado com sucesso!","INFORMAÇÃO",null,"OK");
            
            // Resetar formulário...
            $("#campoNome").val("");
            $("#campoIdade").val("");
            $("#campoSexo").val("Masculino");    
            $("#campoTelefone").val("");
            $("#campoEmail").val("");              
        });
    });
    
     /* listitem  #btnRelatorio */
    $(document).on("click", "#btnRelatorio", function(evt)
    {
        // Selecionar todos os registros de clientes...
        dati.selectAll("cliente", function(registros){
            
            // Limpar relatório (listaRelatorio)...
            $("#listaRelatorio").empty();
            
            // Percorrer CADA registro encontrado...
            $.each(registros, function(c, cliente){
                
                // Montar linha do relatório (item)...
                var item = '<li CODIGO="'+cliente.CODIGO+'"><h2>'+cliente.NOME+'</h2><p><b>Fone.:</b> '+cliente.TELEFONE+'</p><p><b>Email:</b> '+cliente.EMAIL+'</p><span class="af-badge tr">'+cliente.CODIGO+'</span></li>';
                
                // Adicionar item ao relatório (listaRelatorio)...
                $("#listaRelatorio").prepend(item);
            });
            
            // Ir para tela de relatório...
            $.ui.loadContent("#pgRelatorio",false,false,"slide");        
        });

    });
     
     /* listitem #listaRelatorio > li */
    $(document).on("click", "#listaRelatorio > li", function(evt)
    {
        // Capturar o código do cliente clicado...
        var codigo = $(this).attr("CODIGO");
        
        // Montar SQL pra buscar dados do cliente no banco de dados..
        var sql = "select * from cliente where CODIGO="+codigo;
        
        // Buscando os dados na tabela...
        dati.query(sql,function(registros){
            
            // Validar registro do cliente...
            if(registros.rows.length>0){
                
                // Capturando dados retornado...
                var cliente = registros.rows.item(0);
                
                // Carregar detalhes do cliente (página #pgDetalhes)...
                $("#detalhesCliente").parent().find(".formGroupHead").text(cliente.NOME.toUpperCase());
                $("#clienteIdade").text(cliente.IDADE+" ano(s)");
                $("#clienteSexo").text(cliente.SEXO);
                $("#clienteTelefone").text(cliente.TELEFONE);
                $("#clienteEmail").text(cliente.EMAIL);
                $("#clienteCodigo").text(codigo);


                // Ir para tela de detalhes do cliente...
                $.ui.loadContent("#pgDetalhes",false,false,"slide");   
                
            }else{
                navigator.notification.alert("Nenhum registro encontrado.","INFORMAÇÃO",null,"OK");
            }
            
        });

    });
     
    /**
    * EXEMPLO DE CHAMADA AO MÉTODO 'UPDATE' DO PLUGIN DATIJS (alterando o telefone do cadastro de CODIGO=1, na tabela cliente)...
    dati.update("cliente",{"TELEFONE":"(41)98164-0655"},"CODIGO","1",function(status){
        alert(status);
    });
    **/

    /**
    * EXEMPLO DE CHAMADA AO MÉTODO 'DELETE' DO PLUGIN DATIJS (excluindo o cadastro de CODIGO=2, na tabela cliente)...
    dati.delete("cliente","CODIGO","2",function(status){
        alert(status);
    });
    **/
    
    
        /* button  #btnDelete */
    $(document).on("click", "#btnDelete", function(evt){
        
        var codigo = $("#clienteCodigo").text(codigo);
        dati.delete("cliente","CODIGO",+codigo,function(status){
            //alert(status);
            alert("Apagado com Sucesso!");
        });
        window.location.href = "index.html";

       
        
   });
    
    /*** ao carregar a pagina ***/
     
    
       /* var code = $(this).attr("CODIGO");
        alert(code);
        
        var sql = "select * from cliente where CODIGO="+code;
        
        dati.query(sql,function(registros){
            
            if(registros.rows.length>0){
                
                var cliente = registros.rows.item(0);
                
                $("#dadosCliente").parent()
                    .find(".formGroupHead").val(cliente.NOME);
                $("#clienteIdade").val(cliente.IDADE);
                $("#clienteSexo").val(cliente.SEXO);
                $("#clienteTelefone").val(cliente.TELEFONE);
                $("#clienteEmail").val(cliente.EMAIL);
               
    });*/
     
     /* ao carregar a pagina */
    
}
    
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
