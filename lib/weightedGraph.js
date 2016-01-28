var ld = require('lodash');
var graphs = {};

var findCurrentVertexToCheck = function(distances,vertices){
	var vertexToBeCheck = Object.keys(distances).sort(function(element1,element2){
		return distances[element1] - distances[element2];
	});
	return (vertices.indexOf(vertexToBeCheck[0])<0)? vertexToBeCheck[1] : vertexToBeCheck[0];
};

var removeCheckedVertex = function(vertices,vertex){
	return vertices.filter(function(element){ return element != vertex; });
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
		this.graph[edge.to][edge.from] = this.graph[edge.to][edge.from] || [edge];
	},

	findShortestPaths : function(source){
		var vertices = Object.keys(this.graph);
		var distances = {}, parent = {};
		parent[source] = source;
		vertices.forEach(function(vertex){
			distances[vertex] = (vertex == source)? 0:Infinity;
		});
		while(vertices.length != 1){
			var vertex = findCurrentVertexToCheck(distances,vertices);
			for(var key in this.graph[vertex]){
				var edge = this.graph[vertex][key][0];
				preDistance = distances[key];
				postDistance = distances[vertex] + edge.weight;
				if(postDistance<preDistance){
					distances[key] = postDistance;
					parent[key] = vertex;
				}
			}
			vertices = removeCheckedVertex(vertices,vertex);
		}
		return parent;
	},

	shortestPath : function(source,destination){
		var parent = this.findShortestPaths(source);
		var path = [destination], result = [], paths = [];
		while(source!=destination){
			path.unshift(parent[destination]);
			destination = parent[destination];
		}
		for(var i in path){
			var temp = [];
			for(var j in this.graph[path[i]])
				temp.push(this.graph[path[i]][j])
			temp = ld.flatten(temp);
			result.push(temp);
		}
		result = ld.flatten(result);
		for(i=1; i<path.length; i++){
			var edgesOfPath = ld.find(result,{'from':path[i-1], to:path[i]});
			paths.push(edgesOfPath);
		}
		return paths;
	}
};

module.exports = graphs;