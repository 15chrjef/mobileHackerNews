import {
    createRouter
} from '@exponent/ex-navigation'

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
    home: () => HomeScreen,
    about: () => AboutScreen,
    rootNavigation: () => RootNavigation
}))