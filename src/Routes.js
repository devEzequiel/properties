import Home from "./components/Home";
import LoginCriar from "./components/Login/LoginCriar";
import LoginForm from "./components/Login/LoginForm";

const routes = [
    {
    path: '/login',
    component: LoginForm,
    },
    {
    path: '/home',
    component: Home,         
    },
    {
    path: '/criar',
    component: LoginCriar,
    },   
];

export default routes;