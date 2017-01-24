const CLEAR_COLOR = 0x3e4756;
const SPLINE_SCALE = 30;
const FLOOR = -15;
const DOF_SETTING  = {
    enabled: true,
    jsDepthCalculation: true,
    shaderFocus: false,
    fstop: 1,
    maxblur: 1.5,
    showFocus: false,
    focalDepth: 120,
    manualdof: false,
    vignetting: false,
    depthblur: false,
    threshold: 1.5,
    gain: 2,
    bias: 1,
    fringe: 3,
    focalLength: 35,
    noise: true,
    pentagon: false,
    dithering: 0.0001,
    rings: 2,
    samples: 2
};
const SCROLL_SETTING = {
    pos: 0,
};

export { CLEAR_COLOR, FLOOR, DOF_SETTING, SCROLL_SETTING, SPLINE_SCALE };
