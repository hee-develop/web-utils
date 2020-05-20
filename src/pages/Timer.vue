<template>
  <div>
    <!-- timeup alert -->
    <div v-if="flags.timeUp"
      id="alert-layout">
      <div>
        <h3 id="alert-title">Time up!</h3>
        <button class="btn btn-emphasis" @click="flags.timeUp = false;">
          Close
        </button>
        <button class="btn">
          Reset
        </button>
      </div>
    </div>
    <!-- title -->
    <h1>{{ title }}</h1>
    <!-- timer -->
    <div id="timer-layout">
      <!-- editing message -->
      <h4 id="noti-editing" :class="{'hide': !flags.isEditing}">
        Now Editing...
      </h4>
      <!-- timer body -->
      <div id="curr-time">
        <div>
          <span v-if="!flags.isEditing"
            class="time-number number-hour"
            @click="flags.isEditing = true;">
            {{ currTime.hours }}
          </span>
          <input v-else
            class="time-number number-hour"
            type="number" max="23" min="0"
            v-model="currTime.hours"
            @keyup.enter="closeEdit()"
            @blur="closeEdit()">
        </div>
        <span>:</span>
        <div>
          <span v-if="!flags.isEditing"
            class="time-number number-minute"
            @click="flags.isEditing = true;">
            {{ currTime.minutes }}
          </span>
          <input v-else
            class="time-number number-minute"
            type="number" max="59" min="0"
            v-model="currTime.minutes"
            @keyup.enter="closeEdit()"
            @blur="closeEdit()">
        </div>
        <span>:</span>
        <div>
          <span v-if="!flags.isEditing"
            class="time-number number-second"
            @click="flags.isEditing = true;">
            {{ currTime.seconds }}
          </span>
          <input v-else
            class="time-number number-second"
            type="number" max="59" min="0"
            v-model="currTime.seconds"
            @keyup.enter="closeEdit()"
            @blur="closeEdit()">
        </div>
      </div>
      <div id="button-layout">
        <button v-if="!flags.isStarted"
          class="btn btn-emphasis"
          @click="startTimer()">
          Start
        </button>
        <button v-else
          class="btn emphasis"
          @click="stopTimer()">
          Stop
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer-page',
  data() {
    return {
      title: "TIMER",
      currTime: { hours: "00", minutes: "00", seconds: "00" },
      timeInSecond: 0,
      savedTimeInSecond: 0,
      flags: { isEditing: false, isStarted: false, timeUp: false },
      timerId: null,
    };
  },
  methods: {
    // update time value when editor disabled
    closeEdit() {
      if (!this.flags.isEditing) return;
      if (event.relatedTarget &&
        event.relatedTarget.className.indexOf("time-number") != -1)
        return;

      // limit time values
      const times = this.currTime;
      if (times.hours > 23) times.hours = 23;
      if (times.minutes > 59) times.minutes = 59;
      if (times.seconds > 59) times.seconds = 59;


      this.timeInSecond = Number(times.hours * 3600) +
                          Number(times.minutes * 60) +
                          Number(times.seconds);
      this.flags.isEditing = false;
      this.flags.isStarted = false;
      this.flags.timeUp = false;
    },

    startTimer() {
      if (this.flags.isStarted) return;

      this.flags.isStarted = true;
      this.flags.timeUp = false;
      this.savedTimeInSecond = this.timeInSecond;
      this.timeInSecond--;
      this.timerId = setInterval(() => --this.timeInSecond, 1000);
    },
    stopTimer() {
      if (!this.timerId || !this.flags.isStarted) return;

      clearInterval(this.timerId);
      this.timerId = null;
      this.flags.isStarted = false;
    },
    alertTimer() {
      this.stopTimer();
      this.flags.timeUp = true;
    },

    // fill zero for adjust width (ex: 2 -> 02)
    fillZero(number) {
      const zeroAndNumber = Array(2).join('0') + number;
      return zeroAndNumber.slice(-2);
    },
  },
  watch: {
    // calculate time value and stop when time is 0
    timeInSecond() {
      if (this.timeInSecond < 0) {
        this.alertTimer();
        return;
      }

      this.currTime.hours = this.fillZero(Math.floor(this.timeInSecond / 3600));
      this.currTime.minutes = this.fillZero(Math.floor(this.timeInSecond / 60) % 60);
      this.currTime.seconds = this.fillZero(this.timeInSecond % 60);
    }
  },
}
</script>

<style lang="scss">
@import '../styles/colors.scss';
@import '../styles/global.scss';

/* alert layout */
#alert {
  &-title {
    font-size: 2.4em;
    text-align: center;
  }

  &-layout {
    display: flex;
    position: absolute;
    width: 100%; height: 100%;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: rgba($colorPrimary, 0.6);
    color: $colorAccent;
    z-index: 2;

    // center layout
    > div {
      margin: auto;
    }

    .btn {
      box-shadow: none;
      margin: 0 6px;
    }
  }
}

/* timer */
#timer-layout {
  margin: auto auto 50% auto;
  text-align: center;
}
#curr-time,
input.time-number {
  font-size: 4rem;
  font-family: monospace;
}
#curr-time * {
  display: inline-block;
}
.time-number {
  padding: 0;
  box-sizing: border-box;
  border: none;
}
.time-number,
input.time-number {
  width: 1.2em;
  text-align: center;
}
input.time-number {
  opacity: 0.5;
}
/* hide spinner button in input */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* for firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* editing notification */
#noti-editing {
  margin: 0 2px;
  text-align: center;
}
</style>
