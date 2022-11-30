import { component$, useContextProvider, useStore, createContext } from '@builder.io/qwik';
import { Post } from './post';
import { Searchbar } from './searchbar';

export const Context = createContext('posts')

export const Timeline = component$(() => {


  const sampleData = [
    {
      postId: 1,
      author: "Femi",
      song: "Wizkid - Essence",
      content: "I love this song!",
      likes: 10,
      date: new Date(
        "3 March, 2020")
    },
    {
      postId: 2,
      author: "Anubis",
      song: "Drake Rich Flex",
      content: "One of my favorites",
      likes: 3,
      date: new Date(
        "4 August, 2020")
    },
    {
      postId: 3,
      author: "Intellibus",
      song: "Rick Ross",
      content: "Boss",
      likes: 0,
      date: new Date(
        "22 April, 2021")
    },
    {
      postId: 4,
      author: "Thomas",
      song: "Burna Boy",
      content: "Booty meat",
      likes: 9,
      date: new Date(
        "16 June, 2022")
    }
  ]
  const state = useStore({
    activeButton: 0,
    data: sampleData
  })

  useContextProvider(Context, state)


  interface postData {
    postId: number;
    author: string;
    song: string;
    content: string;
    likes: number
    date: Date
  }



  const activeButtonStyling = (buttonId: number): string => {
    return (buttonId === state.activeButton ? `rounded-t-lg py-2 bg-primary_black text-primary_white text-lg flex-grow`
      : "bg-accent_gray h-min py-1 rounded-t-lg flex-grow")
  }

  const sortedTimeline = state.activeButton === 0 ? sampleData.sort((a, b) => {
    if (a.date < b.date) {
      return -1
    } else {
      return 1
    }
  })
    : state.activeButton === 1 ? sampleData.sort((a, b) => a.likes - b.likes)
      : sampleData

  return (
    <div class="bg-primary_white h-screen w-full flex gap-10 flex-col items-center px-5 md:px-20">
      <h1>Hello Femi, welcome to qwik music!</h1>
      <Searchbar />
      <div class="h-full overflow-hidden w-full">
        <div class="flex justify-between gap-3 text-base font-semibold items-end md:hidden">
          <button class={activeButtonStyling(0)} onClick$={() => state.activeButton = 0}>Latest</button>
          <button class={activeButtonStyling(1)} onClick$={() => state.activeButton = 1}>Popular</button>
          <button class={activeButtonStyling(2)} onClick$={() => state.activeButton = 2}>For You</button>
        </div>
        <div class="bg-accent_gray h-full w-full rounded-lg grid justify-items-center py-10 md:py-20 px-2 overflow-y-scroll overflow-hidden">
          {sortedTimeline.map((postInfo: postData) => <Post {...postInfo} />)}
        </div>
      </div>
    </div>
  )
});