'use strict';
import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import { Button, SectionList, Alert } from "react-native";
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';


export default class SectionListDemo2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      arrayHolder: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }


  makeRemoteRequest = () => {
    

    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        this.arrayHolder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render () {
  	return (
  		<View style={styles.container}>
  			<SectionList 
  			  renderItem={({ item }) => (
          <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
          />
          )}
  				renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { item.email } </Text> }
  				sections={this.state.data}
       		keyExtractor={item => item.email}
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
