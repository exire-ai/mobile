import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import ProgressiveImage from '../components/ProgressiveImage';
import { signInStyles } from '../global/signInStyles';


function Category({ key, title, ogUrl, lowUrl, url, code, selected, onSelect }) {
  return (
    <View style={styles.itemContainer}>
    <TouchableOpacity
      onPress={() => onSelect(key)}
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
    </View>
  );
}

export default class CategoryPreference extends React.Component {
  constructor(props) {
    super(props);
    var categoryData = this.props.navigation.state.params.categories
    var userCategories = this.props.navigation.state.params.userCategories

    var activities = ['dancing', 'bars', 'artgalleries', 'extreme', 'rockclimbing', 'speakeasies', 'yoga', 'danceclubs', 'karaoke', 'arcades', 'markets', 'parks', 'cocktailbars', 'wine_bars', 'spa', 'museums']
    
    var formatData = () => {
      var categories = [];
      var j = 0;
      for (var i = 0; i < categoryData.length; i++) {
        if (activities.includes(categoryData[i].code)) {
          categories.push({
            title: categoryData[i].title,
            id: j,
            code: categoryData[i].code,
            ogUrl: categoryData[i].url,
            lowUrl: 'https://exirevideo.s3.us-east-2.amazonaws.com/' + categoryData[i].code + 'low.jpg',
            url: 'https://exirevideo.s3.us-east-2.amazonaws.com/' + categoryData[i].code + '.jpg',
            selected: userCategories.includes(categoryData[i].code),
          });
          j++;
        }
      }
      return categories
    }

    var priorSelected = () => {
      var selectedCategories = [];
      for (var i = 0; i < categoryData.length; i++) {
        if (activities.includes(categoryData[i].code)) {
          if (userCategories.includes(categoryData[i].code)) {
            selectedCategories.push(categoryData[i].code);
          }
        }
      }
      return selectedCategories;
    }

    this.state = {
      categories: formatData(),
      selectedCategories: priorSelected(),
      categoryData: categoryData,
      userCategories: userCategories
    };
  }

  next = () => {
    this.props.navigation.navigate('FoodPreference', { userID: this.props.navigation.state.params.userID, categoryData: this.state.categoryData, selected: this.state.selectedCategories, userCategories: this.state.userCategories });
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
          onPress={this.next}
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
    backgroundColor: 'pink'
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
