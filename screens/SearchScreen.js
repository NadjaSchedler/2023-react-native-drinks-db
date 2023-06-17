import {Button, StyleSheet, TextInput, View} from "react-native";
import {useEffect, useState} from "react";


export default function SearchScreen({navigation}) {

    const [text, setText] = useState('')
    const [ingredients, setIngredients] = useState([]);

    const getIngredients = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
            const drinks = await response.json();
            setIngredients(drinks.drinks)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getIngredients();
    }, []);

    let ValidateAndNavigate = () => {
        if (ingredients.map(i => i.strIngredient1).includes(text)) {
            navigation.navigate('CocktailListScreen', {searchText: text})
        } else {
            alert("Invalid Ingredient")
        }
    }
    return <View style={styles.container}>
        <TextInput
            style={styles.input}

            value={text}
            placeholder={'keywords'}
            onChangeText={(value) => setText(value)}
        />
        <Button title="Search"
                onPress={ValidateAndNavigate}/>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        paddingBottom: 10,
        width: 200,
        backgroundColor: "rgba(178,255,255,0.37)",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 24

    }
});