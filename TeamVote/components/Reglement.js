import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Reglement = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Règlement d'utilisation pour les sondages</Text>
        <Text style={styles.text}>
          Bienvenue sur notre plateforme de sondages en ligne. Nous sommes heureux de vous accueillir ici, mais nous vous demandons de lire attentivement et de respecter ce règlement d'utilisation.{"\n\n"}

          1. Comportement éthique : Nous vous demandons de répondre aux sondages de manière honnête et éthique. Ne répondez pas de manière à tromper ou manipuler les résultats.{"\n\n"}

          2. Confidentialité des données : Vos réponses sont confidentielles et anonymes. Les résultats ne seront partagés qu'avec les chercheurs ou les organisations à l'origine du sondage. Vos informations personnelles ne seront pas partagées avec des tiers sans votre consentement.{"\n\n"}

          3. Utilisation des données : Les données collectées seront utilisées uniquement à des fins de recherche ou statistiques. Les informations collectées ne seront pas utilisées à des fins de marketing ou de vente.{"\n\n"}

          4. Respect des autres utilisateurs : Nous vous demandons de respecter les autres utilisateurs et de ne pas faire de commentaires ou de propos discriminatoires, injurieux ou offensants. Tout comportement inapproprié peut entraîner une suspension ou une suppression de votre compte.{"\n\n"}

          En utilisant notre plateforme, vous acceptez de respecter ces règles et de vous comporter de manière éthique et respectueuse. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'justify',
    marginTop: 10,
  },
});

export default Reglement;