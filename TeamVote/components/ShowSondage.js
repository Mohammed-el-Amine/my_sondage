import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ShowSondage = ({ sondageId }) => {
    const [sondage, setSondage] = useState(null);
    const [votes, setVotes] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        axios
            .get(`http://10.68.255.234:3000/sondages/${sondageId}`)
            .then((response) => {
                setSondage(response.data);
                setVotes(
                    response.data.options.reduce((acc, option) => {
                        acc[option] = 0;
                        return acc;
                    }, {})
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sondageId]);

    if (!sondage) {
        return <Text>Chargement en cours...</Text>;
    }

    const handleVote = (option) => {
        if (selectedOption === option) {
            setVotes({ ...votes, [option]: votes[option] - 1 });
            setSelectedOption(null);
        } else {
            const newVotes = { ...votes };
            if (selectedOption !== null) {
                newVotes[selectedOption] -= 1;
            }
            newVotes[option] += 1;
            setVotes(newVotes);
            setSelectedOption(option);
        }
    };

    const handleVoteSubmit = () => {
        if (selectedOption !== null) {
            axios.post(`http://10.68.255.234:3000/sondages/${sondageId}/votes`, {
                option: selectedOption
            })
                .then((response) => {
                    console.log(response.data);
                    // TODO: Handle successful vote submission
                })
                .catch((error) => {
                    console.log(error);
                    // TODO: Handle error with vote submission
                });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{sondage.titre}</Text>
            <Text style={styles.description}>{sondage.description}</Text>
            <Text style={styles.option}>Options:</Text>
            <View>
                {sondage.options.map((option) => (
                    <TouchableOpacity key={option} onPress={() => handleVote(option)}>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionLabel}>{option}</Text>
                            <Text style={styles.voteCount}>{votes[option]}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleVoteSubmit()}
            >
                <Text style={styles.saveButtonText}>Enregistrer mon vote</Text>
            </TouchableOpacity>

        </View>
    );

};


const styles = {
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    option: {
        fontSize: 14,
        marginBottom: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    optionLabel: {
        flex: 1,
        marginRight: 10,
    },
    voteCount: {
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
};

export default ShowSondage;