<template>
  <div>
    <a-modal
      id="modal-center"
      centered
      :title="title"
      ref="modal"
      ok-only
      size="md"
      scrollable
      content-class="modal-stats-content"
    >
      <div class="average-fan">
        <p class="my-4">Average: {{ average }}</p>
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-6 col-6 average-enjoyer border-right">
          <h3> Votes: </h3>
          <div v-if="Object.keys(votes).length === 0">--</div>
          <div v-else v-for="(value, name) in votes" :key="name">{{ name }}: {{ value }}</div>
        </div>
        <div class="col-lg-6 col-sm-6 col-6 average-enjoyer">
          <h3> Distribution: </h3>
          <div v-if="Object.keys(countedMarks).length === 0">--</div>
          <div v-else v-for="(value, name) in countedMarks" :key="name">{{ name }}: {{ value }} {{ voteDescr(value) }}</div>
        </div>
      </div>
      <div class="chart">
        <PieChart
          :data="counterMarksAsList"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PieChart from '@/components/Game/PieChart';

export default defineComponent({
  components: { PieChart },
  data() {
    return {
      width: 200,
      height: 200
    }
  },
  props: {
    stats: Object
  },
  computed: {
    title() {
      return this.stats.title ? this.stats.title : '';
    },
    average() {
      return this.stats.average;
    },
    votes() {
      return this.stats.votes;
    },
    uniqueVotes() {
      return Object.values(this.stats.votes);
    },
    votesAsList() {
      const arr = Object.entries(this.votes)
      return arr.map(a => {
        return {
          name: a[0], value: a[1]
        }
      })
    },
    countedMarks() {
      let counter = {};
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(this.votes)) {
        if (value in counter) {
          counter[`${value}`] += 1;
        }
        else {
          counter[`${value}`] = 1;
        }
      }
      return counter
    },
    counterMarksAsList() {
      const arr = Object.entries(this.countedMarks)
      return arr.map(a => {
        return {
          name: a[0], value: a[1]
        }
      })
    }
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    voteDescr(value) {
      return value == '1' ? 'vote' : 'votes';
    }
  }
});
</script>

<style
  lang="scss"
>

.average-fan {
  font-weight: 800;
  margin: 20px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;

  p {
    font-size: 30px;
  }
}

.modal-stats-content {
  background-color: #fff;
}

.chart {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.average-enjoyer {
  padding-left: 30px;
  font-size: 19px;

  h3 {
    font-weight: 500;
    font-size: 22px;
  }
}

.border-right {
  border-right: 1px solid #dee2e6;
}

</style>
