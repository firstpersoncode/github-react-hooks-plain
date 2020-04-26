# github-react-hooks-plain

### Getting Started

install deps:

```bash
yarn
```

start jest testing...

```bash
yarn test
```

start development:

```bash
yarn dev
```

start production:

```bash
yarn start
```

OR

```bash
yarn prod
```

bundle analyzer:

```bash
yarn analyze
```

### Project Structure

#### **core**

> contain express and webpack configuration.

#### src

> Source code for the React project.

#### src/**app**

> React project bootsrap for the client and server.

#### src/components

> Reusable dummy component that only receive props without connected to global state

#### src/containers

> Component that is connected to global state and contain several components

#### src/routes

> Component that is behave as screen (page), connected to global state, contain several components and containers.

#### src/store

> Global state configuration, contain state and actions

#### src/utils

> Helper for the project

#### src/variables

> contain shared const / variables

#### static

> contain static files

## License

## [MIT](LICENSE)

[@firstpersoncode](https://github.com/firstpersoncode)
