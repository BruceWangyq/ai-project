import { Url } from "url"

interface MenuDataProps {
  id: number
  title: string
  path?: Url | string
  newTab?: boolean
  submenu?: MenuDataProps[]
}

const menuData: MenuDataProps[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 3,
    title: "Image",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Prompt to Image",
        path: "/prompt2image",
        newTab: false,
      },
      {
        id: 32,
        title: "Age Progression",
        path: "/transform",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Text",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Grammar Correction",
        path: "/grammar",
        newTab: false,
      },
    ],
  },
]
export default menuData
