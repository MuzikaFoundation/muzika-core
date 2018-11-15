import { InjectionToken } from '@angular/core';
import { EnvironmentType, EnvironmentTypeV2, MuzikaPlatformType } from '@muzika/core';

export const BASE_API_URL = new InjectionToken<string>('MUZIKA_BASE_API_URL');

export const EnvironmentTypeToken = new InjectionToken<string>('MuzikaEnvironmentType');

export const EnvironmentToken = new InjectionToken<EnvironmentType>('MuzikaEnvironment');

export const EnvironmentV2Token = new InjectionToken<EnvironmentTypeV2>('MuzikaEnvironmentV2');

export const PLATFORM_TYPE_TOKEN = new InjectionToken<MuzikaPlatformType>('MUZIKA_PLATFORM_TYPE');
