<template>
  <svg :width="width" :height="height"></svg>
</template>

<script>
const d3 = require('d3');

export default {
  data() {
    return {
      width: 268,
      height: 268,
      arc: null
    }
  },
  mounted: function() {
    var svg = d3.select(this.$el);
    var width = +svg.attr('width');
    var height = +svg.attr('height');
    var margin = { top:20, left:0, bottom:30, right:0 };
    var chartWidth = width - (margin.left + margin.right);
    var chartHeight = height - (margin.top + margin.bottom);
    this.chartLayer = svg
      .append('g')
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.top})`
      );
    this.arc = d3.arc()
      .outerRadius(chartHeight / 2)
      .innerRadius(chartHeight / 4)
      .padAngle(0.03)
      .cornerRadius(8)
    this.pieG = this.chartLayer
      .append("g")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight / 2})`
      )
    this.drawChart(this.data);
  },
  props: ['data'],
  watch: {
    data: function(newData) {
      this.drawChart(newData);
    }
  },
  methods: {
    drawChart: function(data) {
      const arc = this.arc;
      var arcs = d3.pie()
          .sort(null)
          .value(function(d) { return d.value; })(data)
      var block = this.pieG.selectAll(".arc")
        .data(arcs)
      block.select('path').attr('d', this.arc)
      var newBlock = block
        .enter()
        .append("g")
        .classed("arc", true)
      newBlock.append("path")
        .attr("d", this.arc)
        .attr("id", function(d, i) { return "arc-" + i })
        .attr("stroke", "gray")
        .attr("fill", () => d3.interpolateCool(Math.random()))
      newBlock.append("text")
        .attr("transform", function(d) {                    //set the label's origin to the center of the arc
              return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
          })
        .style("text-anchor", "middle")
        .style("font-size", 20)
        .style("font-weight", 600)
        .text(function(d) {
          console.log(d)
          return d.data.name 
        })
    }
  }
}
</script>
