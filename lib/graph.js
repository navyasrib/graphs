var graphs = {};

graphs.DirectedGraph = function(){
	this.graph = {};
	this.edges = 0;
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = [];
	},

	addEdge : function(vertex1,vertex2){
		if(!this.graph[vertex1]) addVertex(vertex1)
		this.graph[vertex1].push(vertex2);
		this.edges++;
	},

	hasEdgeBetween : function(vertex1,vertex2){
		return this.graph[vertex1].indexOf(vertex2) >= 0;
	},

	order : function(){
		return Object.keys(this.graph).length;
	},

	size : function(){
		return this.edges;
	},

	pathBetween : function(from,to,visited){
		visited = visited || [];
		if(from == to) return visited.concat(from);
		for(var keys in this.graph[from]){
			var vertex = this.graph[from][keys];
			if(visited.indexOf(from) < 0){
				var result = this.pathBetween(vertex,to,visited.concat(from));
				if(result[result.length-1]==to) return result;
			}
		}
		return [];
	},

	farthestVertex : function(vertex,visited){
		var visited = visited || [];
		for(index in this.graph[vertex])
			if(visited.indexOf(vertex)<0)
				return this.farthestVertex(this.graph[vertex][index],visited.concat(vertex));
		return vertex;
	},

	allPaths : function(from,to,visited,allways){
		var visited = visited || [];
		var allways = allways || [];
		if(from == to) 
			return visited.concat(from);
		for(var key in this.graph[from]){
			var vertex = this.graph[from][key];
			if(visited.indexOf(vertex) < 0){
				var path = this.allPaths(vertex,to,visited.concat(from),allways);
				if(path[path.length-1] == to)
					allways.push(path);
			}
		}
		return allways;
	}

};

graphs.UndirectedGraph = function(){
	this.vertices = [];
	this.edges = {};
	this.allEdges = [];
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.vertices.indexOf(vertex)<0 && this.vertices.push(vertex);
	},

	addEdge : function(vertex1,vertex2){
		this.allEdges.indexOf(vertex1)<0 && this.allEdges.push(vertex1);
		this.vertices.indexOf(vertex1)<0 && this.vertices.push(vertex1);
		this.vertices.indexOf(vertex2)<0 && this.vertices.push(vertex2);
		this.edges[vertex1] = this.edges[vertex1] || [];
		this.edges[vertex1].indexOf(vertex2)<0 && this.edges[vertex1].push(vertex2);
		this.edges[vertex2] = this.edges[vertex2] || [];
		this.edges[vertex2].indexOf(vertex1)<0 && this.edges[vertex2].push(vertex1);
	},

	hasEdgeBetween : function(vertex1,vertex2){
		return this.edges[vertex1].indexOf(vertex2)>=0 || this.edges[vertex2].indexOf(vertex1)>=0;
	},

	order : function(){
		return this.vertices.length;
	},

	size : function(){
		return this.allEdges.length;
	},

	pathBetween : function(from,to,visited){
		visited = visited || [];
		if(from == to) return visited.concat(from);
		for(var keys in this.edges[from]){
			var vertex = this.edges[from][keys];
			if(visited.indexOf(from) < 0){
				var result = this.pathBetween(vertex,to,visited.concat(from));
				if(result[result.length-1]==to) return result;
			}
		}
		return [];
	},

	farthestVertex : function(from,visited){
		var longPath = 0;
		var longPath = this.pathBetween(from,this.vertices[0]);
		for(i=1; i<=this.vertices.length; i++){
			var next = this.pathBetween(from,this.vertices[i]);
			longPath = (longPath.length>next.length) ? longPath : next;
		}
		return longPath[longPath.length-1];
	},

	allPaths : function(from,to,visited,allways){
		visited = visited || [];
		allways = allways || [];
		if(from == to)
			return visited.concat(from);
		for(var keys in this.edges[from]){
			vertex = this.edges[from][keys];
			if(visited.indexOf(vertex) < 0){
				var path = this.allPaths(vertex,to,visited.concat(from),allways);
				if(path[path.length-1] == to)
					allways.push(path);
			}
		}
		return allways;
	}
};

module.exports = graphs;