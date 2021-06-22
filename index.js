function load()
{	
	let s=window.location.href;
	if (s.includes("yandex"))
		alert("YANDEX");
	
	if (s.includes("vk.com") || s.includes("platform=web"))
		alert("VK");
	
	if (s.includes("vk.com") || s.includes("html5_android"))
		alert("VK_MINIAPP");
	
	document.getElementById("log").innerHTML = s;
	
}


