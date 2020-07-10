export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "5f08c098c17c0d01e2b62793",
                  title: "Sanity Studio",
                  name: "print-shop-studio",
                  apiId: "ff8d5cc5-4be6-4d49-b3b8-d78352069b91",
                },
                {
                  buildHookId: "5f08c12dc17c0d019bb627e8",
                  title: "Print Shop Website",
                  name: "print-shop",
                  apiId: "9e095ad4-7057-4d04-b0d0-222a6ffb4dda",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/Josh-McFarlin/print-shop",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://3d-print-shop.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recently edited",
        order: "_updatedAt desc",
        limit: 10,
        types: ["page"],
      },
      layout: { width: "medium" },
    },
  ],
};
