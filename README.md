# kb-pwa
This is a sample PWA using Vue 3 and the Vue CLI PWA plugin and Workbox.

## Project setup
```
npm install
```

### Instal Serve globally
If you don't already have `serve` installed globally, you will need it for serving the PWA in production mode so you can test installing the PWA from your machine.

```
npm install -g serve
```

### Serves PWA in For Local Debugging
Use this to debug the service worker. Requires installing `serve`.
```
npm run pwa-serve
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

## Testing PWA

### Test Network First Cache Strategy on API Calls

To test that the API is being cached:
1. Run the application in pwa-serve `npm run pwa-serve`
2. In Chrome Dev Tools, go to Application tab >> Service Worker >> check mark the Offline.
3. Pay attention to the dog picture on the Home page.
4. Navigate to About Page
5. Navigate back to the Home Page.
6. Verify the picture of the dog is the same picture.

To test that the API call is not being cached:
1. Run the application in pwa-serve `npm run pwa-serve`
2. In Chrome Dev Tools, go to Application tab >> Service Worker. Make sure Offline is not checked.
3. Pay attention to the dog picture on the Home page.
4. Navigate to About Page
5. Navigate back to the Home Page.
6. Verify the picture of the dog is a different picture.

## Test Cache First Strategy on images / css
TODO

## Test Stale While Revalidate on JS
TODO

## Test no caching on Index.html
TODO

