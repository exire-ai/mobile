import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Plans from '../screens/Plans';

const screens = {
  Plans: {
    screen: Plans,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
};

const PlansStack = createStackNavigator(screens, {
  initialRouteName: 'Plans',
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  }
});

export default createAppContainer(Plans);
