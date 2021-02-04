<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">题目{{ itemNum }}</span>
      </header>
      <!-- 返回上一题 -->
      <span class="back" @click="backLast" v-if="itemNum > 1">
        返回上一题
      </span>
      <!-- 题目内容 -->
      <div class="item_back item_container_style" v-if="questions.length > 0">
        <div class="item_list_container">
          <!-- 题干 -->
          <header class="item_title">
            {{ questions[itemNum - 1].topic_name }}
          </header>
          <!-- 选项 -->
          <ul>
            <li
              class="item_list"
              v-for="(item, index) in questions[itemNum - 1].topic_answer"
              :key="item.topic_answer_id"
              @click="chooseAnswer(item.topic_id, item.topic_answer_id)"
            >
              <!-- ABCD -->
              <span
                class="option_style"
                :class="{
                  has_choosed: answers[item.topic_id] == item.topic_answer_id
                }"
                >{{ String.fromCharCode(index + 65) }}</span
              >
              <!-- 选项内容 -->
              <span class="option_detail">
                {{ item.answer_name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <span
        class="next_item button_style"
        v-if="itemNum < questions.length"
        @click="nextQuestion(questions[itemNum - 1].topic_id)"
      ></span>
      <span
        class="submit_item button_style"
        v-else
        @click="submitAnswers(questions[itemNum - 1].topic_id)"
      ></span>
    </section>
  </div>
</template>

<script>
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";
// 导入路由
import { useRouter } from "vue-router";

export default {
  setup() {
    // 使用共享库
    let store = useStore();
    // 使用路由
    let router = useRouter();

    // 获取数据
    store.dispatch("getDatas");

    // 头部标签
    let itemNum = computed(() => store.state.itemNum);

    // 获取题目
    //（对于共享库中拿来的复杂类型数据，本身就是proxy对象，如果我们只是改变proxy对象内部的键值对，依然可以实现响应式，页面中的数据可以响应式变化，
    // 但是proxy对象本身没有被响应式监听
    // 所以当我们给共享库中的复杂类型（对象/数组）整体重新赋值时 `obj = newObj`，页面中的数据不会变化（因为页面中的数据是之前proxy对象）
    // 所以最好还是用computed将共享库拿来的复杂类型数据本身也监测起来）
    let questions = computed(() => store.state.questions);

    // 获取记录答案
    let answers = computed(() => store.state.answers);

    //#region 点击选择答案（记录答案）
    function chooseAnswer(topic_id, topic_answer_id) {
      store.commit("recordAnswers", { topic_id, topic_answer_id });
    }
    //#endregion

    //#region 点击到下一题
    function nextQuestion(topic_id) {
      if (answers.value[topic_id]) {
        store.commit("addItemNum");
      } else {
        alert("您还没有选择本题答案");
      }
    }
    //#endregion

    //#region 点击返回上一题
    function backLast() {
      store.commit("backLast");
    }
    //#endregion

    //#region 点击提交
    function submitAnswers(topic_id) {
      if (answers.value[topic_id]) {
        // 统计正确答案
        let rightAnswers = {};
        questions.value.forEach(question => {
          question.topic_answer.forEach(answer => {
            if (answer.is_standard_answer == 1) {
              rightAnswers[answer.topic_id] = answer.topic_answer_id;
            }
          });
        });
        // 比对答案
        for (const key in rightAnswers) {
          if (rightAnswers[key] == answers.value[key]) {
            store.commit("addScore", 100 / questions.value.length);
          }
        }
        // 跳转分数页
        router.push("/score");
      } else {
        alert("您还没有选择本题答案");
      }
    }
    //#endregion

    // 返回
    return {
      itemNum,
      questions,
      chooseAnswer,
      answers,
      nextQuestion,
      submitAnswers,
      backLast
    };
  }
};
</script>

<style lang="scss">
.back {
  position: absolute;
  display: block;
  color: #ffd400;
  top: 3.7rem;
  left: 1.6rem;
  font-size: 0.8rem;
  // border: 1px solid #ffd400;
  background-color: transparent;
  z-index: 1;
}

.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.next_item {
  background-image: url("/images/2-2.png");
}

.submit_item {
  background-image: url("/images/3-1.png");
}

.item_back {
  background-image: url("/images/2-1.png");
  background-size: 100% 100%;
}

.item_title {
  font-size: 0.65rem;
  color: #fff;
  line-height: 0.7rem;
}

.item_list_container {
  margin: 2.5rem;
  padding: 0;
}

.item_list {
  font-size: 0;
  margin-top: 0.4rem;
  width: 10rem;
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: #fff;
    vertical-align: middle;
  }
  .option_style {
    height: 0.725rem;
    width: 0.725rem;
    border: 1px solid #fff;
    border-radius: 50%;
    line-height: 0.725rem;
    text-align: center;
    margin-right: 0.3rem;
    font-size: 0.5rem;
    font-family: "Arial";
  }
  .has_choosed {
    background-color: #ffd400;
    color: #575757;
    border-color: #ffd400;
  }
  .option_detail {
    width: 7.5rem;
    padding-top: 0.11rem;
  }
}
</style>
