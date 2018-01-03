var socket;
socket = io.connect();

$(document).ready(function(){
	//pesquisa
	$('#formPesquisaUsuario').submit(function(e){
		$('#formPesquisaUsuario').attr('action', '/u/procurar/' + $('#pesquisaUsuario').val());
		if (!validaPesquisa($('#pesquisaUsuario').val())) {
			e.preventDefault();
		}
	});
	$('#formPesquisaUsuarioNav').submit(function(e){
		$('#formPesquisaUsuarioNav').attr('action', '/u/procurar/' + $('#pesquisaUsuarioNav').val());
		if (!validaPesquisa($('#pesquisaUsuarioNav').val())) {
			e.preventDefault();
		}
	});

	$('#submitFormPesquisaUsuarioNav').click(function(){
		$('#formPesquisaUsuarioNav').submit();
	});

	//escolher foto
	$('#btnUploadFoto').click(function(){
		$('#fileFoto').click();
	});
	$('#fileFoto').change(function(e){
		$('#fotoPreview').attr('src', URL.createObjectURL(e.target.files[0]));
		if ($('#modalPostar').css('display') !== 'block') {
			$('#btnModalPostar').click();
		}
	});
	$('#fotoPreview').click(function(){
		$('#fileFoto').click();
	});
	$('#modalPostar').on('shown.bs.modal', function () {
		$('#descricaoPost').focus();
	})
	
	//postar
	$('#formPost').submit(function(e){
		$('#btnPostar').prop('disabled', true);
		
		var data = new FormData();
		$.each($('#fileFoto')[0].files, function (i, file) {
			data.append('fileFoto-' + i, file);
		});
		data.append('descricao', $('#formPost [name="descricao"]').val());
		
		$.ajax({
			url: '/p/novo',
			data: data,
			cache: false,
			contentType: false,
			processData: false,
			method: 'POST',
			type: 'POST',
			success: function (data) {
				$('#btnCloseModalPostar').click();
				$('#btnModalAvisoPostado').click();
				setTimeout(function(){
					$('#btnPostar').prop('disabled', false);
				}, 2000);
				setTimeout(function(){
					$('#btnCloseModalAvisoPostado').click();
				}, 1000);
			}
		});

		e.preventDefault();
	});
	
	//link para notificação
	$.each($('#dropdown-notificacoes .aNotificacao'), function(i, notificacao) {
		$(notificacao).click(function(e){
			$(location).attr('href', $(notificacao).attr('href-notificacao'));
		});
	});
	
	//comentar
	$.each($('[id^="formComentar"]'), function(i, comentar) {
		$(comentar).submit(function(e) {
			console.log('deu submit!');
			let id = $(comentar).attr('post-target');
			comentarPost(id, $('#msgComentar' + id).val());

			e.preventDefault();
		});
	});
});

function seguir(id) {
	socket.emit('seguir', id);
};
socket.on('retornoSeguir', function (data) {
	$('#btnSeguir').html('Seguir');
	if(data==true){
		$('#btnSeguir').html('Seguindo');
	}
});

function curtir(id) {
	socket.emit('curtirPost', id);
};
socket.on('retornoCurtir', function (data) {
	$('#qCurtiu' + data.idPost).html(data.qCurtiu);

	$('#btnLike' + data.idPost).css('color', 'black');
	if (data.isCurte == true) {
		$('#btnLike' + data.idPost).css('color', 'red');
	}
});

function comentarPost(id, msg) {
	socket.emit('comentarPost', {id, msg});
}
socket.on('retornoComentarPost', function(data) {
	$('#comentarios' + data.idPost).append(`
			<div class="row">
				<div class="col-xs-12">
					${data.comentario.dono.nome}: ${data.comentario.descricao}
				</div>
			</div>`);
});

function validaPesquisa(p){
	return (p.trim() !== '');
};