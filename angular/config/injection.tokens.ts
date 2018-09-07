import {InjectionToken} from '@angular/core';
import {makeStateKey} from '@angular/platform-browser';
import {MuzikaPlatformType, EnvironmentType} from '@muzika/core';

export const BASE_API_URL = new InjectionToken<string>('MUZIKA_BASE_API_URL');

export const MUZIKA_REDUX_STATE_KEY = makeStateKey<any>('muzika.redux.state');

export const EnvironmentTypeToken = new InjectionToken<string>('MuzikaEnvironmentType');

export const EnvironmentToken = new InjectionToken<EnvironmentType>('MuzikaEnvironment');

export const PLATFORM_TYPE_TOKEN = new InjectionToken<MuzikaPlatformType>('MUZIKA_PLATFORM_TYPE');
