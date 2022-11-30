import { component$ } from '@builder.io/qwik';

export const Sidebar = component$(() => {
  return (
    <div class="h-screen w-[20vw] text-2xl bg-accent_gray px-10 pt-10">
      <div class="h-3/5 flex flex-col justify-between">
        <div>Popular Posts</div>
        <div>Latest Posts</div>
        <div>You Might Like</div>
        <div>New Post</div>
        <div>Notifications</div>
        <div>Messages</div>
      </div>
    </div>
  )
});