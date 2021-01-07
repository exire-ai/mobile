import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Plans from '../screens/Plans';
import Venue from '../screens/venue';
import PlanDetail from '../screens/PlanDetail';
import ProfileIcon from '../components/ProfileIcon';
import * as Calendar from 'expo-calendar';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// Style Imports
import { navigationStyles } from '../global/navigationStyles';
import { shadowStyles } from '../global/shadowStyles';
import plans from '../functions/plans';

const screens = {
    Plans: {
        screen: Plans,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Plans',
                headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
                headerTitleStyle: navigationStyles.headerTitle,
                headerTitleAlign: 'center',
                headerShown: true,
                headerLeft: () => <ProfileIcon navigation={navigation} />
            };
        }
    },
    PlanDetail: {
        screen: PlanDetail,
        navigationOptions: ({ navigation }) => {
            const name = navigation.getParam('plan').title;
            return {
                title: name.length >= 30 ? name.slice(0, 29) + '...' : name,
                headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
                headerTitleStyle: navigationStyles.headerTitle,
                headerTitleAlign: 'center',
                headerShown: true,
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()}
                        style={[navigationStyles.icon]}
                    >
                        <Icon
                            name="chevron-left"
                            color="#FFF"
                            size={32}
                            style={shadowStyles.shadowDown}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={async () => {
                            if (Constants.platform.ios) {
                                const {
                                    status
                                } = await Calendar.requestCalendarPermissionsAsync();
                                // const { status2 } = await Permissions.askAsync(Permissions.REMINDERS);
                                if (
                                    status !==
                                    'granted' /*&& status2 !== 'granted'*/
                                ) {
                                    alert(
                                        'Sorry, we need calendar permissions to make this work!'
                                    );
                                } else {
                                    const plan = navigation.getParam('plan');
                                    plans.getAddress(
                                        plan.ids[0].latitude,
                                        plan.ids[0].longitude,
                                        (data) => {
                                            const eventConfig = {
                                                title: plan.title,
                                                startDate: new Date(
                                                    plan.startUNIX * 1000
                                                ).toISOString(),
                                                endDate: new Date(
                                                    (plan.startUNIX +
                                                        3600 *
                                                            plan.ids.length) *
                                                        1000
                                                ).toISOString(),
                                                location:
                                                    data.results[0]
                                                        .formatted_address,
                                                url:
                                                    'https://app.exire.ai/plan/' +
                                                    plan.planID,
                                                timezone: new Date().getTimezoneOffset(),
                                                notes: plan.description
                                            };
                                            Calendar.getDefaultCalendarAsync().then(
                                                (cal) => {
                                                    // Calendar.getCalendarsAsync().then(cal => {
                                                    Calendar.createEventAsync(
                                                        cal.id,
                                                        eventConfig
                                                    )
                                                        .then((eventInfo) => {
                                                            Alert.alert(
                                                                'Event Created',
                                                                'Added to your ' +
                                                                    cal.source
                                                                        .name +
                                                                    ' calendar!'
                                                            );
                                                        })
                                                        .catch((error) => {
                                                            console.warn(error);
                                                        });
                                                }
                                            );
                                        }
                                    );
                                }
                            }
                        }}
                        style={[navigationStyles.icon]}
                    >
                        <Icon
                            name="calendar"
                            color="#FFF"
                            size={26}
                            style={shadowStyles.shadowDown}
                        />
                    </TouchableOpacity>
                )
            };
        }
    },
    Venue: {
        screen: Venue,
        navigationOptions: () => {
            return {
                headerShown: false
            };
        }
    }
};

const PlansStack = createStackNavigator(screens, {
    initialRouteName: 'Plans'
});

export default createAppContainer(PlansStack);
