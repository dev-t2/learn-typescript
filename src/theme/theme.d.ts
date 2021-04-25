import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      background: '#ffffff';
      text: '#000000';
      label: '#a6a6a6';
      image: {
        background: '#d5d5d5';
      };
      input: {
        placeholder: '#a6a6a6';
        border: '#a6a6a6';
      };
    };
  }
}
