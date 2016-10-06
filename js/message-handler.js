var mh = {
	sendMessage: function(message) {
		$.get('http://mirada.localtunnel.me/', {
			message: message
		}, function(data) {
			showResponse(this.processData(data));
		}.bind(this), 'json');
	},

	processData: function(data) {
		var str = '';

		if(data.table != undefined) {
			str += '<div class="table">';

			for(var i in data.table) {
				var element = data.table[i];

				str += '<div class="row">';
				str += '<div class="title">' + element.type + '</div><div class="content">';

				if(element.type == 'progress') {
					str += '<div class="progress">';
					str += '<div class="bar"><div class="fill"></div></div><div class="text">' + (element.value * 100) + '%</div>';
					str += '</div>';
				}

				if(element.type == 'file') {
					str += '<div class="file">';
						str += '<div class="icon ' + element.extension + '"></div><div class="details">';
							str += '<div class="title">' + element.filename + '.' + element.extension + '</div><div class="download"></div>';
						str += '</div>';
					str += '</div>';
				}

				if(element.type == 'link') {
					str += '<a href="' + element.value + '">' + element.value + '</a>';
				}

				if(element.type == 'person') {
					for(var j in element.value) {
						var person = element.value[j];

						str += '<div class="namecard">';
						str += '\
							<div class="subtitle">' + person.title + '</div>\
							<div class="entry">' + person.name + '</div>\
							<div class="entry"><a href="#">' + person.email + '</a></div>\
							<div class="entry">' + person.address + '</div>\
							<div class="entry">' + person.phone + '</div>\
							<div class="avatar ' + person.id + '"></div>\
						';
						str += '</div>';
					}
				}

				str += '</div>';
				str += '</div>';
			}

			str += '</div>';
		}

		str += data.message;

		return str;
	}
};