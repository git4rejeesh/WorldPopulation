'use strict';
import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';

export default class FlatListDemo1 extends Component {

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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  searchFilterFunction = text => {    
  const newData = this.arrayHolder.filter(item => {      
    const itemData = `${item.name.title.toUpperCase()}   
    ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." 
            lightTheme round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}  />;
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({ 
      page:1,
      refreshing:true,
      seed:this.state.seed+1 });
  }

  render() {
    return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    </List>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
