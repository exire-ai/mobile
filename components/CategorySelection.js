import React from 'react';
import { View, Text } from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

const CategorySelection = ({ category }) => {
    return (
        <View
            style={[
                {
                    borderRadius: 5,
                    backgroundColor: category.selected
                        ? colorScheme.primary
                        : colorScheme.componentBackground,
                    paddingHorizontal: 15,
                    paddingVertical: 9,
                    alignItems: 'center',
                    flexDirection: 'row'
                },
                shadowStyles.shadowDown
            ]}
        >
            <Text
                style={{
                    marginTop: -1,
                    fontFamily: 'Bold',
                    color: category.selected
                        ? colorScheme.primaryText
                        : colorScheme.darkText,
                    fontSize: 17
                }}
            >
                {category.name[0]}{' '}
            </Text>
            <Text style={{ marginTop: -1, fontSize: 19 }}>
                {category.name[1]}
            </Text>
        </View>
    );
};

export default CategorySelection;
