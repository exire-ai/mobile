import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Chats from '../screens/Chats';

const screens = {
  Chats: {
    screen: Chats,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
};

const ChatsStack = createStackNavigator(screens, {
  initialRouteName: 'Chats',
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  }
});

export default createAppContainer(ChatsStack);
