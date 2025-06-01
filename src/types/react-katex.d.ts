declare module 'react-katex' {
  import { ReactNode } from 'react';
  
  interface KaTeXProps {
    children?: ReactNode;
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => ReactNode;
    settings?: {
      displayMode?: boolean;
      throwOnError?: boolean;
      errorColor?: string;
      macros?: Record<string, string>;
      colorIsTextColor?: boolean;
      maxSize?: number;
      maxExpand?: number;
      strict?: boolean | string | 'warn' | 'ignore';
      trust?: boolean | ((context: { command: string, url: string, protocol: string }) => boolean);
    };
  }
  
  export const InlineMath: React.FC<KaTeXProps>;
  export const BlockMath: React.FC<KaTeXProps>;
}
