import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage
} from 'react-native';
import users from '../functions/users'
import ProgressiveImage from '../components/ProgressiveImage';
import { signInStyles } from '../global/signInStyles';


function Category({ key, title, ogUrl, lowUrl, url, code, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(key)}
      style={styles.itemContainer}
    >
      <ProgressiveImage
        thumbnailSource={{ uri: lowUrl}}
        source={{uri: ogUrl}}
        style={{ width: '100%', height: '100%', borderRadius: 8 }}
        resizeMode='cover'
      />
      <View
        style={[
          styles.itemContent,
          {
            backgroundColor: selected ? 'rgba(0,0,169,.65)' : 'rgba(0,0,0,.15)',
            blurRadius: selected ? 1 : 0
          }
        ]}
      >
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class CategoryPreference extends React.Component {
  constructor(props) {
    super(props);
    var categoryData = this.props.navigation.state.params.categoryData
    var userCategories = this.props.navigation.state.params.userCategories

    var food = ['chinese', 'sushi', 'burgers', 'pubs', 'mexican', 'poke', 'italian', 'sandwiches', 'pizza', 'icecream', 'bakeries', 'barbeque', 'gelato', 'newamerican', 'tea', 'acaibowl', 'cafe', 'japanese']

    var formatData = () => {
      var categories = [];
      var j = 0;
      for (var i = 0; i < categoryData.length; i++) {
        if (food.includes(categoryData[i].code)) {
          categories.push({
            title: categoryData[i].title,
            id: j,
            ogUrl: categoryData[i].url,
            lowUrl: 'https://exirevideo.s3.us-east-2.amazonaws.com/' + categoryData[i].code + 'low.jpg',
            url: 'https://exirevideo.s3.us-east-2.amazonaws.com/' + categoryData[i].code + '.jpg',
            selected: userCategories.includes(categoryData[i].code),
            code: categoryData[i].code
          });
          j++;
        }
      }
      return categories
    }

    var priorSelected = () => {
      var selectedCategories = [];
      for (var i = 0; i < categoryData.length; i++) {
        if (food.includes(categoryData[i].code)) {
          if (userCategories.includes(categoryData[i].code)) {
            selectedCategories.push(categoryData[i].code);
          }
        }
      }
      return selectedCategories;
    }

    this.state = {
      categories: formatData(),
      selectedCategories: priorSelected()
    };
  }

  next = (selected) => {
    selected = selected.concat(this.props.navigation.state.params.selected)
    var userID = this.props.navigation.state.params.userID;
    users.updateCategories(userID, selected, () => {
      AsyncStorage.setItem('userID', userID);
      this.props.navigation.navigate('ChatStack');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            signInStyles.subHeaderText,
            { padding: '5%', backgroundColor: '#eee', width: '100%' }
          ]}
        >
          Tell us what you are interested in!
        </Text>
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.categories}
          extraData={this.state.selected}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Category
              key={item.key}
              title={item.title}
              localUrl={'../assets/categories/' + item.code + '.jpg'}
              url={item.url}
              ogUrl={item.ogUrl}
              lowUrl={item.lowUrl}
              selected={item.selected}
              onSelect={() => {
                var newCategories = this.state.categories;
                newCategories[item.id].selected = !this.state.categories[
                  item.id
                ].selected;
                var newSelected = this.state.selectedCategories;
                if (newCategories[item.id].selected) {
                  newSelected.push(newCategories[item.id].code);
                } else {
                  const index = newSelected.indexOf(
                    newCategories[item.id].code
                  );
                  newSelected.splice(index, 1);
                }
                this.setState({
                  categories: newCategories,
                  selectedCategories: newSelected
                });
              }}
            />
          )}
        />
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {this.next(this.state.selectedCategories)}}
        >
          <Text style={signInStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  },
  item: {
    margin: 24,
    padding: 15,
    backgroundColor: '#eee'
  },
  doneButton: {
    backgroundColor: '#007aff',
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingTop: 15
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 16,
    margin: Dimensions.get('screen').width * 0.025,
    height: Dimensions.get('screen').width * 0.45,
    overflow: 'hidden',
  },
  itemContent: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
  },
  itemText: {
    fontFamily: 'nunito-semibold',
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginHorizontal: 8,
    textAlign: 'center'
  },
  list: {
    flex: 1,
    width: '100%'
  }
});
