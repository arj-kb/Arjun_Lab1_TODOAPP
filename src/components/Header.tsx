import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


interface Props {
    title: string;
}

const Header: React.FC<Props> = ({title}) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    }
});

export default Header;