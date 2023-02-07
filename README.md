<div align="center">
    <img src="https://user-images.githubusercontent.com/16688722/216698852-22e3016b-a71d-49e9-a748-38061d939c60.png" height="256">
    <h1>ZenStack SaaS Demo</h1>
    <a href="https://twitter.com/intent/tweet?text=Wow%20%40zenstackhq">
        <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fzenstackhq%2Fzenstack">
    </a>
    <a href="https://discord.gg/6HhebQynfz">
        <img src="https://img.shields.io/discord/1035538056146595961">
    </a>
</div>

# Overview

This is a sample project for demonstrating how to use ZenStack to create a SaaS application using Next.js

The deployed version can be found at https://zenstack-nextjs-saas-app-sigma.vercel.app/

## Getting Started

1. install dependencies

```bash
npm install
```

2. Run build:

```
npm run build
```

3. Set a postgres connection string to DATABASE_URL in .env:

```
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@[YOUR-URL]/postgres"
```

4. Sync schema with database

```
npm run db:push
```

5. Finally it's time to run your app locally:

```
npm run dev
```

## Learn More

To learn more about ZenStack, take a look at the following resources:

- [ZenStack Documentation](https://zenstack.dev/docs/intro)
