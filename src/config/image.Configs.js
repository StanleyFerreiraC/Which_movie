const imageConfigs = {
    style: {
      gradientBgImage: {
        dark: {
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
        },
      },
      horizontalGradientBgImage: {
        dark: {
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))"
        },
      },
      backgroundImage: (backURL) => ({
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "darkgrey",
        backgroundImage: `url(${backURL + movie.backdrop_path})`
      })
    },
    size: {
      sidebarWith: "300px",
      contentMaxWidth: "1366px"
    }
  };
  
  export default imageConfigs;