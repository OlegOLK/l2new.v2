import React, { FunctionComponent } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { LeftPanel } from './index';
type LeftSliderProps = {
  openned: boolean;
  toggleDrawer(open: boolean);
};

export const LeftSlider: FunctionComponent<LeftSliderProps> = ({
  openned,
  toggleDrawer,
}) => {
  return (
    <SwipeableDrawer
      anchor={'top'}
      open={openned}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <LeftPanel />
    </SwipeableDrawer>
  );
};
