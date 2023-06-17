import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";

export default function CocktailListScreen(props) {
    const {navigation, route} = props
    const ingredient = route.params.searchText
    const [data, setData] = useState([]);

    const getDrinks = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const drinks = await response.json();
            setData(drinks.drinks)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDrinks();
    }, []);

    const searchText = route.params.searchText
    return <View>
        <Text style={[styles.text, {fontSize: 24}]}>Ingredient: {searchText}</Text>
        <FlatList
            data={data}
            keyExtractor={(item) => item.idDrink}
            renderItem={({item, index}) => (
                <TouchableOpacity
                    key={item.idDrink}
                    style={[styles.item, {backgroundColor: "rgb(255,255,255)"}]}
                    onPress={() => navigation.navigate('CocktailDetailScreen', {item: item})}
                >
                    <Image source={{uri: item.strDrinkThumb}} style={{height: 45, width: 45}}/>
                    <Text style={styles.text}>{item.strDrink}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 2,
        padding: 15,
        flexDirection: 'row',
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        marginHorizontal: 16
    }
});