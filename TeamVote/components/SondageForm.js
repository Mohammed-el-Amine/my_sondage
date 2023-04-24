import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

const SondageForm = ({ onCloseModal, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        onSubmit({ title, description, options });
        onCloseModal();
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            removeClippedSubviews={true}
        >
            <Text style={styles.label}>Titre</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Entrez le titre du sondage"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Entrez la description du sondage"
            />
            <Text style={styles.label}>Options</Text>
            {options.map((option, index) => (
                <View style={styles.optionContainer} key={index}>
                    <TextInput
                        style={styles.input}
                        value={option}
                        onChangeText={(value) => handleOptionChange(index, value)}
                        placeholder={`Option ${index + 1}`}
                    />
                    <Button
                        title="Supprimer"
                        onPress={() => handleRemoveOption(index)}
                    />
                </View>
            ))}
            <Button title="Ajouter une option" onPress={handleAddOption} />
            <View style={styles.buttonContainer}>
                <Button title="Créer" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    removeButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
});

export default SondageForm;