var expect = require('./chai.js').expect;
var PonyDB = require('../ponydb.js');
var g;

before(function(done){
	var db = new PonyDB.GraphDatabase();

	var testData = {
		"graph": {
			"mode":"NORMAL",
			"vertices":[
				{"name":"marko","age":29,"_id":1,"_type":"vertex", "dow":["mon", "tue"], "dob":"1984-05-05", "active":true, "salary":"$120,000", "device":{"qty":3,"mobile":{"phone":["iphone", "samsung"], "tablet":["galaxy"]}}},
				{"name":"vadas","age":27,"_id":2,"_type":"vertex", "dow":["mon", "wed", "thu"], "dob":"1986-03-12", "active":false, "salary":"$100,000", "device":{"qty":1,"mobile":{"phone":["iphone"]}}},
				{"name":"lop","lang":"java","_id":3,"_type":"vertex"},
				{"name":"josh","age":32,"_id":4,"_type":"vertex", "dow":["fri"], "dob":"1981-09-01T00:00:00.000Z", "active":true, "salary":"$80,000", "device":{"qty":2,"mobile":{"phone":["iphone"], "tablet":["ipad"]}}},
				{"name":"ripple","lang":"java","_id":5,"_type":"vertex"},
				{"name":"peter","age":35,"_id":6,"_type":"vertex", "dow":["mon","fri"], "dob":"1978-12-13", "active":true, "salary":"$70,000", "device":{"qty":2,"mobile":{"phone":["iphone"], "tablet":["ipad"]}}}
			],
			"edges":[
				{"weight":0.5,"_id":7,"_type":"edge","_outV":1,"_inV":2,"_label":"knows"},
				{"weight":1.0,"_id":8,"_type":"edge","_outV":1,"_inV":4,"_label":"knows"},
				{"weight":0.4,"_id":9,"_type":"edge","_outV":1,"_inV":3,"_label":"created"},
				{"weight":1.0,"_id":10,"_type":"edge","_outV":4,"_inV":5,"_label":"created"},
				{"weight":0.4,"_id":11,"_type":"edge","_outV":4,"_inV":3,"_label":"created"},
				{"weight":0.2,"_id":12,"_type":"edge","_outV":6,"_inV":3,"_label":"created"}
			]
		}
	};

	db.loadGraphSON(testData).then(function(_g_) {
		g = _g_;
		done();
	});
});

after(function(done){
	g.shutdown();
	done();
});

describe ('emit', function () {
	it ('should not modify the data in the actual ponyDB when results are modified (e.g., pass by value, not reference).', function (done) {
		var vertex = g.v().index(0).emit()[0];
		vertex.name = 'foo';

		expect(g.v().index(0).emit()[0].name).to.equal('marko');
		done();
	});
});
