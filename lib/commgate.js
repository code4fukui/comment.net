var Commgate = function(cid) {
	return {
//		baseurl: "http://localhost:8080/commgate/1/",
		baseurl: "http://sabae.club/commgate/1/",
		cid: cid, //"circleshare",
		post: function(data) {
			if (this.uid == null)
				this.uid = (Math.random() * 1000000) >> 0;
			var url = this.baseurl + "post.json";
			url += "?cid=" + this.cid;
			url += "&uid=" + this.uid;
			url += "&data=" + encodeURIComponent(data);
			jsonp(url);
		},
		get: function(callback) {
			var comm = this;
			jsonp(this.baseurl + "get.json?cid=" + this.cid + "&callback=" + getCallbackMethod(function(org) {
//			dump(org);
				comm.decode(org);
				callback(org);
			}));
		},
		clear: function() {
			jsonp(this.baseurl + "clear.json?cid=" + this.cid);
		},
		decode: function(org) {
			var data = {};
			for (var d in org) {
				var org2 = org[d];
				for (var d2 in org2) {
					org2[d2] = decodeURIComponent(org2[d2]);
				}
				data[d] = org2;
			}
		},
	};
};
