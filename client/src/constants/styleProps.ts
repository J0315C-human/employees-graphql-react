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
    alignItems: 'flex-start',
    alignContent: 'flex-start',
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
    paddingTop: 75,
    paddingBottom: 75,
  },
  rowControls: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export default styleProps;
