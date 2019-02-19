'use strict';
import React,{Component} from 'react';
import { StyleSheet } from 'react-native';
import FlatListDemo1 from './FlatListDemo1';
import FlatListDemo2 from './FlatListDemo2';
import SectionListDemo1 from './SectionListDemo1';
import SectionListDemo2 from './SectionListDemo2';
import WorldMap from './WorldMap';

export default class App extends Component {
  

  render() {
    return (
      <WorldMap/>
      // <FlatListDemo1/>
      // <SectionListDemo2/>
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
