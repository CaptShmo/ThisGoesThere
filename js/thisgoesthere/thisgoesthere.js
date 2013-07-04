!function($){

window.ThisGoesThere = function(name, params){
		
		var settings = {
			
			name: name,
			
			wrapperOpen: '<div>',
			wrapperClose: '</div>',
			
			zebra: true,
			zebraEven: 'even',
			zebraOdd: 'odd',
			
			position: true,
			positionFirst: 'first',
			positionLast: 'last',
			positionMid: 'mid',
			
			index: true,
			indexBase: 1,
			indexPrefix: name + '-',
			
			additionalCSSClasses: undefined,
			allowEmptyWrapper: false,
			
			children: undefined
			
		};
		
		for(var key in params){
			if(settings.hasOwnProperty(key)){
				settings[key] = params[key];
			}
		}
		
		var name = settings.name;
		
		var children = (typeof settings.children !== "undefined") ? settings.children : [];
		
		this.append = function(item){
			children.push(item);
		}
		
		this.print = function(){
			
			var output = '';
			var len = children.length;
			
			if(len > 0 || settings.allowEmptyWrapper == true){
			
				var o = '';
				var $o = null;
				var i = 0;
	
				var child = null;
				var base = settings.indexBase;
	
				for(i; i < len; i++){
			
					o = settings.wrapperOpen;
					
					child = children[i];
					
					if(child instanceof ThisGoesThere){
						o += child.print();
					}else{
						o += child.toString();
					}
					
					o += settings.wrapperClose;	
					
					$o = $(o);
					
					if(settings.index) $o.addClass(settings.indexPrefix + base);
					
					if(settings.zebra){
					
						var isEven = ((i + 1) % 2 == 0);
						
						if(isEven){
							$o.addClass(settings.zebraEven)
						}else{
							$o.addClass(settings.zebraOdd);
						}
						
					}
					
					if(settings.position){
	
						if(i == 0){
							$o.addClass(settings.positionFirst);
						}else if(i == len - 1){
							$o.addClass(settings.positionLast);
						}else{
							$o.addClass(settings.positionMid);	
						}
					
					}
					
					if(typeof settings.additionalCSSClasses !== "undefined") $o.addClass(settings.additionalCSSClasses);
					
					base++;
				
					output += $o[0].outerHTML;
				
				}
		
			}
			
			return output;
			
		}
		
		this.length = function(){
			return children.length;
		}
		
		
	}
}(jQuery);