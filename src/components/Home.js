import { Switch, Link } from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes';

// Notice how we are passing routes here 
const Home = ({ routes }) => {
    const menu = [
    {
        path: '/home', // the url
        name: 'Home', // name that appear in Sidebar
    }
    ];
    return (
    <div className='home'>
    
    </div>
    );
};

export default Home;