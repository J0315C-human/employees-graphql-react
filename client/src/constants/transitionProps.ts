const transitionProps = {
  fadeDropIn: {
    from: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
  },
  navBarFade: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 400,
  },
  pageDeeper: {
    from: { opacity: 0, transform: 'translate3d(0,100px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,100px,0)' },
  },
  pageShallower: {
    from: { opacity: 0, transform: 'translate3d(0,100px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,100px,0)' },
  },
};

export default transitionProps;
