
var platform="";
var my_data={};

function loadScript (src) {
  return new Promise((resolve, reject) => {
	const script = document.createElement('script')
	script.type = 'text/javascript'
	script.onload = resolve
	script.onerror = reject
	script.src = src
	document.head.appendChild(script)
  })
}


function load()
{	
	let s=window.location.href;

	if (s.includes("yandex"))
		platform="YANDEX";
	
	if (s.includes("vk.com") && s.includes("platform=web"))
		platform="VK";
	
	if (s.includes("vk.com") && s.includes("html5_android"))
		platform="VK_MINIAPP";
	platform="VK_MINIAPP";
	document.getElementById("log").innerHTML = s;
	
		
	switch (platform) {
		
		case "YANDEX":
		
			Promise.all([
				loadScript('https://akukamil.github.io/corners/load_list.txt'),
				loadScript('https://yandex.ru/games/sdk/v2')
			]).then(function(){
				console.log(load_list[0]);
				show_user_data();
			})
		
		break;
	
		case "VK":
		
			Promise.all([
				loadScript('https://akukamil.github.io/corners/load_list.txt'),
				loadScript('https://vk.com/js/api/xd_connection.js?2'),
				loadScript('//ad.mail.ru/static/admanhtml/rbadman-html5.min.js'),
				loadScript('//vk.com/js/api/adman_init.js')
				
			]).then(function(){
				console.log(load_list[0]);
				show_user_data();
			})
		
		break;
		
		case "VK_MINIAPP":
		
			Promise.all([
				loadScript('https://akukamil.github.io/corners/load_list.txt'),
				loadScript('https://vk.com/js/api/xd_connection.js?2'),
				loadScript('//ad.mail.ru/static/admanhtml/rbadman-html5.min.js'),
				loadScript('//vk.com/js/api/adman_init.js'),
				loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js')		
			]).then(function(){
				console.log(load_list[0]);
				vkBridge.subscribe((e) => bridge_events(e)); 
				vkBridge.send('VKWebAppInit');
					
				show_user_data();
			})
		
		
		break;
	};
}

function bridge_events(e) {
	console.log(e);
	if (e.detail.type === 'VKWebAppGetUserInfoResult') {
		document.getElementById("log").innerHTML=e.detail.data.first_name;
	}	
}

function show_user_data() {
	
	switch (platform) {
	
		case "YANDEX":
		
			if(typeof(YaGames)==='undefined')
			{		

			}
			else
			{
				//если sdk яндекса найден
				YaGames.init({}).then(ysdk => {					
					//фиксируем SDK в глобальной переменной
					window.ysdk=ysdk;										
					return ysdk.getPlayer();
				}).then((_player)=>{
					
					my_data.first_name 	=	_player.getName();
					my_data.uid			=	_player.getUniqueID().replace(/\//g, "Z");	
					
				}).catch(err => {		
					alert("Ошибка яндекс1");
				}).finally(()=>{			
					alert(my_data.first_name);
				})		
				
			}				

		break;
		
		
	
		case "VK":
		if(typeof(VK)==='undefined')
		{		
			alert("Ошибка вконтакте0");
		}
		else
		{
			
			VK.init(
			
				//функция удачной инициализации вконтакте
				function()
				{

					VK.api(
						"users.get",
						{access_token: '2c2dcb592c2dcb592c2dcb59a62c55991122c2d2c2dcb594cfd0c5d42f4b700d3e509a5',fields: 'photo_100'},
						function (data) {
							if (data.error===undefined) {
								
								my_data.first_name=data.response[0].first_name;
								my_data.last_name=data.response[0].last_name;
								my_data.uid="vk"+data.response[0].id;
								my_data.pic_url=data.response[0].photo_100;
								alert(my_data.first_name);
								
							}	
							else
							{
								console.log(data);
								alert("Ошибка вконтакте1");
							}
						}
					)					
				},	
				
				//функция неудачной инициализации вконтакте
				function()
				{
					alert("Ошибка вконтакте2");
				},

				//версия апи
				'5.130');		
			
			}
		
		break;
		
				
		case "VK_MINIAPP":		
			vkBridge.send('VKWebAppGetUserInfo');
		
		break;
	}
	
	
}
