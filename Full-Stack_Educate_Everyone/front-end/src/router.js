import Vue from "vue";
import Router from "vue-router";

//must import components used for routes
import Home from "./views/home.vue";
import Course from "./views/courses/course.vue";
import Science from "./views/courses/science.vue";
import English from "./views/courses/english.vue";
import Math from "./views/courses/math.vue";
import CreateCourse from "./views/courses/createCourse.vue";
import ListQuizzes from "./views/quiz/quiz.vue";
import DisplayQuiz from "./views/quiz/generateQuiz.vue";
import CreateQuiz from "./views/quiz/createQuiz.vue";
import RegisterUser from "./views/authenticate/register.vue";
import LoginUser from "./views/authenticate/login.vue";
import Sidebar from "./views/sidebar/sidebar.vue";
import PublishedCourses from "./views/courses/publishedCourses.vue";
import SingleCourse from "./views/courses/singleCourse.vue";
import EditCourse from "./views/courses/editCourse.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: 'Home',
      component:  Home
    },
    {
      path: "/courses",
      name: 'Course',
      component: Course
    },
    {
      path: "/courses/science", 
      name: 'Science',
      component: Science,
      props: true
    },
    {
      path: "/courses/math",
      name: 'Math',
      component: Math,
      props: true
    },
    {
      path: "/courses/english",
      name: 'English',
      component: English,
      props: true
    },
    {
      path: "/courses/create",
      name: 'CreateCourse',
      component: CreateCourse,
    },
    {
      path: "/quizzes",
      name: 'ListQuizzes',
      component: ListQuizzes,
    },
    {
      path: "/quizzes/:id",
      name: 'DisplayQuiz',
      component: DisplayQuiz,
      props: true
    },
    {
      path: "/quizzes/new/create",
      name: 'CreateQuiz',
      component: CreateQuiz,
      props: true
    },{
      path: "/register",
      name: 'RegisterUser',
      component: RegisterUser,
      props: true
    },
    {
      path: "/login",
      name: 'LoginUser',
      component: LoginUser,
      props: true
    },
    {
      path: "/sidebar",
      name: 'Sidebar',
      component: Sidebar,
      props: true
    },
    {
      path: "/courses/published",
      name: 'PublishedCourses',
      component: PublishedCourses,
      props: true
    },
    {
      path: "/courses/published/:id",
      name: 'SingleCourse',
      component: SingleCourse,
      props: true
    },
    {
      path: "/courses/published/edit",
      name: 'EditCourse',
      component: EditCourse,
      props: true
    }

  ]
});
