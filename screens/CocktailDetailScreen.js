import {Image, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function CocktailDetailScreen(props) {
    const {route} = props
    const item = route.params.item
    const [data, setData] = useState([]);
    const getDetails = async () => {
        try {
            let input = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`;

            const response = await fetch(input);
            const drink = await response.json();

            let data = drink.drinks[0];
            console.log(data)
            setData(data)

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const getIngredients = (data) => {
        let ingredients = []
        for (let index = 1; index < 16; index++) {
            if (!data[`strIngredient${index}`]) break
            ingredients.push(
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Text>{(data[`strMeasure${index}`] ?? "").trim()} </Text>
                    <Text>{data[`strIngredient${index}`] ?? ""} </Text>
                </View>
            )
        }
        return ingredients
    }

    return (
        <View style={styles.view}>
            <Image source={{uri: item.strDrinkThumb}} style={styles.image} borderRadius={90}/>
            <Text style={styles.text}>{item.strDrink}</Text>
            <Text style={{marginBottom: 24}}>{data.strInstructions}</Text>
            {getIngredients(data)}

        </View>)
}

const styles = StyleSheet.create({
    item: {
        marginTop: 8,
        padding: 15
    },
    text: {
        fontSize: 24,
        marginBottom: 24
    },
    image: {
        height: 180,
        width: 180,
        alignSelf: 'center',
    },
    view: {
        margin: 12
    }
});