<template>
  <div>
    <!-- timeup alert -->
    <div v-if="flags.timeUp"
      id="alert-layout">
      <div id="alert-center-layout">
        <h3 id="alert-title">Time up!</h3>
        <div id="alert-button-layout">
          <button class="btn btn-emphasis" @click="clearAlert()">
            Close
          </button>
          <button class="btn" @click="resetTimer()">
            Reset
          </button>
        </div>
      </div>
    </div>
    <!-- timer -->
    <div id="timer-layout">
      <!-- editing message -->
      <h4 id="timer-editing" :class="{'hide': !flags.isEditing}">
        Now Editing...
      </h4>
      <!-- timer body -->
      <div id="timer-number-layout">
        <div>
          <span v-if="!flags.isEditing"
            class="time-number number-hour"
            @click="edit()">
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
            @click="edit()">
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
            @click="edit()">
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
      <div id="timer-button-layout">
        <button v-if="!flags.isStarted"
          class="btn btn-emphasis"
          @click="startTimer()">
          Start
        </button>
        <button v-else
          class="btn btn-emphasis"
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
  title: "TIMER",
  data() {
    return {
      currTime: { hours: "00", minutes: "00", seconds: "00" },
      timeInSecond: 0,
      savedTimeInSecond: 0,
      flags: { isEditing: false, isStarted: false, timeUp: false },
      timerId: null,
    };
  },
  methods: {
    edit() {
      this.flags.isEditing = true;
      this.stopTimer();
      
      const times = this.currTime;
      times.hours = Number(times.hours);
      times.minutes = Number(times.minutes);
      times.seconds = Number(times.seconds);
    },

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

      // translate to 2 digits number
      this.numberToString(this.currTime, this.timeInSecond);
    },

    startTimer() {
      if (this.flags.isStarted) return;

      this.flags.isStarted = true;
      this.flags.isEditing = false;
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
    resetTimer() {
      this.timeInSecond = this.savedTimeInSecond;
      this.clearAlert();
    },
    alertTimer() {
      this.stopTimer();
      this.flags.timeUp = true;
    },
    clearAlert() {
      this.flags.timeUp = false;
    },

    // fill zero for adjust width (ex: 2 -> 02)
    numberToString(currTime, timeInSecond) {
      currTime.hours = this.fillZero(Math.floor(timeInSecond / 3600));
      currTime.minutes = this.fillZero(Math.floor(timeInSecond / 60) % 60);
      currTime.seconds = this.fillZero(timeInSecond % 60);
    },
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
      // translate to 2 digits number
      this.numberToString(this.currTime, this.timeInSecond);
    }
  },
}
</script>

<style lang="scss">
@import '../styles/colors.scss';

/* alert layout */
#alert {
  &-layout {
    display: flex;
    position: fixed;
    width: 100%; height: 100%;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: rgba($colorPrimary, 0.6);
    z-index: 2;

    @include darkMode {
      background-color: rgba($colorDmPrimary, 0.4);
    }
  }

  // center layout
  &-center-layout {
    display: flex;
    width: 32%;
    height: 24%;
    padding: 24px;
    flex-direction: column;
    background-color: $colorBlack;
    color: $colorWhite;
    margin: auto;
    border-radius: 16px;
    box-shadow: 0 0 4px rgba($colorBlack, 0.4);

    @include darkMode {
      background-color: $colorWhite;
      color: $colorBlack;
    }
  }

  &-title {
    font-size: 3.2em;
    text-align: center;
    margin: 8px 0 0 0;
  }

  &-button-layout {
    margin: {
      top: auto;
      bottom: 16px;
    }
    text-align: center;

    .btn {
      box-shadow: none;
      margin: 0 6px;
      font-size: 1.4em;

      &-emphasis {
        margin-right: 16px;
      }
    }
  }
}

.btn {
  color: $colorWhite;
  border-color: $colorWhite;

  &:hover,
  &:active {
    background-color: $colorWhite;
    color: $colorBlack;
  }

  &-emphasis {
    &:hover {
      background-color: $colorAccent;
      border-color: $colorAccent;
      color: $colorWhite;
    }
    &:active {
      background-color: $colorAccent_dark;
      border-color: $colorAccent_dark;
      color: $colorWhite;
    }
  }

  @include darkMode {
    color: $colorBlack;
    border-color: $colorBlack;
    background-color: transparent;
    &:hover,
    &:active {
      background-color: $colorBlack;
      color: $colorWhite;
    }

    &-emphasis {
      color: $colorDmAccent;
      border-color: $colorDmAccent;

      &:hover {
        background-color: $colorDmAccent;
        border-color: $colorDmAccent;
        color: $colorWhite;
      }
      &:active {
        background-color: $colorDmAccent_light;
        border-color: $colorDmAccent_light;
        color: $colorWhite;
      }
    }
  }
}

/* timer */
#timer {
  // timer layout
  &-layout {
    margin: auto;
    text-align: center;
    padding-bottom: 60px;
  }

  // timer editing notification
  &-editing {
    margin: 0 2px;
    text-align: center;
    font-size: 2em;
  }

  // timer button layout
  &-button-layout {
    .btn {
      font-size: 2em;
      border-width: 4px;
    }
  }
}
#timer-number-layout,
input.time-number {
  font-size: 8rem;
  font-family: monospace;
  color: $colorBlack;
  
  @include darkMode {
    color: $colorWhite;
  }
}
#timer-number-layout * {
  display: inline-block;
}
// timer number
.time-number {
  padding: 0;
  box-sizing: border-box;
  border: none;
}
.time-number,
input.time-number {
  width: 1.2em;
  text-align: right;
  background-color: transparent;
}
// editing
input.time-number {
  opacity: 0.5;

  @include darkMode {
    opacity: 0.6;
  }
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
</style>
