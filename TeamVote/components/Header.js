import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Reglement from './Reglement';
import Sondage from './Sondage';
import Stats from './Stats';

const Header = () => {
    const [selectedComponent, setSelectedComponent] = useState('');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Reglement':
                return <Reglement />;
            case 'Sondage':
                return <Sondage />;
            case 'Stats':
                return <Stats />;
            default:
                return null;
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedComponent('Reglement')}>
                    <Text style={styles.text}>Règlement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedComponent('Sondage')}>
                    <Text style={styles.text}>Sondage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedComponent('Stats')}>
                    <Text style={styles.text}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedComponent('')}>
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
            </View>
            {renderComponent()}
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        height: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        marginHorizontal: 10,
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default Header;