var M_WIDTH=800, M_HEIGHT=450;
var app, game_res; 
var spr, user;

function load()
{
	
	var rParams = FAPI.Util.getRequestParameters();
	FAPI.init(rParams["api_server"], rParams["apiconnection"],

		function() {
		alert("Инициализация прошла успешно");
		},

		function(error) {
		alert("Ошибка инициализации");
		}
	);
	
}


