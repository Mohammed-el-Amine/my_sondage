import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Reglement from './Reglement';
import Sondage from './Sondage';
import Stats from './Stats';

const Header = ({ userId }) => {
    const [selectedComponent, setSelectedComponent] = useState('');
    // console.log(userId)
    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Reglement':
                return <Reglement userId={userId} />;
            case 'Sondage':
                return <Sondage userId={userId} />;
            case 'Stats':
                return <Stats userId={userId} />;
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