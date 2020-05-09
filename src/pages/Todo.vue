<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <ul class="todo-list-layout">
      <!-- input -->
      <li class="todo-list-item todo-adder">
        <input
          class="todo-list-item-adder_input"
          placeholder="Please enter in here.."
          @keyup.enter="pushTodo()">
      </li>
      <!-- list -->
      <li v-for="todo in todoArr" :key="todo.id"
        class="todo-list-item"
        @click="todo.isEditing = true;">
        <div>
          <span v-if="!todo.isEditing">
            {{ todo.content }}
          </span>
          <input v-else
            class="todo-list-item-adder_input"
            v-model.lazy="todo.content"
            @keyup.enter="updateTodo(todo)"
            @blur="updateTodo(todo)">
        </div>
        <span v-if="!todo.isEditing"
          class="todo-elapsed">
          {{ todo.elapsed }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'todo-page',
  data() {
    return {
      title: "TODO",
      todoArr: [{
        id: -1,
        content: "apple",
        written: Date.now(),
        elapsed: this.convertToDate(Date.now()),
        isEditing: false,
        timerId: null,
      }],
      todoId: 0,
      nowDate: Date.now(),
    };
  },

  created() {
    const self = this;

    // set timer for Date object
    setInterval(() => self.nowDate = Date.now(), 1000);

    // set timer for elapsed time
    self.todoArr.forEach((todo) => {
      todo.timerId = setInterval(() => {
        todo.elapsed = self.nowDate - todo.written;
      });
    }, 1000);
  },

  methods: {
    pushTodo() {
      const self = this;

      let newTodo = {
        id: self.todoId++,
        content: event.target.value,
        written: this.nowDate,
        elapsed: this.convertToDate(this.nowDate),
        isEditing: false,
        timerId: null,
      }
      self.todoArr.push(newTodo);
      // setInterval(() => {
      //   newTodo.elapsed = self.convertToElapsed(newTodo.written);
      // }, 1000);
    },
    
    updateTodo(todo) {
      todo.isEditing = false;
    },

    convertToElapsed(time) {
      let elapsed = this.nowDate - time;
      let postfix;
      
      if (elapsed < 60000) {
        elapsed = Math.floor(elapsed / 1000);
        postfix = "sec";
      }
      else if (elapsed < 3600000) {
        elapsed = Math.floor(elapsed / 60000);
        postfix = "min";
      }
      else if (elapsed < 86400000) {
        elapsed = Math.floor(elapsed / 3600000);
        postfix = "hour";
      }
      else {
        elapsed = Math.floor(elapsed / 86400000);
        postfix = "day";
      }

      if (elapsed > 1) postfix += "s";

      return `in ${elapsed + postfix} before`;
    },
    convertToDate(time) {
      let date = new Date(time);
      const year = date.getFullYear();
      const month= Number(date.getMonth())+1;
      const day  = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      return `written in ${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/_colors.scss';

#title {
  text-align: center;
  font-size: 2.8rem;
}

.todo-list {
  // layout
  &-layout {
    list-style: none;
    margin: auto;
    padding-left: 0;
  }

  &-item {
    &-adder {
      &_input {
        border: none;
        font-size: 1em;
      }
    }

    padding: 12px 8px;
    display: flex;
    background-color: $colorWhite;
    margin: 8px 4px;
    border: 1px solid $colorPrimaryDark;
    box-shadow: 3px 3px 0px 1px $colorPrimaryDark;
  }
}


/* todo item */
.todo-item,
.todo-item input {
  min-width: 2em;
  max-width: 20em;
  box-sizing: border-box;
}
.todo-elapsed {
  margin-left: auto;
  opacity: 0.5;
  font-size: 0.8em;
}
.todo-elapsed {
  margin: auto 0 auto auto;
}
</style>
