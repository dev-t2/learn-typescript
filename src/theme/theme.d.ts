import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      background: '#ffffff';
      label: '#a6a6a6';
      text: '#000000';
      error: '#e84118';
      image: {
        background: '#d5d5d5';
      };
      input: {
        placeholder: '#a6a6a6';
        border: '#a6a6a6';
      };
      button: {
        background: '#2196F3';
        title: '#ffffff';
      };
      header: {
        Tint: '#000000';
      };
    };
  }
}
