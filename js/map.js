var width = 800,
    height = 550;

queue().defer(d3.json, 'maps/zh-mainland-provinces.topo.json')
    .defer(d3.json, 'maps/zh-chn-twn.topo.json')
    .await(drawMap);

var projection = d3.geo.mercator().center([116, 39]).scale(600);
var path = d3.geo.path().projection(projection);

var svg = d3.select('#map').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('preserveAspectRatio', 'xMidYMid')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .append('g')
    .attr('class', 'map');


function drawMap(error, mainland, taiwan) {
    if(!error) {
        drawProvinces(mainland);
        drawTaiwan(taiwan);
    }
}

function drawProvinces(cn) {
    var data = topojson.feature(cn, cn.objects.provinces).features;

    svg.append('g')
        .attr('class', 'mainland')
        .selectAll('path')
        .data(data)
    .enter()
        .append('path')
        .attr('d', path)
        .attr('id', function(d) {
            return d.id;
        })
        .attr('class', 'province')
        .attr('fill', '#ccc')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.35');

    svg.append('g')
        .attr('class', 'label')
        .selectAll('.place-label')
        .data(data)
    .enter().append('text')
        .attr('class', 'place-label')
        .attr('transform', function(d) { return 'translate(' + projection([d.properties.longitude, d.properties.latitude]) + ')'; })
        .attr('dy', '.35em')
        .text(function(d) { return d.properties.name; });
}

function drawTaiwan(tw) {
    var data = topojson.feature(tw, tw.objects.layer1).features.filter(function(d) {
        return d.properties.GU_A3 === 'TWN';
    });

    svg.append('g')
        .attr('class', 'taiwan')
        .selectAll('path')
        .data(data)
    .enter()
        .append('path')
        .attr('d', path)
        .attr('id', function(d) {
            return d.id;
        })
        .attr('class', 'province')
        .attr('fill', '#ccc')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.35');
}

function displayPlace() {
}
