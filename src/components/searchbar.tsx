import { component$, Resource, useResource$, useStore, useWatch$, $ } from '@builder.io/qwik';
import { PostModal } from './PostModal'
// import { Context } from './timeline';
// useContext


// interface postData {
//   postId: number;
//   author: string;
//   song: string;
//   content: string;
//   likes: number
//   date: Date
// }

interface Query {
  query: string;
  tracks?: Tracks;
  artists?: Artists;

}

export interface TrackSearch {
  tracks: Tracks;
}

export interface Tracks {
  totalCount: number;
  items: TracksItem[];
  pagingInfo: PagingInfo;
}

export interface TracksItem {
  data: Data;
}

export interface Data {
  uri: string;
  id: string;
  name: string;
  albumOfTrack: AlbumOfTrack;
  artists: Artists;
  contentRating: ContentRating;
  duration: Duration;
  playability: Playability;
}

export interface AlbumOfTrack {
  uri: string;
  name: string;
  coverArt: CoverArt;
  id: string;
  sharingInfo: SharingInfo;
}

export interface CoverArt {
  sources: Source[];
}

export interface Source {
  url: string;
  width: number;
  height: number;
}

export interface SharingInfo {
  shareUrl: string;
}

export interface Artists {
  items: ArtistsItem[];
}

export interface ArtistsItem {
  uri: string;
  profile: Profile;
}

export interface Profile {
  name: string;
}

export interface ContentRating {
  label: string;
}

export interface Duration {
  totalMilliseconds: number;
}

export interface Playability {
  playable: boolean;
}

export interface PagingInfo {
  nextOffset: number;
  limit: number;
}


export interface ArtistSearch {
  query: string;
  artists: Artists;
}

export interface Artists {
  totalCount: number;
  items: ArtistsItem[];
  pagingInfo: PagingInfo;
}

export interface ArtistsItem {
  data: Data;
}

export interface Data {
  uri: string;
  profile: Profile;
  visuals: Visuals;
}

export interface Profile {
  name: string;
}

export interface Visuals {
  avatarImage: AvatarImage;
}

export interface AvatarImage {
  sources: Source[];
}

export interface Source {
  url: string;
  width: number;
  height: number;
}

export interface PagingInfo {
  nextOffset: number;
  limit: number;
}

interface state {
  isSearchDropdownOpen: boolean,
  setSearchFilter: string,
  query: string,
  debouncedQuery: string,
  postModal: boolean
}


export const Searchbar = component$(() => {


  const searchState: state = useStore({
    isSearchDropdownOpen: false,
    setSearchFilter: "artists",
    query: "",
    debouncedQuery: "",
    postModal: false
  })

  useWatch$(({ track }) => {
    track(() => searchState.query);
    const debounced = setTimeout(() => {
      searchState.debouncedQuery = searchState.query;
    }, 1000);
    return () => clearTimeout(debounced);
  });

  const resource = useResource$<Query>(async (ctx) => {


    ctx.track(() => searchState.debouncedQuery);
    ctx.track(() => searchState.setSearchFilter);

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dc0c481150msh1dbe415c1ea2eb0p1b43b2jsn9a3fd1804f9d',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const search = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchState.debouncedQuery}&type=${searchState.setSearchFilter}&offset=0&limit=3&numberOfTopResults=3`, options)
    return search.json()
    // const data = searchResolved.artists.items[0].data.profile.name
    // return data;
  });

  const dropdownItems = [
    "artists",
    "tracks"
  ]

  const toggleSearchFilter = $(() => {
    searchState.isSearchDropdownOpen = !searchState.isSearchDropdownOpen
  });

  const clearSearch = $(() => {
    searchState.query = ""
    searchState.isSearchDropdownOpen = false
  })
  // const state = useContext(Context)


  // const addToTimeline = $((track, content) => {
  //   interface postData {
  //     postId: number;
  //     author: string;
  //     song: string;
  //     content: string;
  //     likes: number
  //     date: Date
  //   }

  //   const newPost: postData = {
  //     postId: 0,
  //     author: "Test",
  //     song: track.data.name,
  //     content: content,
  //     likes: 0,
  //     date: new Date(Date.now())

  //   }
  //   state.data.push()
  // })

  // onClick$={(track) => addToTimeline(track, content)}


  return (
    <div class="flex md:w-[400px] md:h-12 h-12 mx-auto bg-accent_gray justify-between p-1 rounded-md flex-wrap">
      {searchState.postModal && <PostModal {...searchState} />}
      <div class="flex w-3/4 items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-5 mx-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
        <input type="search" class="text-lg text-gray-700 bg-accent_gray" placeholder="Search here" aria-label="Search" aria-describedby="button-addon2" onChange$={(e) => { searchState.query = e.target.value }} onClick$={() => searchState.isSearchDropdownOpen = false} value={searchState.query} />
        {searchState.query && <button onClick$={() => clearSearch()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>}


      </div>
      <div class="w-1/4">
        <button class="flex justify-center h-10 w-full text-base text-primary_white rounded-lg transition duration-150 ease-in-out items-center bg-primary_black" type="button"
          onClick$={() => toggleSearchFilter()} >{`${searchState.setSearchFilter}`}</button>
        <div class={searchState.isSearchDropdownOpen ? "absolute z-10" : "hidden"}>
          {searchState.isSearchDropdownOpen && dropdownItems.map((item) => <button class="px-8 h-10 my-1 w-full text-base text-primary_white rounded-lg transition duration-150 ease-in-out flex items-center bg-primary_black" type="button" onClick$={() => {
            searchState.setSearchFilter = item;
            searchState.isSearchDropdownOpen = !searchState.isSearchDropdownOpen
          }} >
            {item}
          </button>)}
        </div>
      </div>
      {searchState.query && <Resource
        value={resource}
        onPending={() => <div class="w-6 h-6 border-2 border-t-0 border-r-0 rounded-3xl animate-spin mx-auto mt-2 ">
        </div>}
        onResolved={(songInfo) => {
          return (
            <div class="text-white flex flex-col gap-1 w-1/2 text-center z-10 bg-slate-900">
              {searchState.setSearchFilter === "tracks" &&
                songInfo.tracks?.items.map(track => (<div >{`${track.data.name}`}</div>))}
              {searchState.setSearchFilter === "artists" && songInfo.artists?.items?.map((artist) => (<div>{artist.data.profile.name}</div>))}
            </div>
          )
        }}
      />}
    </div>
  )
});


