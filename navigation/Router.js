import {
    createRouter
} from '@exponent/ex-navigation'

import AskScreen from '../screens/AskScreen'
import HomeScreen from '../screens/HomeScreen';
import JobScreen from '../screens/JobScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
    home: () => HomeScreen,
    job: () => JobScreen,
    ask: () => AskScreen,
    rootNavigation: () => RootNavigation
}))