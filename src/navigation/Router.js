import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feed, AlatPopulerDetail, Home, Profile, AddFeedForm, EditFeedForm, SplashScreen, Register, Login } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NavigationArray = [
  { id: 1, route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: Home },
  { id: 2, route: 'Explore', label: 'Explore', type: Ionicons, activeIcon: 'search', inActiveIcon: 'search-outline', component: Feed },
  { id: 3, route: 'Profile', label: 'Profile', type: Ionicons, activeIcon: 'people-circle', inActiveIcon: 'people-circle-outline', component: Profile }
];
function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'black',
          elevation: 0,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopEndRadius: 20,
          borderColor: 'black',
          borderWidth: 2,
        },

      })}
    >
      {NavigationArray.map((item, index) => {
        return (
          <Tab.Screen key={item.id} name={item.route} component={item.component}
            options={{
              tabBarIcon: ({ color, focused, size }) => {
                return <Ionicons
                  name={focused ? item.activeIcon : item.inActiveIcon}
                  size={size}
                  color={color}
                />
              },
              tabBarActiveTintColor: 'rgba(255, 195, 11, 1)',
              tabBarInactiveTintColor: 'white',
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlatPopulerDetail"
        component={AlatPopulerDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddFeed"
        component={AddFeedForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditFeed"
        component={EditFeedForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Router;