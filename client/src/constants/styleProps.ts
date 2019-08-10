const styleProps = {
  blurredHeroImage: {
    filter: 'blur(4px)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  rowWrapCentered: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCentered: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageScrollBox: {
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
    marginTop: 70,
  },
};

export default styleProps;
