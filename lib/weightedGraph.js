var graphs = {};

var totalWeight = function(edges){
	var weight = 0;
	edges.forEach(function(edge){ weight += edge.weight; });
	return weight;
};

graphs.Edge = function(edge,from,to,weight){
	this.name = edge;
	this.from = from;
	this.to = to;
	this.weight = weight;
};

graphs.WeightedGraph = function(){
	this.graph = {};
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = {};
	},

	addEdge : function(edge){
		if(!this.graph[edge.from]) this.addVertex(edge.from);
		this.graph[edge.from][edge.to] = this.graph[edge.from][edge.to] || [edge];
	},

	shortestPath : function(from,to,visited,allPaths){
		var allPaths = allPaths || [];
		var visited = visited || [];
		if(from == to) 
			return visited;
		for(var index in this.graph[from]){
			if(Object.keys(visited).indexOf(index) == -1){
				var path = this.shortestPath(index,to,visited.concat(this.graph[from][index][0]),allPaths);
				if(path[path.length-1].to == to)
					allPaths.push(path);
			}
		}
		return allPaths.sort(function(path1,path2){
			return totalWeight(path1)-totalWeight(path2);
		})[0];
	}
};

module.exports = graphs;