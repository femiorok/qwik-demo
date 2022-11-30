# Qwik vs. React 

Qwik is yet another new Javascript framework that looks to solve the never-ending battle of reducing bundle sizes and improving page load times for SEO and conversion rates. It's 
built on principles very similar to React, while having a lot of modern features that make it better than vanilla React. 

In terms of similarities, they both are written via JSX-based components that can be reused throughout your application. Qwik also has a multitude of helper functions built in
that essentially equate (in many ways) to React's built in functions. For example, you have:

useStore = useState
useClientEffect & useWatch = useEffect
useContextProvider = useContext

...and so on. 

Overall, Qwik seems to be a nearly-mature framework. It has some pros and cons when compared to vanilla React:

# Pros

- Comprehensive, distinct hooks & API

It's clear that unlike React, which has gone through a multitude of changes over the years chasing improvement (e.g. class based to functional components, new hooks being introduced, etc), Qwik was built from the ground up to support many things developers would want. For example, the helper functions are much more distinct than React's; useEffect is notorious for being difficult to work with, and Qwik wisely separated its functionality into multiple different functions, depending on if you a) simply want a function to run when X dependency changes b) want to create a side-effect and have an easy way of cleaning it up, such as creating a timer. Other component API such as Slots and Resources also mirror functionality found in React but add significant advantages as well. 

- Superior data fetching

Data fetching in Qwik is better than in vanilla React due to the multiple ways it can be used. The Resource component, which is essentially a server-side component in new versions of React, makes it very easy to pull in external data and have it render loading, error, or success states without needing to use an external library or write your own solution. Coupled with the useResource hook, you can have multiple optional dependencies that determine when your data is fetched.

- Typescript support

While Typescript is also compatible with React, Qwik includes it from the beginning, which is a much-appreciated first step towards less buggy code.

# Cons

Qwik is on the cusp of being ready for full-blown, large scale production minus a few points that hold me back.

- Main hook volatility 

The core hooks you would use in React or Qwik (useState, useEffect, useContext and useStore, useuseStore, useWatch, and useContext respectively) seem to be more robust in React than Qwik. Qwik often requires multiple hooks to be used together in order to get desired results, or have multiple hooks than do the same thing in slightly different ways. Additionally, as a new framework, best practices have yet to be determined, which can result in writing code that feels "hacky". One example of how the hooks in React feel more mature is useState vs useStore. In some ways, useStore is more flexible than useState since by default it more intuitively supports objects as state. However, unlike in React, state here is **directly mutable** so if you want to change something, you simply have to change the value of the useStore object. While this can make writing applications feel a bit faster, I prefer working with immutable state that can only be changed via a state setter; this should lead to less bugs and more predicatble behavior than accessing your state directly.

- 3rd Party Support 

To date, the best way to fetch data in React is using a 3rd party library such as React Query. As a new framework, Qwik has no alternative. Qwik does technically support React libraries, however this requires you to define your components as React components and add additional syntax, which can lead to some style changes and might clash with how you've been writing your code prior. The mental overhead of having to switch back and forth doesn't seem worth it. 

- Qwik City: less flexible than Next JS

Qwik also comes with it's own version of a SSR/SSG framework called Qwik City; their equivalent to React's Next JS. While it has many of the same features and some key strengths (e.g. more easily sharing state between pages, more easily saving layouts between pages, built-in markdown support, etc), it also falls short in some key areas. (These comments apply to Next JS pre-Next 13, which introduces a litany of changes)

Next JS more easily allows you to choose between SSR and SSG depending on what function you use, whereas in Qwik you have to adjust options in config files just to get up and running. Additionally, things like dynamic routes are more robust and feature-rich in Next JS than Qwik.

- Shaky documentation

A big con for Qwik is that their documentation is clearly still a work in progress. Many pages are visibly incomplete, and many explanations and examples fall short of the thoroughness you get with React's documentation (particularly the "beta" React docs)

# Conclusion

Overall, for personal projects Qwik could be a fun way to get a handle on a framework that could very well become 2nd most adopted next to React, filling the gap left by Angular. It will likely be another year or two for it to fully mature; however, with React constantly updating (the new server component update seems to be a major paradigm shift, and was present in Qwik before), can it catch up? Only time will tell. 



# Qwik App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)
- [Partytown](https://partytown.builder.io/)
- [Mitosis](https://github.com/BuilderIO/mitosis)
- [Builder.io](https://www.builder.io/)

---

## Project Structure

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations include: Cloudflare, Netlify or Express server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/static-site-generation/static-site-config/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). During development, the `dev` command will server-side render (SSR) the output.

```shell
npm run dev # or `yarn dev`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to locally preview a production build, and it should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. Additionally, the build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```
