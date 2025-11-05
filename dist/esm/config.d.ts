import { SignOptions } from '@electron/windows-sign';
export type CodesignOptions = Omit<SignOptions, 'appDirectory'>;
export interface MakerNSISConfig {
    codesign?: CodesignOptions;
    updater?: {
        provider?: 'generic' | 'github';
        url?: string;
        owner?: string;
        repo?: string;
        channel?: string;
        updaterCacheDirName?: string;
        publisherName?: string | string[];
    };
    getAppBuilderConfig?: () => Promise<Record<string, any>>;
}
