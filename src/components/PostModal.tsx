import { component$, Resource, useResource$, useStore, useWatch$, $, useContext } from '@builder.io/qwik';
import { Context } from './timeline';
export interface MultiQuery {
  albums?: Albums;
  artists?: MultiQueryArtists;
  episodes?: Episodes;
  genres?: Albums;
  playlists?: Playlists;
  podcasts?: Podcasts;
  topResults?: TopResults;
  tracks?: Tracks;
  users?: Users;
}

export interface Albums {
  totalCount?: number;
  items?: AlbumsItem[];
}

export interface AlbumsItem {
  data?: PurpleData;
}

export interface PurpleData {
  uri?: string;
  name?: string;
  artists?: DataArtists;
  coverArt?: CoverArt;
  date?: DateClass;
}

export interface DataArtists {
  items?: PurpleItem[];
}

export interface PurpleItem {
  uri?: string;
  profile?: Profile;
}

export interface Profile {
  name?: string;
}

export interface CoverArt {
  sources?: Source[];
}

export interface Source {
  url?: string;
  width?: number | null;
  height?: number | null;
}

export interface DateClass {
  year?: number;
}

export interface MultiQueryArtists {
  totalCount?: number;
  items?: FluffyItem[];
}

export interface FluffyItem {
  data?: FluffyData;
}

export interface FluffyData {
  uri?: string;
  profile?: Profile;
  visuals?: Visuals;
}

export interface Visuals {
  avatarImage?: CoverArt;
}

export interface Episodes {
  totalCount?: number;
  items?: EpisodesItem[];
}

export interface EpisodesItem {
  data?: TentacledData;
}

export interface TentacledData {
  uri?: string;
  name?: string;
  coverArt?: CoverArt;
  duration?: Duration;
  releaseDate?: ReleaseDate;
  podcast?: Podcast;
  description?: string;
  contentRating?: ContentRating;
}

export interface ContentRating {
  label?: string;
}

export interface Duration {
  totalMilliseconds?: number;
}

export interface Podcast {
  coverArt?: CoverArt;
}

export interface ReleaseDate {
  isoString?: Date;
}

export interface Playlists {
  totalCount?: number;
  items?: FeaturedElement[];
}

export interface FeaturedElement {
  data?: FeaturedData;
}

export interface FeaturedData {
  uri?: string;
  name?: string;
  description?: string;
  images?: Images;
  owner?: Profile;
}

export interface Images {
  items?: CoverArt[];
}

export interface Podcasts {
  totalCount?: number;
  items?: PodcastsItem[];
}

export interface PodcastsItem {
  data?: StickyData;
}

export interface StickyData {
  uri?: string;
  name?: string;
  coverArt?: CoverArt;
  type?: string;
  publisher?: Profile;
  mediaType?: string;
}

export interface TopResults {
  items?: TentacledItem[];
  featured?: FeaturedElement[];
}

export interface TentacledItem {
  data?: IndigoData;
}

export interface IndigoData {
  uri?: string;
  profile?: Profile;
  visuals?: Visuals;
  id?: string;
  name?: string;
  albumOfTrack?: AlbumOfTrack;
  artists?: DataArtists;
  contentRating?: ContentRating;
  duration?: Duration;
  playability?: Playability;
  description?: string;
  images?: Images;
  owner?: Profile;
}

export interface AlbumOfTrack {
  uri?: string;
  name?: string;
  coverArt?: CoverArt;
  id?: string;
  sharingInfo?: SharingInfo;
}

export interface SharingInfo {
  shareUrl?: string;
}

export interface Playability {
  playable?: boolean;
}

export interface Tracks {
  totalCount?: number;
  items?: TracksItem[];
}

export interface TracksItem {
  data?: IndecentData;
}

export interface IndecentData {
  uri?: string;
  id?: string;
  name?: string;
  albumOfTrack?: AlbumOfTrack;
  artists?: DataArtists;
  contentRating?: ContentRating;
  duration?: Duration;
  playability?: Playability;
}

export interface Users {
  totalCount?: number;
  items?: UsersItem[];
}

export interface UsersItem {
  data?: HilariousData;
}

export interface HilariousData {
  uri?: string;
  id?: string;
  displayName?: string;
  username?: string;
  image?: Image;
}

export interface Image {
  smallImageUrl?: string;
  largeImageUrl?: string;
}

interface PostArtist {
  name: string | undefined;
  image: string | undefined
}

interface PostTrack {
  song: string | undefined;
  artist: string | undefined;
  image: string | undefined
}

