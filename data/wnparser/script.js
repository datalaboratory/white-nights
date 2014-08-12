

var items =[];

var jsondata;

// Unix-time старта забега
var start_time =1404018000000;
// Самый медленный результат
var max_time = 22742;
var mokcodes = {};

// Создаем MOK-справочник стран
d3.csv("mokcodes.csv", function (d){
		d.forEach(function(d){
			mokcodes[d.mokCode]=d.countryName;
		})
	});

// Парсим
var parsedata = function(){
	d3.csv("wn-data.csv", function (d){
		d.forEach(function(d,i){
			var result_time_string;
			var add_city_info="";
			// Ищем название страны по MOK-коду
			d.country_name = mokcodes[d.country];

			d.pos = +d.pos;
			d.gender_pos = +d.gender_pos;
			d.result_time = +d.result_time;
			d.netto =+d.netto;
			d.half_time =+d.half_time;
			d.six_time=+d.six_time;

			//Обработка поля "city"
			if (d.city !== "") {
			
				if (d.country !== "RUS") {
					if (true) {add_city_info = d.country_name};
				} else {
					add_city_info = d.region;
				};

				if (add_city_info !== "") {
					add_city_info =", " + add_city_info;
				};
			} else {
				d.city = d.country_name
			};
			
			//Расшифровка поля "gender"
			if (d.gender === "М") { d.gender = 1 }
				else { d.gender = 0 };

			// Логика для сошедших с дистанции
			if (Number.isNaN(d.result_time)) {
				// gender = 2, чтоб не отображать на диаграмме финишей;
				d.gender = 2;

				// Обнуляем позиции, на всякий случай.
				d.pos = null;
				d.gender_pos = null;

				// Подгоняем время, чтоб на карте бегуны стояли на финише, а в таблице — в самом низу.
				// Может слететь логика подписи "сошел" в таблице
				d.result_time = max_time + 1;
				d.netto = 0;
				d.half_time = d.result_time;
				d.six_time = d.result_time;
			
			// Если добежал, то проверяем данные на опечатки
			} else {
				
				// Если "нетто" больше "брутто" или не заполнено, то "нетто" = "брутто"
				if ( d.netto > d.result_time || +d.netto === 0) { d.netto = d.result_time };
				// Если время на 21км подозрительно, то "время на 21км" = "нетто/2"
				if ( d.half_time/d.result_time > 0.6 || d.half_time/d.result_time < 0.3) { d.half_time = d.netto/2 };
				// Если время на 6км подозрительно, то "время на 6км" = "нетто/7"
				if ( d.six_time/d.result_time > 0.2 || d.six_time/d.result_time < 0.09) { d.six_time = d.netto/7 };
			};

			// Вычисление итогового времени в часах
			var h = d.result_time/3600 ^ 0 ;
			var m = (d.result_time-h*3600)/60 ^ 0 ;
			var s = d.result_time-h*3600-m*60 ;
			result_time_string = (h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);

			items[i] = 
						{
				"num": +d.num,
				"birthyear": +d.birthyear,
				"full_name": d.full_name,
				"gender": d.gender,
				"pos": d.pos,
				"gender_pos": d.gender_pos,
				"result_time": +d.result_time,
				"result_time_string": result_time_string,
				"start_time": start_time,
				"end_time": start_time + d.result_time*1000,
				"result_steps": [
					{
						"distance": 0,
						"time": start_time + (d.result_time - d.netto)*1000
					},
					{
						"distance": 6000,
						"time": start_time + d.six_time*1000
					},
					{
						"distance": 21000,
						"time": start_time + d.half_time*1000
					},
					{
						"distance": 42450,
						"time": start_time + d.result_time*1000
					}
				],
				"team": d.team,
				"country": d.country,
				"country_name":d.country_name,
				"region": d.region,
				"city": d.city + add_city_info
			}

		})

		jsondata = {
			"items": items,
			"start_time":start_time,
			"max_time":max_time
		};
		console.log(jsondata);
		d3.select("body").append("p").text(JSON.stringify(jsondata));

	});
};

window.setTimeout(parsedata, 1000);