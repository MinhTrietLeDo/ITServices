import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import Feather from 'react-native-vector-icons/Feather'
import { Box, VStack, Badge } from 'native-base';

export const NotiButton = ({ containerStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Box alignItems={'center'}
                style={{
                    marginRight: windowWidth * 0.055,
                    // backgroundColor: 'black'
                }}>
                <VStack>
                    <Badge
                        colorScheme="danger"
                        rounded="full"
                        mb={-windowHeight*0.02} mr={-windowWidth*0.036}
                        zIndex={0.5}
                        variant="solid"
                        alignSelf="flex-end"
                        _text={{
                            fontSize: windowWidth * 0.03
                        }}
                        style={{textAlign:'center', alignItems:'center'}}
                    > 6
                    </Badge>
                    <Icon as={
                        <Feather
                            name="bell"
                        />}
                        size={0.075 * windowWidth} ml="2" color="muted.400" />
                </VStack>
            </Box>
        </TouchableOpacity>
    )
}