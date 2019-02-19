import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,FlatList,Platform,ActivityIndicator} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			 loading: true,
      //Loading state used while loading the data for the first time
     		 serverData: [],
      //Data Source for the FlatList
      		fetching_from_server: false,
      //Loading state used while loading more data
		}
    this.renderFooter=this.renderFooter.bind(this)
    this.loadMoreData=this.loadMoreData.bind(this)
    this.offset = 1;
	}

	componentDidMount() {
    fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)
     .then(res => res.json())
     .then((res)=>{
      this.offset = this.offset + 1;
     	this.setState({
     		serverData: [...this.state.serverData, ...res.results],
     		loading:false});

     	})
 .catch(error => {
        console.error(error);
      });
     }

     loadMoreData(){
      this.setState({ fetching_from_server: true }, () => {
      fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)
       .then(res => res.json())
          .then(res => {
            this.offset = this.offset + 1;
            this.setState({
              serverData: [...this.state.serverData, ...res.results],
              fetching_from_server: false
              })
            })
          .catch(error => {
            console.error(error);
          });

          });
    };
	
  renderFooter() {
    return (
    <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',padding:10}}>

     <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          style={{backgroundColor: '#800000',borderRadius:4,alignItems:'center',justifyContent:'center',flexDirection:'row',padding:10}}>
      <Text style={{color: 'white',fontSize: 15,textAlign: 'center'}}>Load More</Text>
      </TouchableOpacity>
      </View>
      )}	

  render() {
    return (
       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    	 {this.state.loading ? 
          <ActivityIndicator size="large" />
         : 
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={this.state.serverData}
            renderItem={({ item }) => (
			<View style={{flex:1,padding:10,alignItems:'center',justifyContent:'center'}}>

				<Text>
          {item.id}
          {'.'} 
         {item.title.toUpperCase()}
        </Text>
				
				
			</View>)}
			 ItemSeparatorComponent={() => <View style={{height:1,backgroundColor: 'red',}} />}
        ListFooterComponent={this.renderFooter}
                
          />}
        
      </View>
    );
  }
}

