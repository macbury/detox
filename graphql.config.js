module.exports = {
  projects: {
    app: {
      schema: ["app/javascript/api/schema.graphql"],
      documents: ["app/javascript/api/**/*.{graphql,js,ts,jsx,tsx}"],
      extensions: {
        endpoints: {
          default: {
            url: "http://127.0.0.1:4000"
          },
        },
      }
    },
  }
}