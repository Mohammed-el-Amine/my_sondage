import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import App from '../App';
import Header from './Header';

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://10.68.255.234:3000/profile/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleLogout = () => {
        setUser(null);
        BackHandler.exitApp();
    };

    if (!user) {
        return <App />;
    }

    const birthdate = moment(user.dateNaissance, 'DDMMYYYY').toDate();

    const handleChangePassword = async () => {
        try {
            await axios.post(`http://10.68.255.234:3000/profile/${userId}/password`, { password });
            alert('Mot de passe modifié avec succès !');
            setPassword('');
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue lors de la modification du mot de passe.');
        }
    };

    return (
        <View style={styles.parentContainer}>
            <Header userId={userId} />
            <View style={styles.container}>
                <Text style={styles.title}>Profil de {user.nom} {user.prenom}</Text>
                <Text style={styles.label}>Date de naissance : </Text>
                <Text style={styles.value}>{moment(birthdate).format('DD/MM/YYYY')}</Text>
                <Text style={styles.label}>Adresse : </Text>
                <Text style={styles.value}>{user.adresse}</Text>
                <Text style={styles.label}>Email : </Text>
                <Text style={styles.value}>{user.email}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nouveau mot de passe : </Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Modifier le mot de passe</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    parentContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    value: {
        fontSize: 16,
        marginTop: 10,
    },
    inputContainer: {
        marginTop: 40,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#E74C3C',
        borderRadius: 5,
        padding: 10,
    },
});

export default Profile;