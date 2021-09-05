<template>
  <svg
    :width='width'
    :height='height'
  ></svg>
</template>

<script lang='ts'>
/* eslint-disable */
// @ts-nocheck
import { defineComponent } from 'vue';

const d3 = require('d3');

export default defineComponent({
  data() {
    return {
      width: 268,
      height: 268,
      arc: null,
    };
  },
  mounted() {
    const svg = d3.select(this.$el);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {
      top: 20, left: 0, bottom: 30, right: 0,
    };
    const chartWidth = width - (margin.left + margin.right);
    const chartHeight = height - (margin.top + margin.bottom);
    this.chartLayer = svg
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left}, ${margin.top})`,
      );
    this.arc = d3.arc()
      .outerRadius(chartHeight / 2)
      .innerRadius(chartHeight / 4)
      .padAngle(0.03)
      .cornerRadius(8);
    this.pieG = this.chartLayer
      .append('g')
      .attr(
        'transform',
        `translate(${chartWidth / 2}, ${chartHeight / 2})`,
      );
    this.drawChart(this.data);
  },
  props: ['data'],
  watch: {
    data(newData) {
      this.drawChart(newData);
    },
  },
  methods: {
    drawChart(data) {
      const { arc } = this;
      const arcs = d3.pie()
        .sort(null)
        .value((d) => d.value)(data);
      const block = this.pieG.selectAll('.arc')
        .data(arcs);
      block.select('path').attr('d', this.arc);
      const newBlock = block
        .enter()
        .append('g')
        .classed('arc', true);
      newBlock.append('path')
        .attr('d', this.arc)
        .attr('id', (d, i) => `arc-${i}`)
        .attr('stroke', 'gray')
        .attr('fill', () => d3.interpolateCool(Math.random()));
      newBlock.append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`) // set the label's origin to the center of the arc
      // this gives us a pair of coordinates like [50, 50]
        .style('text-anchor', 'middle')
        .style('font-size', 20)
        .style('font-weight', 600)
        .text((d) => d.data.name);
    },
  },
});
</script>
