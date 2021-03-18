module.exports = {
  async rewrites() {
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/hello-nextjs-data/:path*",
        destination: `https://mockend.com/okayrunner/hello-nextjs-data/:path*`,
      },
      {
        source: "/:path*",
        destination: `http://localhost:3000/:path*`,
      },
    ];
  },
};
