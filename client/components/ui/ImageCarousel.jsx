import CarouselComponent from "./CarouselComponent";
import React from "react";
import { View, Image } from "react-native";




function ImageCarousel({ images, width, height }) {


    console.log("width", width)

    const renderItem = ({ index }) => (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
            }}
        >
            <Image
                source={images[index]} // Replace with your image source
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    )

    return (
        <CarouselComponent
            renderItem={renderItem}
            data={images}
            width={width}
            height={height}
            dotStyle={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 }}
        />
    )
}

export default ImageCarousel