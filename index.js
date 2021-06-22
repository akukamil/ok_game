function load()
{	
	let s=window.location.href;
	if (s.includes("yandex"))
		document.getElementById("log").innerHTML = "YANDEX";
	
	if (s.includes("vk.com"))
		document.getElementById("log").innerHTML = "VK";
	document.getElementById("log").innerHTML = s;
	
}


