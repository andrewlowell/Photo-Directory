/*

	Photo Directory
	Lowell Richardson

	To-Do:

		* Add functionality so that when you mouse over a thumbnail, the person's name is displayed.
		* Possibly write a function that calls create_blurb an appropriate number of times and passes appropriate parameters based on the current number of thumbnails in existence.
		* Figure out how to store all of the biography information outside of the stylesheet, script, and main-page files.
		* Maybe also figure out how to automatically append thumbnail divs at $(document).ready using ids from an outside file rather than hardcoding all of that business.
		* Learn PHP and SQL...
		* Rent server space.

*/


// ***** Biography Information.

var biographies = {
robert_crawley: "Earl of Grantham",
cora_crawley: "Countess of Grantham",
violet_crawley: "Dowager Countess of Grantham",
mary_crawley: "Daughter",
edith_crawley: "Daughter",
sybil_crawley: "Daughter",
matthew_crawley: "Heir",
isobel_crawley: "Future Dowager Countess",
mr_carson: "Butler",
mrs_hughes: "Head Maid?",
john_bates: "Baller, Red Hot Lover",
anna_smith: "Baller, Red Hot Lover"
};

var button_apartment = [
'#isobel_crawley',
'#sybil_crawley',
'#mr_carson',
'#edith_crawley',
'#matthew_crawley',
'#mary_crawley',
'#violet_crawley',
'#cora_crawley',
'#robert_crawley',
'#mrs_hughes',
'#anna_smith',
'#john_bates'
];
var button_firstname = [
'#sybil_crawley',
'#cora_crawley',
'#mary_crawley',
'#robert_crawley',
'#anna_smith',
'#isobel_crawley',
'#mrs_hughes',
'#matthew_crawley',
'#john_bates',
'#mr_carson',
'#violet_crawley',
'#edith_crawley'
];
var button_lastname = [
'#isobel_crawley',
'#cora_crawley',
'#mary_crawley',
'#robert_crawley',
'#anna_smith',
'#sybil_crawley',
'#mrs_hughes',
'#matthew_crawley',
'#mr_carson',
'#john_bates',
'#edith_crawley',
'#violet_crawley'
];


// ***** This function parses the id of a thumbnail div and returns a paragraph with that person's name.
var setname = function(id) {
	var name_array = id.split("_");
	function capital(string)
		{
	    	return string.charAt(0).toUpperCase() + string.slice(1);
		}
	name_array[0] = capital(name_array[0]);
	name_array[1] = capital(name_array[1]);
	return "<div class='nametext_container'><p class='nametext'>" + name_array[0] + "<br>" + name_array[1] + "</p></div>";
}

// ***** Main function.
$(document).ready(function() {

	$('#container').sortable();

	$('.thumbnail').on({
		mousedown: function() {
			$('.nametext').remove();
	   		$('.nametext_container').remove();
		},
		mouseenter: function() {
			if ($(this).hasClass('selected_thumbnail') || $('.selected_thumbnail').length === 0) {
				$(this).addClass('hoverable');
				$(setname($(this).attr('id'))).insertAfter(this);
			}
		},
		mouseleave: function() {
			$(this).removeClass('hoverable');
			$('.nametext').remove();
	   		$('.nametext_container').remove();
		},
		click: function() {
			if ($('.blurb').length === 0) {
				var index = $('.thumbnail').index(this);
				var append = index + 3 - (index % 4);
				var $hidden_p = $('<p class="blurb">' + biographies[$(this).attr('id')] + '</p>').hide();
				$($('.thumbnail').get(append)).after($hidden_p);
				$('.blurb').slideDown('500');
				$(this).addClass('selected_thumbnail').siblings('div').addClass('thumbnail_fade');
				$('#container').sortable('disable');
			}
			else if ($(this).hasClass('selected_thumbnail')) {
				$(this).removeClass('selected_thumbnail').siblings('div').removeClass('thumbnail_fade');
				$('.blurb').slideUp('500', function() {$('.blurb').remove();});
				$('#container').sortable('enable');
			}
		}
	});

	$('#button_apartment').on({
		click: function() {
			$(button_apartment[0]).prependTo('#container');
			for (i=0;i<button_apartment.length;i++) {
				$(button_apartment[i]).insertAfter(button_apartment[i-1]);
			}
		}
	});
		$('#button_firstname').on({
		click: function() {
			$(button_firstname[0]).prependTo('#container');
			for (i=0;i<button_firstname.length;i++) {
				$(button_firstname[i]).insertAfter(button_firstname[i-1]);
			}
		}
	});
		$('#button_lastname').on({
		click: function() {
			$(button_lastname[0]).prependTo('#container');
			for (i=0;i<button_lastname.length;i++) {
				$(button_lastname[i]).insertAfter(button_lastname[i-1]);
			}
		}
	});

});
