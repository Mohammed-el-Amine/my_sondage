import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import axios from 'axios';
import SondageForm from './SondageForm';

const Sondages = ({ userId }) => {
    const [sondages, setSondages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    // console.log(userId)
    useEffect(() => {
        axios.get('http://10.68.255.234:3000/sondages')
            .then(response => {
                setSondages(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleCreateSondageClick = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Button title="Créer un sondage" onPress={handleCreateSondageClick} />
            <Text style={styles.title}>Liste des sondages</Text>
            {sondages.map((sondage, index) => (
                <View key={index} style={styles.sondageContainer}>
                    <Text style={styles.sondageTitle}>{sondage.titre}</Text>
                    <Text>{sondage.description}</Text>
                </View>
            ))}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Création de sondage</Text>
                    <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    <Text style={styles.newLine}></Text>
                    <SondageForm userId={userId} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sondageContainer: {
        marginBottom: 20,
    },
    sondageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    newLine: {
        height: 10,
    },
});

export default Sondages;