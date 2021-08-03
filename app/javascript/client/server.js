const port = process.env['FRONTEND_PORT'] || 4001

const { createServerAsync } = require('@expo/next-adapter')
const { parse } = require('url')
const fs = require('fs');

let nextApp;

const serviceWorkerPath = `${__dirname}/.next/service-worker.js`

function readServiceWorker() {
  return new Promise((resolve, reject) => {
    fs.readFile(serviceWorkerPath, (err, data) => {
      if (err) {
        rejects(err)
      } else {
        resolve(data)
      }
    })
  })
}

createServerAsync(__dirname, {
  handleRequest: async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    console.log(`> GET ${pathname}`)
    if (pathname === '/service-worker.js') {
      console.log('-> Serving', serviceWorkerPath)

      const data = await readServiceWorker()
      await res.writeHead(200, { 'Content-Type': 'text/javascript' });
      await res.write(data)
      await res.end()

      return true
    }
  },
}).then(({ server, app }) => {
  nextApp = app
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});