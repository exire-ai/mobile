import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Discover from '../screens/Discover';

const screens = {
  Discover: {
    screen: Discover,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  }
};

const DiscoverStack = createStackNavigator(screens, {
  initialRouteName: 'Discover',
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  }
});

export default createAppContainer(DiscoverStack);
