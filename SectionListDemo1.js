'use strict';
import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import { Button, SectionList, Alert } from "react-native";
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';

export default class SectionListDemo1 extends Component {

	getSectionListItem=(item)=>{
      Alert.alert(item)
  	}

  	render () {
  		return (
  			<View style={styles.container}>
  				<SectionList 
  					renderItem={ ({item}) => <Text style={styles.SectionListItemS} onPress={this.getSectionListItem.bind(this, item)}> { item } </Text> }
  					renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.title } </Text> }
  					sections={[
         				{ title: 'Username Starts with A', data: ['Amit', 'Anand', 'Abhishek'] },
         				{ title: 'Username Starts with B', data: ['Bikash', 'Bingo', 'Baby'] },
         				{ title: 'Username Starts with C', data: ['cat', 'cathy', 'Charan'] },
         				{ title: 'Username Starts with D', data: ['Deepak', 'Deepti', 'Dhananjay'] },
         				{ title: 'Username Starts with F', data: ['Fatay', 'Fanny', 'Fresher'] },
       				]}
       				keyExtractor={ (item, index) => index }
  				/>
  			</View>
  		);
  	}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#e5e5e5"
    },
    SectionHeader:{
      backgroundColor : '#64B5F6',
      fontSize : 20,
      padding: 5,
      color: '#fff',
      fontWeight: 'bold'
   },
    SectionListItemS:{
      fontSize : 16,
      padding: 6,
      color: '#000',
      backgroundColor : '#F5F5F5'
  }
});
