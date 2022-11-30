import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Sidebar } from '~/components/sidebar';
import { Timeline } from '~/components/timeline';
// import { Login } from '~/components/login';


export default component$(() => {
  return (
    <div class="flex">
      {/* <Login /> */}
      <div class="md:block hidden">
        <Sidebar />
      </div>
      <Timeline />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
