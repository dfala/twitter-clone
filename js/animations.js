var userName = 'Daniel Falabella';
$('#user-name').text(userName);

// Initially, the Tweet button and the character count button should be hidden (CSS).
$('#tweet-controls').css('display', 'none');

//When the user clicks on the textarea, the textarea should double in size and the character
//count and Tweet buttons should be revealed.

$('#tweet-content textarea').click(function () {
	$(this).css('height', '5em');
	$('#tweet-controls').css('display', 'inherit');
})

//As the user types, the character count should decrease.
$('#tweet-content textarea').keypress(function () {
	var newCount = $(this).val().length + 1;
	$('#char-count').html(newCount);

	//When there are 10 or less characters, the character counter should turn red.
	if((140 - newCount) <= 10) {
		$('#char-count').css('color', 'red');
	}

	//If the user puts in more than 140 characters, the tweet button should be disabled
	if(newCount > 140) {
		$('#tweet-submit').attr('disabled', 'disabled');
	} else {
		//(and re-enabled when there are <= 140 chars).
		$('#tweet-submit').removeAttr('disabled');
	}
})

//When the user successfully inputs characters and clicks the “Tweet” button, a new tweet should
//be created and added to the tweet stream in the main column, using the user’s fake profile image
//in the top left and username/fullname.

$('#tweet-submit').click(function () {
	var newTweet = $('#tweet-content textarea').val();
	postTweet(newTweet);
})

var postTweet = function (tweet) {
	
	var htmlToAdd = '<div class="tweet">' + 
					'<div class="content">' + 
					'<img class="avatar" src="img/alagoon.jpg">' +
					'<strong class="fullname">' + userName + ' </strong>' +
					'<span class="username">@FalabellaDaniel</span>' +
					'<p class="tweet-text">' + tweet + '</p>' +
					'<div class="tweet-actions">' +
								'<ul>' +
									'<li><span class="icon action-reply"></span> Reply&nbsp;</li>' +
									'<li><span class="icon action-retweet"></span> Retweet&nbsp;</li>' +
									'<li><span class="icon action-favorite"></span> Favorite&nbsp;</li>' +
									'<li><span class="icon action-more"></span> More</li>' +
								'</ul>' +
							'</div>' +
					'</div>' + 
					'<div class="stats">' +
						'<div class="retweets">' +
							'<p class="num-retweets">0</p>' +
							'<p>RETWEETS</p>' +
						'</div>' +
						'<div class="favorites">' +
							'<p class="num-favorites">0</p>' +
							'<p>FAVORITES</p>' +
						'</div>' +
						'<div class="users-interact"></div>' +
						'<div class="time">' +
							// '1:04 PM - 19 Sep 13' +
							jQuery.timeago(new Date()) +
						'</div>' +
					'</div>' +
					'<div class="reply">' +
						'<img class="avatar" src="img/alagoon.jpg">' +
						'<textarea class="tweet-compose" placeholder="Reply"></textarea>' +
					'</div>' +
					'</div>'

	$('#stream').prepend(htmlToAdd);
	
	//Reset default values
	resetSteps();
}

var resetSteps = function () {
	actionTweets($('.tweet'), $('.tweet-compose'));
	$('#tweet-content textarea').val('');
	$('#tweet-content textarea').css('height', '2.5em');
	$('#tweet-controls').css('display', 'none');
}

//The tweet actions (Reply, Retweet, etc) should only show up when you hover over that individual
//tweet. Otherwise, they should be hidden.

var actionTweets = function (myTweets, replyTextareas) {
	myTweets
	  .mouseenter(function() {
	    $( this ).find( ".tweet-actions" ).css('visibility', 'inherit');
	  })
	  .mouseleave(function() {
	    $( this ).find( ".tweet-actions" ).css('visibility', 'hidden');
	  })
	  //The Retweets/timestamp/Reply areas should also be hidden by default. These should
	  //only expand if you click on the tweet. Have the students use a jQuery animation to
	  //accomplish the reveal, similar to how it’s done on Twitter.com
	  .on('click', function (e) {
	  	console.log(e);
	  	if ($(this).hasClass('expanded-tweet')) {
	  		$(this).removeClass('expanded-tweet', 150, 'swing');	
	  	} else {
	  		$(this).addClass('expanded-tweet', 150, 'swing');
	  	}
	  });

	//prevent closing when clicking on reply textarea
	$(replyTextareas).click(function (event) {
		event.stopPropagation();
	})
}

actionTweets($('.tweet'), $('.tweet-compose'));


//Make timestamps similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery
//timeago plugin to make them automatic.

//Initiating bootstrap

