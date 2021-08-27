import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    axios
      .get('https://api.koseeker.id/property/')
      .then(response => {
        console.log('response api', response);
        setFilteredData(response.data.data);
        setMasterData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        const hasil = itemData.indexOf(textData) > -1;
        return hasil;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  const ItemView = ({item, index}) => {
    return (
      <>
        <Text style={styles.itemStyle}>{item.name.toUpperCase()}</Text>
        <Text style={styles.itemStyle}>
          {item.address.address.toUpperCase()}
        </Text>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder={'Search Here'}
          underlineColorAndroid="transparent"
          onChangeText={text => searchFilter(text)}
        />
        <Text>{filteredData.data}</Text>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 15,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
  },
});
