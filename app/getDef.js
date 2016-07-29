var url='http://www.urbandictionary.com/define.php?term=';
var jsdom=require('jsdom');
var getDef=require('./getDef');
var Q=require('q');
module.exports={
	getDef :function(word){
		var defer=Q.defer();
		jsdom.env({
			url : url+word,
			scripts :["http://code.jquery.com/jquery.js"],
			done :function(err,window)
			{
				if(err){
					console.log(err);
					return;
				}
				var $=window.$;
				var def=$('.meaning').html();
				console.log(def);
				if(def){
					def=def.trim();
					defer.resolve(def);
				}else{
					defer.reject('some error im fetching definition');
				}
			}
		})
		return defer.promise;
	}
}
