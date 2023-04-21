import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker } from 'react-native';

export default function Signup({ handleBack }) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [adresse, setAdresse] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [typeCompte, setTypeCompte] = useState('particulier');

    const handleSignup = () => {
        console.log('Inscription avec nom:', nom, 'prenom:', prenom, 'date de naissance:', dateNaissance, 'adresse:', adresse, 'email:', email, 'mot de passe:', password, 'confirmation mot de passe:', passwordConfirmation, 'type de compte:', typeCompte);
    };

    return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Inscription TeamVote</Text>

                <View style={styles.typeCompte}>
                    <Text style={styles.typeCompteLabel}>Je suis un :</Text>
                    <TouchableOpacity
                        style={[styles.typeCompteButton, typeCompte === 'particulier' && styles.typeCompteButtonSelected]}
                        onPress={() => setTypeCompte('particulier')}
                    >
                        <Text style={styles.typeCompteButtonText}>Particulier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeCompteButton, typeCompte === 'entreprise' && styles.typeCompteButtonSelected]}
                        onPress={() => setTypeCompte('entreprise')}
                    >
                        <Text style={styles.typeCompteButtonText}>Entreprise</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    autoCapitalize="words"
                    value={nom}
                    onChangeText={setNom}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    autoCapitalize="words"
                    value={prenom}
                    onChangeText={setPrenom}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date de naissance"
                    keyboardType="numeric"
                    value={dateNaissance}
                    onChangeText={setDateNaissance}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Adresse"
                    value={adresse}
                    onChangeText={setAdresse}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmation de mot de passe"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    typeCompte: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 10,
        marginBottom: 20,
    },
    typeCompteLabel: {
        fontSize: 18,
        marginRight: 10,
    },
    typeCompteButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    typeCompteButtonText: {
        fontSize: 16,
    },
    typeCompteButtonSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
    },
});