import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Image } from "react-native";

function CarouselComponent(props: any) {
  const { data, renderItem, width, height, dotStyle } = props;
  console.log("width2", width);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={data}
        onProgressChange={progress}
        renderItem={renderItem}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={dotStyle}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default CarouselComponent;
