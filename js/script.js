$('#input').keypress(function(event) {
	if(event.keyCode == 13) {
		var val = $(this).val();
		$(this).val('');
		event.preventDefault();

		if(val == '')
			return;

		sendMessage(val)
		
	}
});

$('#input').focus();

// DOM
var $state = $('#state');

// State
var messageID = 0, isTyping = false;

addContent('cisco', "Hi Mitchell! I'm Mirada. It's my pleasure to talk to you.");
replyACC();

function sendMessage(message) {
	addContent('user', message);
	setTimeout(function() {
		showTyping();
		setTimeout(function() { showResponse(messageID, "Of course, let me think for a second.") }, 1500);
	}, 500);
}

function hideTypeing() {
	isTyping = false;
	$state.fadeOut(200);
}

function showTyping() {
	isTyping = true;
	$state.fadeIn(200);
	showTypingAnimation(1);
}

function showTypingAnimation(no) {
	if(!isTyping)
		return;

	var str = 'Mirada is typing ';

	for(var i = 1; i <= no; ++ i)
		str += '.';

	$state.text(str);

	(no == 3 ? no = 1 : ++ no);
	setTimeout(function() { showTypingAnimation(no) }, 300);
}

function showResponse(id, content) {
	hideTypeing();
	addContent('cisco', content);
}

function addContent(source, content) {
	var $message = $('#message');
	$message.append('<div id="message-' + (++messageID) + '" class="message ' + source + '"><div class="avatar"></div><div class="content">' + content + '</div><div class="time">' + getTime() + '</div></div>');
	$message.animate({ scrollTop: $message.prop("scrollHeight")}, 500);
	return messageID;
}

function getTime() {
	var dt = new Date();
	var hour = dt.getHours();
	var min = dt.getMinutes();
	var sec = dt.getSeconds();

	if(hour < 10)
		hour = '0' + hour;

	if(min < 10)
		min = '0' + min;

	if(sec < 10)
		sec = '0' + sec;

	return hour + ":" + min + ":" + sec;
}

// Fixed replies

function replyACC() {
	// var id = addContent('cisco', "Great question! ACC gen 3 is expected to be launched in Q2 of FY17, and I'm finding some useful information for you.");
}
