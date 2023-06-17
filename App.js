import {CocktailStackNavigator} from "./navigation/CockatilStackNavigator";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer>
            <CocktailStackNavigator/>
        </NavigationContainer>
    );
}

