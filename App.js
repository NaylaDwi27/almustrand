import * as React from 'react';
import { Feed, Home, Profile } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const NavigationArray = [
  { id: 1, route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: Home },
  { id: 2, route: 'Explore', label: 'Explore', type: Ionicons, activeIcon: 'search', inActiveIcon: 'search-outline', component: Feed },
  { id: 3, route: 'Profile', label: 'Profile', type: Ionicons, activeIcon: 'people-circle', inActiveIcon: 'people-circle-outline', component: Profile }
];
export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}