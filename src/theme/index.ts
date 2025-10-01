// You can use theme by this way --- this for me in the future

import { extendTheme , type StyleFunctionProps ,type ThemeConfig} from "@chakra-ui/react"
import {mode } from "@chakra-ui/theme-tools"



// 1. Chakra UI theme
const styles ={
    global : (props: StyleFunctionProps) =>({
        body : {
            color : mode("gray.300" , "gray.100")(props),
            bg : mode("gray.100", "#141214")(props)
        }
    })
}
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  }
  

export const theme = extendTheme({
    config,
    styles
})