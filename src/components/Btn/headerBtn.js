import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { windowHeight, windowWidth } from '../../assets/res/courseStyle';
import Feather from 'react-native-vector-icons/Feather'
import { Box, VStack, Badge } from 'native-base';

export const NotiButton = ({onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Box
                style={{
                    marginRight: windowWidth * 0.06,
                    // width: windowWidth * 0.1,
                    // backgroundColor: 'black',
                    justifyContent: 'flex-start',
                    // right: windowWidth * 0.01,
                    position: 'relative',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flex: 1
                }}>
                <VStack alignItems={'center'}>
                    {/* <Badge
                        colorScheme="danger"
                        rounded="full"
                        mb={-windowHeight * 0.017} mr={-windowWidth * 0.02}
                        zIndex={0.5}
                        variant="solid"
                        alignSelf="flex-end"
                        _text={{
                            fontSize: windowWidth * 0.03
                        }}
                        textAlign={'center'}
                        position={'relative'}
                    >1</Badge> */}
                    <Icon
                        as={<Feather name="bell" />}
                        size={0.065 * windowWidth} ml="2" color="muted.400"
                        position={'relative'} />
                </VStack>
            </Box>
        </TouchableOpacity>
    )
}