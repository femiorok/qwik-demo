import { component$ } from '@builder.io/qwik';

interface postData {
  postId: number;
  author: string;
  song: string;
  content: string;
  likes: number
  date: Date
}


export const Post = component$(({ author, song, content, date, likes }: postData) => {



  return (
    <div class="md:w-[450px] w-4/5 h-60 bg-primary_white shadow-sm rounded-xl p-4 my-4 flex flex-col gap-4">
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <p>{author}</p>
          <p>{date.toDateString()}</p>
        </div>
      </div>
      <div><p>{content}</p></div>
      <div>{song}</div>
      <div class="justify-self-end">{likes}</div>
    </div>
  )
});