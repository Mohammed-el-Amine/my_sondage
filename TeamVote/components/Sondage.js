import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import SondageForm from './SondageForm';
import ShowSondage from './ShowSondage';

const Sondages = ({ userId }) => {
    const [sondages, setSondages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSondageId, setSelectedSondageId] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://10.68.255.234:3000/sondages')
                .then(response => {
                    setSondages(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCreateSondageClick = () => {
        setModalVisible(true);
    };

    const handleSondageClick = (sondageId) => {
        setSelectedSondageId(sondageId);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setSelectedSondageId(null);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Button title="Créer un sondage" onPress={handleCreateSondageClick} />
            <Text style={styles.title}>Liste des sondages</Text>
            {sondages.map((sondage, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.sondageContainer}
                    onPress={() => handleSondageClick(sondage._id)}
                >
                    <Text style={styles.sondageTitle}>{sondage.titre}</Text>
                    <Text>{sondage.description}</Text>
                </TouchableOpacity>
            ))}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    {selectedSondageId !== null ? (
                        <>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={styles.modalButton}>Retour</Text>
                            </TouchableOpacity>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{'\n'}Informations du sondage: {'\n'}</Text>
                            </View>
                            <ShowSondage sondageId={selectedSondageId} />
                        </>
                    ) : (
                        <>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Création de sondage</Text>
                                <TouchableOpacity onPress={handleModalClose}>
                                    <Text style={styles.modalButton}>Retour</Text>
                                </TouchableOpacity>
                            </View>
                            <SondageForm userId={userId} />
                        </>
                    )}

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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sondageContainer: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    sondageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
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