import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/home/DashboardScreen';
import ProviderSearchScreen from '../screens/providers/ProviderSearchScreen';
import ProviderDetailsScreen from '../screens/providers/ProviderDetailsScreen';
import ClaimListScreen from '../screens/claims/ClaimListScreen';
import ClaimFormScreen from '../screens/claims/ClaimFormScreen';
import RoiListScreen from '../screens/roi/RoiListScreen';
import RoiCreateScreen from '../screens/roi/RoiCreateScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProvidersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProviderSearch" component={ProviderSearchScreen} options={{ title: 'Providers' }} />
      <Stack.Screen name="ProviderDetails" component={ProviderDetailsScreen} options={{ title: 'Provider Details' }} />
    </Stack.Navigator>
  );
}

function ClaimsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClaimList" component={ClaimListScreen} options={{ title: 'Claims' }} />
      <Stack.Screen name="ClaimForm" component={ClaimFormScreen} options={{ title: 'Submit Claim' }} />
    </Stack.Navigator>
  );
}

function RoiStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RoiList" component={RoiListScreen} options={{ title: 'ROI' }} />
      <Stack.Screen name="RoiCreate" component={RoiCreateScreen} options={{ title: 'Create ROI' }} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Providers') iconName = 'search';
          else if (route.name === 'Claims') iconName = 'document-text';
          else if (route.name === 'ROI') iconName = 'document';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Providers" component={ProvidersStack} />
      <Tab.Screen name="Claims" component={ClaimsStack} />
      <Tab.Screen name="ROI" component={RoiStack} />
    </Tab.Navigator>
  );
}
