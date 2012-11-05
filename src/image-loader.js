IL = (function(){

	var C = function(path, callback){
		this.imgs = [];
		this.loader = [];
		this.clbks = [];
		if (path)
			this.load(path, callback);
	};

	C.prototype={
		load: function(path, callback) {
			if (typeof path === "string") {
				this.addCallback(path, callback);
				if (this.isLoaded(path)) {
					this.runCallbacks(path);
				} else {
					if (!this.isLoading(path)) {
						this.setLoading(path);
						var img = new Image();
						img.src = path;
						var THIS = this;
						img.onload = function(){
							THIS.setLoaded(path);
							THIS.setImg(path, img);
							THIS.runCallbacks(path);	
						};
						return true;
					}
				}
			} else return false;
		},
		setImg: function(path, img) {
			this.imgs[path] = img;
			return true;
		},
		getImg: function(path) {
			return this.imgs[path];
		},
		setLoading: function(path) {
			this.loader[path] = 0;
			return true;
		},
		isLoading: function(path) {
			return (this.loader[path] === 0);
		},
		setLoaded: function(path) {
			this.loader[path] = 1;
			return true;
		},
		isLoaded: function(path) {
			return (this.loader[path] === 1);
		},
		addCallback: function(path, callback) {
			if (callback) {
				if (!this.clbks[path])
					this.clbks[path] = [];
				this.clbks[path].push(callback);
				return true;
			} else return false;
		},
		runCallbacks: function(path) {
			var c = this.clbks[path], l = c.length;
			for (var i=l; i>0; i-=1) {
				c[0](this.getImg(path));
				c.shift();
			}
			delete this.clbks[path];
			return true;
		}
	};

	return C;

}());