interface store {
  query: string,
  debouncedQuery: string,
  postModal: boolean,
  postContent: string,
  postSong: PostTrack | undefined,
  postArtist: PostArtist | undefined
}

interface postData {
  postId: number;
  author: string;
  song: string | undefined;
  content: string;
  likes: number
  date: Date
}

interface ContextState {
  activeButton: number;
  data: postData[]
}



export const PostModal = component$(({ postModal }: any) => {

  const posts = useContext(Context)


  const searchState: store = useStore({
    query: "",
    debouncedQuery: "",
    postModal: false,
    postContent: "",
    postSong: {
      song: "",
      artist: "",
      image: ""
    },
    postArtist: {
      name: "",
      image: ""
    },
  })

  useWatch$(({ track }) => {
    track(() => searchState.query);
    const debounced = setTimeout(() => {
      searchState.debouncedQuery = searchState.query;
    }, 500);
    return () => clearTimeout(debounced);
  });

  const resource = useResource$<MultiQuery>(async (ctx) => {


    ctx.track(() => searchState.debouncedQuery);

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dc0c481150msh1dbe415c1ea2eb0p1b43b2jsn9a3fd1804f9d',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    const search = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchState.debouncedQuery}&type=multi&offset=0&limit=3&numberOfTopResults=3`, options)
    return search.json()
    // const data = searchResolved.artists.items[0].data.profile.name
    // return data;
  });


  const clearSearch = $(() => {
    searchState.query = ""
    if (searchState.postArtist?.name != undefined) {
      searchState.postArtist.name = ""
    }

    if (searchState.postSong?.song != undefined) {
      searchState.postSong.song = ""
    }

  })



  const setPostArtist = $((artist: FluffyItem) => {
    searchState.postArtist = {
      name: artist.data?.profile?.name,
      image: artist.data?.visuals?.avatarImage?.sources?.[1]?.url
    }
    searchState.query = ""
  })

  const setPostTrack = $((track: TracksItem) => {
    searchState.postSong = {
      song: track.data?.name,
      artist: track.data?.artists?.items?.[0]?.profile?.name,
      image: track.data?.albumOfTrack?.coverArt?.sources?.[0]?.url
    }
    searchState.query = ""
  })

  const newPost = (() => {
    const sentPost: postData = {
      postId: 0,
      author: "test",
      song: `${searchState.postSong?.song} - ${searchState.postArtist?.name}`,
      content: searchState.postContent,
      likes: 0,
      date: new Date(Date.now())
    }
    postModal = false
    posts.data.push(sentPost)
    closeModal()
  })

  const closeModal = (() => {
    postModal = false
  })

  return (
    <div class="w-[100vw] h-[100vh] absolute inset-0 z-50 bg-slate-900/25 flex justify-center items-center">
      <div class="w-4/5 max-w-[500px] max-h-[500px] flex flex-col items-center gap-4 bg-primary_white h-1/2 rounded-2xl shadow-lg p-2">
        <h1 class="text-center">What Would You Like To Post About?</h1>
        <div class="flex items-center">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-5 mx-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
          <input type="search" class="text-lg text-gray-700 bg-accent_gray" placeholder="Search here" aria-label="Search" aria-describedby="button-addon2" onChange$={(e) => { searchState.query = e.target.value }} value={searchState.query} />
          {searchState.query && <button onClick$={() => clearSearch()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>}
        </div>
        {searchState.query && <Resource
          value={resource}
          onPending={() => <div class="w-6 h-6 border-2 border-t-0 border-r-0 rounded-3xl animate-spin mx-auto mt-2 ">
          </div>}
          onResolved={(songInfo) => {
            return (
              <div class="font-black flex flex-col gap-1 w-1/2 text-center z-10">
                {songInfo.artists && songInfo.artists?.items?.map((artist) => (<button class="text-red-900" onClick$={() => setPostArtist(artist)}>{artist?.data?.profile?.name}</button>))}
                {songInfo.tracks && songInfo.tracks?.items?.map((track) => (<button class="text-blue-500" onClick$={() => setPostTrack(track)}>{track?.data?.name}</button>))}
              </div>
            )
          }}
        />}
        {searchState.postArtist?.name && (<div class="flex items-center"><img src={searchState.postArtist?.image} class="w-20 h-20" /><p>{searchState.postArtist.name}</p><button onClick$={() => clearSearch()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button></div>)}
        <form onSubmit$={() => newPost()}>
          <label>
            Comment
            <textarea value={searchState.postContent} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <button onClick$={() => closeModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
});