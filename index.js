var M_WIDTH=800, M_HEIGHT=450;
var app, game_res; 
var spr, user;


var callback_users_getCurrentUser = function(method,result,data){
	if (result) {
			console.log(result);
	} else {
			console.log(data);
	}
};

function load()
{
	
	var rParams = FAPI.Util.getRequestParameters();
	FAPI.init(rParams["api_server"], rParams["apiconnection"],

		function() {
		alert("Инициализация прошла успешно");
		FAPI.Client.call({"method":"users.getCurrentUser", "fields":"first_name,last_name,location,pic128x128"}, callback_users_getCurrentUser);
		},
		
		function(error) {
		alert("Ошибка инициализации");
		}
	);
	
}


