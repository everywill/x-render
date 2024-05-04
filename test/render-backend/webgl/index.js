import { GraphicsDriver } from '../../../src/render-backend/graphics/graphics-driver';
import { DEVICE_TYPE, DeviceCaps } from '../../../src/render-backend/graphics/device-caps';
import { CONTEXT_CREATION_TYPE } from '../../../src/render-backend/graphics/graphics-types';

const deviceCaps = new DeviceCaps();
deviceCaps.dev_type = DEVICE_TYPE.DEVICE_TYPE_OPENGLES;

GraphicsDriver.Create(deviceCaps, CONTEXT_CREATION_TYPE.CREATE);