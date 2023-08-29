import { extendTheme } from "native-base";

export default theme = extendTheme({
    fontConfig: {
        WorkSans: {
            100: {
                normal: "WorkSans-Light",
                italic: "workSans-LightItalic"
            },
            200: {
                normal: "WorkSans-Light",
                italic: "workSans-LightItalic"
            },
            300:{
                normal: "WorkSans-Light",
                italic: "workSans-LightItalic"
            },
            400:{
                normal: "WorkSans-Regular",
                italic: "workSans-Italic"
            },
            500:{
                normal: "WorkSans-Medium",
            },
            600:{
                normal: "WorkSans-Medium",
                italic: "WorkSans-MediumItalic"
            }
        }
    },
    fonts: {
        heading: "WorkSans",
        body: "WorkSans",
        mono: "WorkSans"
    }
})