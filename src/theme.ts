import { css } from "@emotion/react";

export const theme = {
  borderColor: "var(--tg-theme-link-color, #000)",
  bgColor: "var(--tg-theme-bg-color, #ffffff)",
  secondaryBgColor: "var(--tg-theme-secondary-bg-color, #efefef)",
  textColor: "var(--tg-theme-text-color, #222222)",
  hintColor: "var(--tg-theme-hint-color, #ccc)",
  errorColor: "var(--tg-theme-destructive-text-color, #ef1717)",
  linkColor: "var(--tg-theme-link-color, #000)",
  destructiveText: "var(--tg-theme-destructive-text-color, #ef1717)",
  linkHoverColor: "var(--tg-theme-link-hover-color, #666666)",
  buttonColor: "var(--tg-theme-button-color, #50a8eb)",
  buttonTextColor: "var(--tg-theme-button-text-color, #fff)",
};

const globalStyles = css`
  body {
    --bg-color: var(--tg-theme-bg-color, #fff);
    font-family: sans-serif;
    background-color: var(--bg-color);
    color: var(--tg-theme-text-color, #222);
    font-size: 14px;
    margin: 0;
    padding: 0;
    color-scheme: var(--tg-color-scheme);
  }

  body.gray {
    background-color: var(--tg-theme-secondary-bg-color, #efefef);
  }

  a {
    color: var(--tg-theme-link-color, #2678b6);
  }

  .btn {
    font-size: 14px;
    padding: 10px 17px;
  }

  .btn-primary {
    background-color: var(--tg-theme-button-color, #50a8eb);
    color: var(--tg-theme-button-text-color, #fff);
    border: none;
  }

  .main-container {
    padding: 15px;
  }

  .list-header {
    text-transform: uppercase;
    font-size: 0.92em;
    color: var(--tg-theme-hint-color, #ccc);
    margin: 0 0 10px;
  }

  a.list-group-item,
  button.list-group-item {
    color: var(--tg-theme-text-color, #222);
  }

  .main-container p {
    margin: 0 auto;
  }

  .main-container pre,
  .main-container > .btn {
    margin: 0 0 7px;
  }

  .main-container pre + .hint,
  .main-container > .btn + .hint {
    text-align: center;
    margin: 0 0 15px;
  }

  p {
    margin: 40px 0 15px;
  }

  ul {
    text-align: left;
  }

  li {
    color: var(--tg-theme-hint-color, #a8a8a8);
  }

  .hint {
    font-size: 0.8em;
    color: var(--tg-theme-hint-color, #a8a8a8);
  }

  .ok {
    color: green;
  }

  .err {
    color: red;
  }

  /* .hidden {
    display: none;
  } */

  h1 {
    font-size: 1.5rem;
  }

  /* Spinner container */
  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--tg-theme-secondary-bg-color, #efefef);
    z-index: 1000;
  }

  /* Spinner styling */
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--tg-theme-text-color, #222222);
    border-top-color: var(--tg-theme-hint-color, #ccc) !important;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .pages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    align-items: stretch;
    grid-auto-rows: 45px;

    button {
      height: 100%;
      display: flex;
      padding: 0;
      justify-content: center;
      align-items: center;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default globalStyles;
