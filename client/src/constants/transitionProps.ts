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
  pageLateral: {
    from: { opacity: 0, transform: 'scale(1)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(1)' },
  },
  pageDeeper: {
    from: { opacity: 0, transform: 'scale(0.92)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(1)' },
  },
  pageShallower: {
    from: { opacity: 0, transform: 'scale(1)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.92)' },
  },
};

export default transitionProps;
