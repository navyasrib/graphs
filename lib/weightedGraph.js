var graphs = {};

graphs.WeightedGraph = function(){
	this.graph = {};
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex){
		this.graph[vertex] = {};
	},

	addEdge : function(edge){
		if(!this.graph[edge.from])
			this.addVertex(edge.from);
		this.graph[edge.from][edge.to] = [edge];
	},

	shortestPath : function(from,to,visited,allPaths){
		var allPaths = allPaths || [];
		var visited = visited || [];
		if(from == to) 
			return visited;
		for(var index in this.graph[from]){
			if(Object.keys(visited).indexOf(index) == -1){
				var path = this.shortestPath(index,to,visited.concat(this.graph[from][index][0]),allPaths);
				console.log(path,'----')
				if(path[path.length-1].to==to)
					allPaths.push(path);
			}
		}
		return allPaths[0];
	}
};

graphs.Edge = function(edge,from,to,weight){
	this.name = edge;
	this.from = from;
	this.to = to;
	this.weight = weight;
};

var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		g.addEdge(e1);

		var path=g.shortestPath('A','B');
		console.log(1,path.length);
		console.log(e1,path[0]);

module.exports = graphs;