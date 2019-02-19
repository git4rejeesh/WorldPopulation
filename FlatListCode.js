<View style={{flex:1}}>
        <FlatList 

        ItemSeparatorComponent={()=><View style={{backgroundColor:'red',height:10}}/>}

         data={[{key: '1', picture:require('./images/color-red.png'), name:'vyshnav'},
                {key: '2', picture:require('./images/color-black.png'), name:'sabid'},
                {key: '3', picture:require('./images/color-blue.png'), name:'rejeesh'},
                {key: '4', picture:require('./images/color-violet.png'), name:'george'}]}
         
         renderItem={({item}) =>(<View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
         	<Text>{item.key}</Text>
          <Image style={{ width: 20, height: 20, resizeMode: 'contain'}} source={item.picture}/>         	
         	<Text>{item.name}</Text>
         	</View>)
      	 }
		    />
      </View>