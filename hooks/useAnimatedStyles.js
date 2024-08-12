import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export const useImageAnimatedStyle = (scrollOffset, HEADER_HEIGHT) => {
    return useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                        'clamp'
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        };
    });
};

export const useHeaderAnimatedStyle = (scrollOffset, HEADER_HEIGHT) => {
    return useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT / 2], [0, 1])
        };
    });
};

export const useBackIconAnimatedStyle = (scrollOffset, HEADER_HEIGHT) => {
    return useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT / 2], [1, 0])
        };
    });
};
