import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from "../screens/SearchScreen";
import CocktailListScreen from "../screens/CocktailListScreen";
import CocktailDetailScreen from "../screens/CocktailDetailScreen";

const Stack = createStackNavigator();

export function CocktailStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchScreen" component={SearchScreen}/>
            <Stack.Screen name="CocktailListScreen" component={CocktailListScreen}/>
            <Stack.Screen name="CocktailDetailScreen" component={CocktailDetailScreen}/>
        </Stack.Navigator>
    );
}