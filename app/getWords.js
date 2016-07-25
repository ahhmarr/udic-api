var url='http://www.urbandictionary.com/popular.php?character=';
var unirest=require('unirest');
var jsdom=require('jsdom');
var getDef=require('./getDef');
var Q=require('q');
module.exports={
	fetchWord :function(){
		var defer=Q.defer();
		var char=getRandomCharacter();
		jsdom.env({
			url : url+char,
			scripts :["http://code.jquery.com/jquery.js"],
			done :function(err,window)
			{
				if(err){
					defer.reject(err);
					return;
				}
				var $=window.$;
				var word=getWord($);
				getDef.getDef(word).then(function(resp)
				{
					defer.resolve({word:word,def:resp});
				}).catch(function(err)
				{
					defer.reject(err);
				});
				
			}
		})
		return defer.promise;

	}
}
function getWord($)
{
	var length=$('.popular').length;
	var randomIndex= Math.round((Math.random()*length)+1);
	return $('.popular').eq(randomIndex).html();
}
function getRandomCharacter(){
	return String.fromCharCode(96+(Math.round(Math.random()*27)+1))
				.toUpperCase();
}