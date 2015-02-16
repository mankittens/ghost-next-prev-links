/*
 * Ghost Blog: Next & Previous Post Links Javascript Workaround
 *
 * Thanks to GitHub user jyek for the original gist.
 *
 */

 (function ($) {
	var GhostNextPrevLinks = function(){
		var curr,
			$prevLink,
			$nextLink;

		return {

			init: function(){
				curr = $('#curr-post-uuid').html();
				$prevLink = $('.prev-post');
				$nextLink = $('.next-post');

				// hide the links if they're not already hidden
				$prevLink.hide();
				$nextLink.hide();

				this.parseRss();
			},
			// creates previous and next links
		 	createLinks: function(items){
				for (var i = 0, l = items.length; i < l ; i++){
					var uuid = $(items[i]).find('guid').text();

					// if we find our uuid in the pile, look forwards and backwards
					//  for the previous and next link information.
					if (uuid === curr){
						if (i < l-1){
							$prevLink.attr('href', $(items[i+1]).find('link').text());
							$prevLink.html($(items[i+1]).find('title').text());
							$prevLink.slideDown();
						}
						if (i > 0){
							$nextLink.attr('href', $(items[i-1]).find('link').text());
							$nextLink.html($(items[i-1]).find('title').text());
							$nextLink.slideDown();
						}
						// we're done searching through the posts
						break;
					}
				}
			},
			// iteratively parses rss feeds to generate posts object
			parseRss: function(page, items, prevId){
				var self = this,
					page = page || 1,
					items = items || undefined,
					prevId = prevId || '';
				// forming the url with a slash at the end saves us one redirect
				$.get('/rss/' + page + '/', function(data){
					var posts = $(data).find('item'),
						currId;

					if (posts.length > 0)
						currId = $(posts[0]).find('guid').text();

					// ideally, to determine if we've hit the end of the feed, we
					//  might check if we were redirected from, for example, rss/3/ 
					//  to rss/2/, there not being enough posts to populate a page 3. 
					// however, ajax requests are handled transparently by the 
					//  browser, so unless we modify the server, there's no way to 
					//  see if our requests are being redirected.
					// thus, we're left to check the content of each request we make 
					//  and compare it to the last, to see if the results are 
					//  identical.
					if (currId === prevId){
						self.createLinks(items);
					} else {
						items = items ? items.add(posts) : posts;
						prevId = currId;
						self.parseRss(page+1, items, prevId);
					}
				});
			}
		};
	}();

GhostNextPrevLinks.init();
})(jQuery);